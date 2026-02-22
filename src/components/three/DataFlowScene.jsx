'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FlowLines({ count = 40 }) {
    const groupRef = useRef();

    const lines = useMemo(() => {
        const result = [];
        for (let i = 0; i < count; i++) {
            const points = [];
            const segments = 30;
            const startX = (Math.random() - 0.5) * 16;
            const startY = (Math.random() - 0.5) * 10;
            const startZ = (Math.random() - 0.5) * 4 - 2;
            const speed = Math.random() * 0.5 + 0.3;
            const amplitude = Math.random() * 0.8 + 0.2;

            for (let j = 0; j < segments; j++) {
                const t = j / segments;
                points.push(
                    new THREE.Vector3(
                        startX + t * 6,
                        startY + Math.sin(t * Math.PI * 2) * amplitude,
                        startZ + Math.cos(t * Math.PI) * 0.5
                    )
                );
            }

            const curve = new THREE.CatmullRomCurve3(points);
            const geometry = new THREE.TubeGeometry(curve, 40, 0.008, 4, false);

            result.push({ geometry, speed, offset: Math.random() * Math.PI * 2 });
        }
        return result;
    }, [count]);

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.elapsedTime;

        groupRef.current.children.forEach((child, i) => {
            const line = lines[i];
            if (!line) return;
            const material = child.material;
            material.opacity = (Math.sin(time * line.speed + line.offset) * 0.5 + 0.5) * 0.3 + 0.05;
        });

        groupRef.current.rotation.y = Math.sin(time * 0.05) * 0.1;
    });

    return (
        <group ref={groupRef}>
            {lines.map(({ geometry }, i) => (
                <mesh key={i} geometry={geometry}>
                    <meshBasicMaterial
                        color="#22d3ee"
                        transparent
                        opacity={0.15}
                        depthWrite={false}
                    />
                </mesh>
            ))}
        </group>
    );
}

export default function DataFlowScene() {
    return (
        <div className="three-canvas-container" style={{ opacity: 0.5 }}>
            <Canvas
                camera={{ position: [0, 0, 8], fov: 50 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <FlowLines count={35} />
            </Canvas>
        </div>
    );
}
