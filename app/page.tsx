import { Navbar }                from './components/ui/Navbar'
import { HeroSection }           from './components/sections/HeroSection'
import { TransformationSection } from './components/sections/TransformationSection'
import { ServicesSection }       from './components/sections/ServicesSection'
import { PortfolioSection }      from './components/sections/PortfolioSection'
import { AboutSection }          from './components/sections/AboutSection'
import { ContactSection }        from './components/sections/ContactSection'
import { Footer }                from './components/sections/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent relative">
      {/* Floating Cinematic Background Video */}
      <div className="fixed inset-2 sm:inset-4 -z-50 overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 pointer-events-none shadow-2xl">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
        >
          <source src="/assets/secuencia_1.mp4" type="video/mp4" />
        </video>
        {/* Dark brand overlay for high text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/65 via-bg/20 to-bg/65 pointer-events-none" />
      </div>

      <Navbar />
      <HeroSection />
      <TransformationSection />
      <ServicesSection />
      <PortfolioSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
