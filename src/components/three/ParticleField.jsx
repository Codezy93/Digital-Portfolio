'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 300 }) {
    const meshRef = useRef();

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return pos;
    }, [count]);

    const sizes = useMemo(() => {
        const s = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            s[i] = Math.random() * 0.03 + 0.01;
        }
        return s;
    }, [count]);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.elapsedTime;
        const posArray = meshRef.current.geometry.attributes.position.array;

        for (let i = 0; i < count; i++) {
            posArray[i * 3 + 1] += Math.sin(time * 0.2 + i) * 0.001;
            posArray[i * 3] += Math.cos(time * 0.15 + i * 0.5) * 0.0005;
        }
        meshRef.current.geometry.attributes.position.needsUpdate = true;
        meshRef.current.rotation.y = time * 0.01;
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.035}
                color="#818cf8"
                transparent
                opacity={0.4}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    );
}

export default function ParticleField() {
    return (
        <div className="three-canvas-container" style={{ opacity: 0.6 }}>
            <Canvas
                camera={{ position: [0, 0, 8], fov: 50 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <Particles count={250} />
            </Canvas>
        </div>
    );
}
