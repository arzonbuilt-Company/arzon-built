'use client'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ParticleField } from './ParticleField'

export default function HeroParticles() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 55 }} gl={{ alpha: true }} dpr={[1, 1.5]} style={{ background: 'transparent' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 4, 4]} intensity={2} color="#D6FF38" />
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>
    </Canvas>
  )
}
