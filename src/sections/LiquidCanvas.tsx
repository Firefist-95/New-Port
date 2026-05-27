import { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import liquidVert from '../shaders/liquid.vert?raw';
import liquidFrag from '../shaders/liquid.frag?raw';

interface LiquidMeshProps {
  texture: THREE.Texture | null;
  envMap: THREE.Texture | null;
}

function LiquidMesh({ texture, envMap }: LiquidMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef(new THREE.Vector2(0.5, 0.5));
  const smoothMouseRef = useRef(new THREE.Vector2(0.5, 0.5));
  const { size } = useThree();

  const uniforms = useMemo(() => ({
    u_time: { value: 0.0 },
    u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    u_resolution: { value: new THREE.Vector2(size.width, size.height) },
    u_texture: { value: texture },
    u_envMap: { value: envMap },
  }), [texture, envMap, size]);

  useEffect(() => {
    if (uniforms.u_texture.value !== texture) {
      uniforms.u_texture.value = texture;
    }
    if (uniforms.u_envMap.value !== envMap) {
      uniforms.u_envMap.value = envMap;
    }
    uniforms.u_resolution.value.set(size.width, size.height);
  }, [texture, envMap, size, uniforms]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.set(
        e.clientX / window.innerWidth,
        1.0 - e.clientY / window.innerHeight
      );
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.u_time.value += delta;

    smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.08;
    smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.08;
    mat.uniforms.u_mouse.value.copy(smoothMouseRef.current);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2, 1, 1]} />
      <shaderMaterial
        vertexShader={liquidVert}
        fragmentShader={liquidFrag}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

export default function LiquidCanvas() {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [envMap, setEnvMap] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load('/liquid-base-texture.jpg', (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      setTexture(tex);
    });
    loader.load('/studio-reflection.jpg', (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      setEnvMap(tex);
    });
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: '#050505' }}
      >
        <LiquidMesh texture={texture} envMap={envMap} />
      </Canvas>
    </div>
  );
}
