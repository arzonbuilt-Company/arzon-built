import { Navbar }                from './components/ui/Navbar'
import { CinematicBackground }   from './components/ui/CinematicBackground'
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
      <CinematicBackground />

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
