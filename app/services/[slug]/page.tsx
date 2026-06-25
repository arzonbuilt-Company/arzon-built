import { notFound }   from 'next/navigation'
import { getService, SERVICES } from '../../lib/services-data'
import { ServicePageClient }    from './ServicePageClient'

export async function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s = getService(slug)
  if (!s) return {}
  return {
    title: `${s.title.en} | Arzon Built`,
    description: s.body.en.slice(0, 160),
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service  = getService(slug)
  if (!service) notFound()
  return <ServicePageClient service={service} />
}
