import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';

const NODE_COUNT = 120;
const BOUNDS = { x: 10, y: 5.5, z: 3.5 };
const CONNECT_DIST = 2.4;
const DRIFT_AMP = 0.4;
const ACCENT_RATIO = 0.28; // proporción de nodos naranjas vs. grises carbón

const ACCENT = new THREE.Color('#f27429');
const CARBON = new THREE.Color('#3a3a3a');

interface NetworkData {
  basePositions: Float32Array;
  phases: Float32Array;
  speeds: Float32Array;
  pairs: Array<[number, number]>;
  pointsGeometry: THREE.BufferGeometry;
  linesGeometry: THREE.BufferGeometry;
}

function buildNetwork(): NetworkData {
  const basePositions = new Float32Array(NODE_COUNT * 3);
  const phases = new Float32Array(NODE_COUNT * 3);
  const speeds = new Float32Array(NODE_COUNT);
  const colors = new Float32Array(NODE_COUNT * 3);

  for (let i = 0; i < NODE_COUNT; i++) {
    basePositions[i * 3] = (Math.random() - 0.5) * 2 * BOUNDS.x;
    basePositions[i * 3 + 1] = (Math.random() - 0.5) * 2 * BOUNDS.y;
    basePositions[i * 3 + 2] = (Math.random() - 0.5) * 2 * BOUNDS.z;
    phases[i * 3] = Math.random() * Math.PI * 2;
    phases[i * 3 + 1] = Math.random() * Math.PI * 2;
    phases[i * 3 + 2] = Math.random() * Math.PI * 2;
    speeds[i] = 0.2 + Math.random() * 0.5;

    const color = Math.random() < ACCENT_RATIO ? ACCENT : CARBON;
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  // Conexiones fijas entre nodos cercanos en su posición base; los extremos
  // se actualizan cada frame siguiendo el drift de los nodos.
  const pairs: Array<[number, number]> = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      const dx = basePositions[i * 3] - basePositions[j * 3];
      const dy = basePositions[i * 3 + 1] - basePositions[j * 3 + 1];
      const dz = basePositions[i * 3 + 2] - basePositions[j * 3 + 2];
      if (dx * dx + dy * dy + dz * dz < CONNECT_DIST * CONNECT_DIST) {
        pairs.push([i, j]);
      }
    }
  }

  const pointsGeometry = new THREE.BufferGeometry();
  pointsGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(basePositions.slice(), 3),
  );
  pointsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Posiciones iniciales de las líneas desde las posiciones base, para que se
  // vean correctas aun si el rebuild por-frame está pausado (reduced-motion).
  const linePositions = new Float32Array(pairs.length * 6);
  for (let k = 0; k < pairs.length; k++) {
    const [i, j] = pairs[k];
    linePositions[k * 6] = basePositions[i * 3];
    linePositions[k * 6 + 1] = basePositions[i * 3 + 1];
    linePositions[k * 6 + 2] = basePositions[i * 3 + 2];
    linePositions[k * 6 + 3] = basePositions[j * 3];
    linePositions[k * 6 + 4] = basePositions[j * 3 + 1];
    linePositions[k * 6 + 5] = basePositions[j * 3 + 2];
  }
  const linesGeometry = new THREE.BufferGeometry();
  linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

  return { basePositions, phases, speeds, pairs, pointsGeometry, linesGeometry };
}

export default function NodeNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const pointsMatRef = useRef<THREE.PointsMaterial>(null);
  const linesMatRef = useRef<THREE.LineBasicMaterial>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const network = useMemo(buildNetwork, []);

  // El canvas tiene pointer-events: none, así que el ratón se sigue a nivel de window.
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useEffect(() => {
    return () => {
      network.pointsGeometry.dispose();
      network.linesGeometry.dispose();
    };
  }, [network]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    // Pestaña en segundo plano: no gastar CPU/GPU.
    if (typeof document !== 'undefined' && document.hidden) return;

    const { heroProgress, reducedMotion } = useAppStore.getState();

    // Fade + desplazamiento al salir del Hero (barato; se hace siempre).
    group.position.y = heroProgress * 1.5;
    const fade = Math.max(1 - heroProgress * 1.15, 0);
    if (pointsMatRef.current) pointsMatRef.current.opacity = 0.85 * fade;
    if (linesMatRef.current) linesMatRef.current.opacity = 0.16 * fade;

    // Fuera del Hero (invisible) o reduced-motion: saltar todo el trabajo pesado
    // por-frame. Bajo reduced-motion las líneas quedan en su posición base (estáticas).
    if (fade <= 0.001 || reducedMotion) return;

    const { basePositions, phases, speeds, pairs, pointsGeometry, linesGeometry } =
      network;
    const time = state.clock.elapsedTime;

    const posAttr = pointsGeometry.getAttribute('position') as THREE.BufferAttribute;
    const positions = posAttr.array as Float32Array;
    for (let i = 0; i < NODE_COUNT; i++) {
      const s = speeds[i];
      positions[i * 3] =
        basePositions[i * 3] + Math.sin(time * s + phases[i * 3]) * DRIFT_AMP;
      positions[i * 3 + 1] =
        basePositions[i * 3 + 1] + Math.cos(time * s + phases[i * 3 + 1]) * DRIFT_AMP;
      positions[i * 3 + 2] =
        basePositions[i * 3 + 2] +
        Math.sin(time * s * 0.8 + phases[i * 3 + 2]) * DRIFT_AMP;
    }
    posAttr.needsUpdate = true;

    const lineAttr = linesGeometry.getAttribute('position') as THREE.BufferAttribute;
    const linePositions = lineAttr.array as Float32Array;
    for (let k = 0; k < pairs.length; k++) {
      const [i, j] = pairs[k];
      linePositions[k * 6] = positions[i * 3];
      linePositions[k * 6 + 1] = positions[i * 3 + 1];
      linePositions[k * 6 + 2] = positions[i * 3 + 2];
      linePositions[k * 6 + 3] = positions[j * 3];
      linePositions[k * 6 + 4] = positions[j * 3 + 1];
      linePositions[k * 6 + 5] = positions[j * 3 + 2];
    }
    lineAttr.needsUpdate = true;

    // Parallax sutil hacia el puntero.
    const targetRotY = pointer.current.x * 0.18;
    const targetRotX = -pointer.current.y * 0.12;
    const lerp = Math.min(delta * 2.5, 1);
    group.rotation.y += (targetRotY - group.rotation.y) * lerp;
    group.rotation.x += (targetRotX - group.rotation.x) * lerp;
  });

  return (
    <group ref={groupRef}>
      <points geometry={network.pointsGeometry}>
        <pointsMaterial
          ref={pointsMatRef}
          size={0.09}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments geometry={network.linesGeometry}>
        <lineBasicMaterial
          ref={linesMatRef}
          color="#2d2d2d"
          transparent
          opacity={0.16}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
