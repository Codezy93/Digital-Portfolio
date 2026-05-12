import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import BotModel from './BotModel.jsx';

export default function BotScene({ url, skipStart = 0 }) {
  return (
    <Canvas
      className="bot-canvas"
      camera={{ position: [5, 5, 10], fov: 30, near: 0.1, far: 100 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.55} />
      <hemisphereLight args={['#59a5f1', '#7a8aa0', 0.6]} />
      <directionalLight position={[4, 5, 4]} intensity={1.4} color="#fff5e8" />
      <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#c25a23" />
      <pointLight position={[0, -2, 3]} intensity={0.6} color="#cbd5dd" />
      <Suspense fallback={null}>
        <BotModel url={url} skipStart={skipStart} />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}
