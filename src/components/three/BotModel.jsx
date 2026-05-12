import { useEffect, useMemo, useRef } from 'react';
import { useGLTF, useAnimations, Center } from '@react-three/drei';
import * as THREE from 'three';

const FPS = 30;

const PALETTE = [
  '#b1511e', // rust accent
  '#2d3644', // carbon
  '#cbd5dd', // light cool
  '#2f96fc', // ice
  '#7a8aa0', // cool grey
  '#b85b39', // warm rust highlight
];

export default function BotModel({ url, skipStart = 0 }) {
  const group = useRef();
  const { scene, animations } = useGLTF(url);

  const trimmed = useMemo(() => {
    if (!skipStart || !animations?.length) return animations;
    return animations.map((clip) => {
      const totalFrames = Math.max(1, Math.round(clip.duration * FPS));
      const startFrame = Math.min(Math.round(skipStart * FPS), totalFrames - 1);
      return THREE.AnimationUtils.subclip(clip, clip.name, startFrame, totalFrames, FPS);
    });
  }, [animations, skipStart]);

  const { actions } = useAnimations(trimmed, group);

  useEffect(() => {
    let i = 0;
    scene.traverse((o) => {
      if (o.isMesh) {
        const color = new THREE.Color(PALETTE[i % PALETTE.length]);
        i += 1;
        const mat = new THREE.MeshStandardMaterial({
          color,
          roughness: 0.45,
          metalness: 0.35,
          envMapIntensity: 1.0,
        });
        o.material = mat;
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    if (!actions) return;
    Object.values(actions).forEach((action) => {
      action.reset();
      action.timeScale = 2;
      action.play();
    });
  }, [actions]);

  return (
    <group ref={group}>
      <Center disableY={false}>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

useGLTF.preload('/bot.glb');
