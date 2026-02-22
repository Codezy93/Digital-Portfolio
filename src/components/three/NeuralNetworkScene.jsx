'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

/*
  Full-background 3D neural-network graph.
  Nodes spread across the entire viewport with connections
  between nearby nodes and travelling signal pulses.
*/

const NODE_COUNT = 120;
const MAX_CONN_DIST = 3.2;
const PULSE_COUNT = 100;

/* ── Build graph data once ── */
function buildGraph() {
    const nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
            x: (Math.random() - 0.5) * 18,
            y: (Math.random() - 0.5) * 10,
            z: (Math.random() - 0.5) * 8 - 2,
            phase: Math.random() * Math.PI * 2,
            speedX: (Math.random() - 0.5) * 0.08,
            speedY: (Math.random() - 0.5) * 0.06,
            speedZ: (Math.random() - 0.5) * 0.04,
            size: 0.04 + Math.random() * 0.06,
        });
    }

    const connections = [];
    for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dz = nodes[i].z - nodes[j].z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dist < MAX_CONN_DIST) {
                connections.push({ from: i, to: j, dist });
            }
        }
    }

    return { nodes, connections };
}

/* ── Neural Graph ── */
function NeuralGraph({ mouse }) {
    const groupRef = useRef();
    const nodesRef = useRef();
    const linesRef = useRef();
    const pulsesRef = useRef();

    const { nodes, connections } = useMemo(() => buildGraph(), []);

    // Pre-allocate buffers
    const nodePositions = useMemo(() => new Float32Array(NODE_COUNT * 3), []);
    const nodeSizes = useMemo(() => {
        const s = new Float32Array(NODE_COUNT);
        nodes.forEach((n, i) => { s[i] = n.size; });
        return s;
    }, [nodes]);
    const nodeColors = useMemo(() => {
        const c = new Float32Array(NODE_COUNT * 3);
        const palette = [
            new THREE.Color('#60a5fa'),
            new THREE.Color('#818cf8'),
            new THREE.Color('#22d3ee'),
            new THREE.Color('#a78bfa'),
        ];
        nodes.forEach((_, i) => {
            const col = palette[Math.floor(Math.random() * palette.length)];
            c[i * 3] = col.r;
            c[i * 3 + 1] = col.g;
            c[i * 3 + 2] = col.b;
        });
        return c;
    }, [nodes]);

    const linePositions = useMemo(() => new Float32Array(connections.length * 6), [connections.length]);
    const lineColors = useMemo(() => new Float32Array(connections.length * 6), [connections.length]);

    // Pulse assignments
    const pulseData = useMemo(() => {
        const assigns = new Uint32Array(PULSE_COUNT);
        const offsets = new Float32Array(PULSE_COUNT);
        const speeds = new Float32Array(PULSE_COUNT);
        for (let i = 0; i < PULSE_COUNT; i++) {
            assigns[i] = connections.length > 0 ? Math.floor(Math.random() * connections.length) : 0;
            offsets[i] = Math.random();
            speeds[i] = 0.1 + Math.random() * 0.35;
        }
        return { assigns, offsets, speeds };
    }, [connections.length]);
    const pulsePositions = useMemo(() => new Float32Array(PULSE_COUNT * 3), []);

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        // ── Animate nodes (gentle drift) ──
        if (nodesRef.current) {
            const arr = nodesRef.current.geometry.attributes.position.array;
            nodes.forEach((n, i) => {
                arr[i * 3] = n.x + Math.sin(t * n.speedX + n.phase) * 0.4;
                arr[i * 3 + 1] = n.y + Math.cos(t * n.speedY + n.phase) * 0.3;
                arr[i * 3 + 2] = n.z + Math.sin(t * n.speedZ + n.phase * 0.5) * 0.2;
            });
            nodesRef.current.geometry.attributes.position.needsUpdate = true;
        }

        // ── Update connections ──
        if (linesRef.current && nodesRef.current) {
            const nArr = nodesRef.current.geometry.attributes.position.array;
            const pos = linesRef.current.geometry.attributes.position.array;
            const col = linesRef.current.geometry.attributes.color.array;

            connections.forEach((c, i) => {
                const fx = nArr[c.from * 3], fy = nArr[c.from * 3 + 1], fz = nArr[c.from * 3 + 2];
                const tx = nArr[c.to * 3], ty = nArr[c.to * 3 + 1], tz = nArr[c.to * 3 + 2];

                pos[i * 6] = fx; pos[i * 6 + 1] = fy; pos[i * 6 + 2] = fz;
                pos[i * 6 + 3] = tx; pos[i * 6 + 4] = ty; pos[i * 6 + 5] = tz;

                // Pulsing intensity based on time
                const pulse = (Math.sin(t * 0.8 + i * 0.02) * 0.5 + 0.5);
                const distFade = 1 - (c.dist / MAX_CONN_DIST);
                const brightness = pulse * distFade * 0.35;

                col[i * 6] = 0.376 * brightness; col[i * 6 + 1] = 0.647 * brightness; col[i * 6 + 2] = 0.98 * brightness;
                col[i * 6 + 3] = 0.376 * brightness; col[i * 6 + 4] = 0.647 * brightness; col[i * 6 + 5] = 0.98 * brightness;
            });

            linesRef.current.geometry.attributes.position.needsUpdate = true;
            linesRef.current.geometry.attributes.color.needsUpdate = true;
        }

        // ── Animate pulses ──
        if (pulsesRef.current && nodesRef.current && connections.length > 0) {
            const arr = pulsesRef.current.geometry.attributes.position.array;
            const nArr = nodesRef.current.geometry.attributes.position.array;

            for (let i = 0; i < PULSE_COUNT; i++) {
                const prog = (pulseData.offsets[i] + t * pulseData.speeds[i]) % 1;
                const c = connections[pulseData.assigns[i]];
                if (!c) continue;

                const fx = nArr[c.from * 3], fy = nArr[c.from * 3 + 1], fz = nArr[c.from * 3 + 2];
                const tx = nArr[c.to * 3], ty = nArr[c.to * 3 + 1], tz = nArr[c.to * 3 + 2];

                arr[i * 3] = fx + (tx - fx) * prog;
                arr[i * 3 + 1] = fy + (ty - fy) * prog;
                arr[i * 3 + 2] = fz + (tz - fz) * prog;
            }
            pulsesRef.current.geometry.attributes.position.needsUpdate = true;
        }

        // ── Mouse parallax ──
        if (groupRef.current && mouse.current) {
            const ty = mouse.current.x * 0.06;
            const tx = -mouse.current.y * 0.04;
            groupRef.current.rotation.y += (ty - groupRef.current.rotation.y) * 0.03;
            groupRef.current.rotation.x += (tx - groupRef.current.rotation.x) * 0.03;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Nodes */}
            <points ref={nodesRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={NODE_COUNT} array={nodePositions} itemSize={3} />
                    <bufferAttribute attach="attributes-color" count={NODE_COUNT} array={nodeColors} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial
                    size={0.12}
                    vertexColors
                    transparent
                    opacity={0.85}
                    sizeAttenuation
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* Connections */}
            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={connections.length * 2} array={linePositions} itemSize={3} />
                    <bufferAttribute attach="attributes-color" count={connections.length * 2} array={lineColors} itemSize={3} />
                </bufferGeometry>
                <lineBasicMaterial vertexColors transparent opacity={0.7} depthWrite={false} blending={THREE.AdditiveBlending} />
            </lineSegments>

            {/* Travelling signal pulses */}
            <points ref={pulsesRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={PULSE_COUNT} array={pulsePositions} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial
                    size={0.07}
                    color="#93c5fd"
                    transparent
                    opacity={0.9}
                    sizeAttenuation
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    );
}

/* ── Scene ── */
function SceneContent({ mouse }) {
    return (
        <>
            <NeuralGraph mouse={mouse} />
            <EffectComposer>
                <Bloom intensity={1.2} luminanceThreshold={0.15} luminanceSmoothing={0.9} mipmapBlur />
            </EffectComposer>
        </>
    );
}

export default function NeuralNetworkScene() {
    const mouse = useRef({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    return (
        <div className="three-canvas-container" onMouseMove={handleMouseMove}>
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <SceneContent mouse={mouse} />
            </Canvas>
        </div>
    );
}
