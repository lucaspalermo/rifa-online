import { Instagram, Phone, Facebook, Youtube } from 'lucide-react'

interface SocialLinksProps {
  instagramUrl?: string | null
  whatsappUrl?: string | null
  facebookUrl?: string | null
  youtubeUrl?: string | null
  tiktokUrl?: string | null
}

const TikTokIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.89a8.18 8.18 0 0 0 3.76.97V6.69Z" />
  </svg>
)

export function SocialLinks({ instagramUrl, whatsappUrl, facebookUrl, youtubeUrl, tiktokUrl }: SocialLinksProps) {
  const links = [
    { url: instagramUrl, icon: Instagram, label: 'Instagram', color: 'hover:text-pink-400' },
    { url: whatsappUrl, icon: Phone, label: 'WhatsApp', color: 'hover:text-green-400' },
    { url: facebookUrl, icon: Facebook, label: 'Facebook', color: 'hover:text-blue-400' },
    { url: youtubeUrl, icon: Youtube, label: 'YouTube', color: 'hover:text-red-400' },
    { url: tiktokUrl, icon: TikTokIcon, label: 'TikTok', color: 'hover:text-white' },
  ].filter((l) => l.url)

  if (links.length === 0) return null

  return (
    <div className="flex items-center gap-2">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.url!}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-9 h-9 glass rounded-lg flex items-center justify-center text-gray-400 ${link.color} transition-colors`}
          title={link.label}
        >
          <link.icon />
        </a>
      ))}
    </div>
  )
}
