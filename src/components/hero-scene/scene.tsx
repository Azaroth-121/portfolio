"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 42;
const RADIUS = 2.2;
const MAX_EDGE_DISTANCE = 1.15;
const MAX_DEGREE = 3;
const ACCENT_COLOR = "#c46a35";

// Fibonacci sphere: an even, low-poly node distribution without expensive
// physics or a heavy geometry import.
function generateLattice(count: number, radius: number) {
  const positions: THREE.Vector3[] = [];
  const offset = 2 / count;
  const increment = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(1 - y * y);
    const phi = i * increment;
    const x = Math.cos(phi) * r;
    const z = Math.sin(phi) * r;
    positions.push(new THREE.Vector3(x, y, z).multiplyScalar(radius));
  }
  return positions;
}

function buildEdges(positions: THREE.Vector3[], maxDist: number, maxDegree: number) {
  const edges: [number, number][] = [];
  const degree = new Array(positions.length).fill(0);
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      if (degree[i] >= maxDegree || degree[j] >= maxDegree) continue;
      if (positions[i].distanceTo(positions[j]) < maxDist) {
        edges.push([i, j]);
        degree[i]++;
        degree[j]++;
      }
    }
  }
  return edges;
}

function Lattice() {
  const groupRef = useRef<THREE.Group>(null);
  const nodeMeshRef = useRef<THREE.InstancedMesh>(null);

  const positions = useMemo(() => generateLattice(NODE_COUNT, RADIUS), []);
  const edges = useMemo(
    () => buildEdges(positions, MAX_EDGE_DISTANCE, MAX_DEGREE),
    [positions]
  );

  const lineGeometry = useMemo(() => {
    const points: number[] = [];
    for (const [a, b] of edges) {
      points.push(positions[a].x, positions[a].y, positions[a].z);
      points.push(positions[b].x, positions[b].y, positions[b].z);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return geometry;
  }, [edges, positions]);

  useEffect(() => {
    const mesh = nodeMeshRef.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    positions.forEach((pos, i) => {
      dummy.position.copy(pos);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [positions]);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.rotation.x += delta * 0.02;
  });

  return (
    // Offset to the right: the hero text sits left-aligned in a ~52ch column,
    // so shifting the densest part of the graph right keeps it from sitting
    // directly under live text and risking contrast issues.
    <group ref={groupRef} position={[1.6, 0, 0]}>
      <instancedMesh ref={nodeMeshRef} args={[undefined, undefined, NODE_COUNT]}>
        <icosahedronGeometry args={[0.045, 0]} />
        <meshBasicMaterial color={ACCENT_COLOR} transparent opacity={0.7} />
      </instancedMesh>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color={ACCENT_COLOR} transparent opacity={0.25} />
      </lineSegments>
    </group>
  );
}

export function HeroScene({ frameloop }: { frameloop: "always" | "never" }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={frameloop}
    >
      <Lattice />
    </Canvas>
  );
}
