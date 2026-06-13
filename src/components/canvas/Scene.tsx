import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import NodeNetwork from './NodeNetwork';

/**
 * Canvas 3D fijo detrás de toda la UI. pointer-events-none para que nunca
 * interfiera con la interacción del DOM; el seguimiento del ratón se hace
 * con un listener global en NodeNetwork.
 */
export default function Scene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <NodeNetwork />
        <AdaptiveDpr />
      </Canvas>
    </div>
  );
}
