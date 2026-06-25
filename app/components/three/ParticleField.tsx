'use client'
import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import type { WidgetType } from '../../lib/services-data'

export function ParticleField({ type }: { type?: WidgetType }) {
  const meshRef = useRef<THREE.Points>(null)
  const lineRef = useRef<THREE.LineSegments>(null)
  const { mouse } = useThree()

  // Configure parameters based on service type
  const config = useMemo(() => {
    let count = 1200
    let size = 0.022
    let opacity = 0.65
    
    if (!type) return { count, size, opacity }

    switch (type) {
      case 'roofing':
        count = 1000
        size = 0.018
        break;
      case 'painting':
        count = 500
        size = 0.065 // Larger soft color drops
        opacity = 0.35
        break;
      case 'siding':
        count = 800
        size = 0.025
        break;
      case 'windows':
        count = 500
        size = 0.035
        break;
      case 'kitchen':
        count = 600
        size = 0.050
        opacity = 0.55
        break;
      case 'deck':
        count = 800
        size = 0.022
        break;
      case 'full':
        count = 1500
        size = 0.015
        break;
    }
    return { count, size, opacity }
  }, [type])

  // Generate particles positions and colors
  const { positions, colors, velocities } = useMemo(() => {
    const count = config.count
    const positions = new Float32Array(count * 3)
    const colors    = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Initial positions
      if (type === 'siding') {
        // Structural grid arrangement
        positions[i3]     = ((i % 25) - 12) * 0.65
        positions[i3 + 1] = (Math.floor(i / 25) % 25 - 12) * 0.45
        positions[i3 + 2] = (Math.random() - 0.5) * 2
      } else {
        positions[i3]     = (Math.random() - 0.5) * 16
        positions[i3 + 1] = (Math.random() - 0.5) * 10
        positions[i3 + 2] = (Math.random() - 0.5) * 5
      }

      // Initial velocities
      if (type === 'roofing') {
        velocities[i3]     = -0.5 - Math.random() * 0.5
        velocities[i3 + 1] = -3.0 - Math.random() * 3.0 // Fall downward fast (rain effect)
        velocities[i3 + 2] = 0
      } else if (type === 'painting') {
        velocities[i3]     = (Math.random() - 0.5) * 0.2
        velocities[i3 + 1] = 0.15 + Math.random() * 0.25 // Drifting up slowly
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.1
      } else if (type === 'deck') {
        velocities[i3]     = (Math.random() - 0.5) * 0.4
        velocities[i3 + 1] = 0.4 + Math.random() * 0.5 // Rising wood embers
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.3
      } else {
        velocities[i3]     = (Math.random() - 0.5) * 0.1
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.1
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.05
      }

      // Color themes
      const t = Math.random()
      if (type === 'roofing') {
        // Aqua / Cyan / Lime highlights
        colors[i3]     = t * 0.15
        colors[i3 + 1] = 0.75 + t * 0.2
        colors[i3 + 2] = 0.85 + t * 0.15
      } else if (type === 'painting') {
        // Soft paint drops palette
        const palette = [
          [0.85, 0.45, 0.30], // Terracotta
          [0.55, 0.65, 0.48], // Sage Green
          [0.35, 0.50, 0.65], // Slate Blue
          [0.89, 0.93, 0.15]  // Lime Green
        ]
        const colIdx = Math.floor(Math.random() * palette.length)
        colors[i3]     = palette[colIdx][0]
        colors[i3 + 1] = palette[colIdx][1]
        colors[i3 + 2] = palette[colIdx][2]
      } else if (type === 'windows') {
        // Sky blue and golden sun rays
        if (t > 0.5) {
          colors[i3]     = 0.22
          colors[i3 + 1] = 0.70
          colors[i3 + 2] = 0.98
        } else {
          colors[i3]     = 0.95
          colors[i3 + 1] = 0.85
          colors[i3 + 2] = 0.15
        }
      } else if (type === 'kitchen') {
        // Cozy amber / yellow glowing spots
        colors[i3]     = 0.95 + t * 0.05
        colors[i3 + 1] = 0.65 + t * 0.15
        colors[i3 + 2] = 0.10 + t * 0.15
      } else if (type === 'deck') {
        // Orange embers & deep forest green
        if (t > 0.4) {
          colors[i3]     = 0.85
          colors[i3 + 1] = 0.45
          colors[i3 + 2] = 0.20
        } else {
          colors[i3]     = 0.10
          colors[i3 + 1] = 0.35
          colors[i3 + 2] = 0.20
        }
      } else if (type === 'full') {
        // Architectural cyan & lime green grid
        if (t > 0.75) {
          colors[i3]     = 0.89
          colors[i3 + 1] = 0.93
          colors[i3 + 2] = 0.15
        } else {
          colors[i3]     = 0.05
          colors[i3 + 1] = 0.70
          colors[i3 + 2] = 0.95
        }
      } else {
        // Default brand colors
        colors[i3]     = 0.80 + t * 0.2
        colors[i3 + 1] = 0.85 + t * 0.1
        colors[i3 + 2] = 0.05 + t * 0.1
      }
    }
    return { positions, colors, velocities }
  }, [config.count, type])

  // Custom 3D wireframe geometries for full remodeling and roofing
  const blueprintGeometry = useMemo(() => {
    if (type !== 'full' && type !== 'roofing') return null

    const geom = new THREE.BufferGeometry()
    let vertices: number[] = []

    if (type === 'roofing') {
      // 3D Gable Roof wireframe model
      vertices = [
        -2.2, 0, 1.2,   0, 1.6, 1.2,
        0, 1.6, 1.2,  2.2, 0, 1.2,
        2.2, 0, 1.2,   -2.2, 0, 1.2,

        -2.2, 0, -1.2,  0, 1.6, -1.2,
        0, 1.6, -1.2, 2.2, 0, -1.2,
        2.2, 0, -1.2,  -2.2, 0, -1.2,

        0, 1.6, 1.2,  0, 1.6, -1.2,
        -2.2, 0, 1.2,  -2.2, 0, -1.2,
        2.2, 0, 1.2,   2.2, 0, -1.2
      ]
    } else if (type === 'full') {
      // 3D House structural outline model
      vertices = [
        -1.8, -1.2, 1.2,   1.8, -1.2, 1.2,
         1.8, -1.2, 1.2,   1.8,  0.5, 1.2,
         1.8,  0.5, 1.2,  -1.8,  0.5, 1.2,
        -1.8,  0.5, 1.2,  -1.8, -1.2, 1.2,

        -1.8, -1.2, -1.2,  1.8, -1.2, -1.2,
         1.8, -1.2, -1.2,  1.8,  0.5, -1.2,
         1.8,  0.5, -1.2, -1.8,  0.5, -1.2,
        -1.8,  0.5, -1.2, -1.8, -1.2, -1.2,

        -1.8, -1.2, 1.2,  -1.8, -1.2, -1.2,
         1.8, -1.2, 1.2,   1.8, -1.2, -1.2,
         1.8,  0.5, 1.2,   1.8,  0.5, -1.2,
        -1.8,  0.5, 1.2,  -1.8,  0.5, -1.2,

        -1.8,  0.5, 1.2,   0, 1.8, 1.2,
         0, 1.8, 1.2,      1.8,  0.5, 1.2,
        -1.8,  0.5, -1.2,  0, 1.8, -1.2,
         0, 1.8, -1.2,     1.8,  0.5, -1.2,
         0, 1.8, 1.2,      0, 1.8, -1.2
      ]
    }

    geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    return geom
  }, [type])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime

    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.02 + mouse.x * 0.05
      meshRef.current.rotation.x = t * 0.01 - mouse.y * 0.03
    }
    if (lineRef.current) {
      lineRef.current.rotation.y = t * 0.02 + mouse.x * 0.05
      lineRef.current.rotation.x = t * 0.01 - mouse.y * 0.03
    }

    if (meshRef.current) {
      const positionsAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute
      const array = positionsAttr.array as Float32Array
      
      for (let i = 0; i < config.count; i++) {
        const i3 = i * 3
        
        array[i3]     += velocities[i3] * 0.05
        array[i3 + 1] += velocities[i3 + 1] * 0.05
        array[i3 + 2] += velocities[i3 + 2] * 0.05

        if (type === 'roofing') {
          if (array[i3 + 1] < -6) {
            array[i3] = (Math.random() - 0.5) * 16
            array[i3 + 1] = 6 + Math.random() * 2
            array[i3 + 2] = (Math.random() - 0.5) * 5
          }
        } else if (type === 'painting' || type === 'deck') {
          if (array[i3 + 1] > 6) {
            array[i3] = (Math.random() - 0.5) * 16
            array[i3 + 1] = -6 - Math.random() * 2
            array[i3 + 2] = (Math.random() - 0.5) * 5
          }
        } else {
          if (Math.abs(array[i3]) > 10) array[i3] = -array[i3]
          if (Math.abs(array[i3 + 1]) > 7) array[i3 + 1] = -array[i3 + 1]
        }
      }
      positionsAttr.needsUpdate = true
    }
  })

  return (
    <group>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color"    args={[colors, 3]}    />
        </bufferGeometry>
        <pointsMaterial
          size={config.size}
          vertexColors
          transparent
          opacity={config.opacity}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {blueprintGeometry && (
        <lineSegments ref={lineRef} geometry={blueprintGeometry}>
          <lineBasicMaterial
            color={type === 'roofing' ? '#E3EF26' : '#22d3ee'}
            transparent
            opacity={0.3}
            linewidth={1}
          />
        </lineSegments>
      )}
    </group>
  )
}
