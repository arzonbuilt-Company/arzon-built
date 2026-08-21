'use client'
import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 1200

export function ParticleField() {
  const meshRef = useRef<THREE.Points>(null)
  const { mouse } = useThree()

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const colors    = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      positions[i3]     = (Math.random() - 0.5) * 16
      positions[i3 + 1] = (Math.random() - 0.5) * 10
      positions[i3 + 2] = (Math.random() - 0.5) * 5
      // Warm lime/amber tones
      const t = Math.random()
      colors[i3]     = 0.8 + t * 0.2   // R
      colors[i3 + 1] = 0.85 + t * 0.1  // G  → yellow-green
      colors[i3 + 2] = 0.05 + t * 0.1  // B
    }
    return { positions, colors }
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.elapsedTime
    meshRef.current.rotation.y = t * 0.03 + mouse.x * 0.04
    meshRef.current.rotation.x = t * 0.015 - mouse.y * 0.025
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]}    />
      </bufferGeometry>
      <pointsMaterial size={0.022} vertexColors transparent opacity={0.65} sizeAttenuation depthWrite={false} />
    </points>
  )
}
