interface CustomBannerProps {
  bannerUrl?: string | null
  logoUrl?: string | null
  creatorName: string
  altText?: string
}

export function CustomBanner({ bannerUrl, logoUrl, creatorName, altText }: CustomBannerProps) {
  if (!bannerUrl && !logoUrl) return null

  return (
    <div className="relative">
      {bannerUrl && (
        <div className="relative w-full h-40 sm:h-52 rounded-2xl overflow-hidden">
          <img
            src={bannerUrl}
            alt={altText || `Banner de ${creatorName}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
        </div>
      )}
      {logoUrl && (
        <div className={`${bannerUrl ? 'absolute -bottom-6 left-6' : 'mb-4'} flex items-center gap-3`}>
          <img
            src={logoUrl}
            alt={`Logo de ${creatorName}`}
            className="w-14 h-14 rounded-xl border-2 border-bg object-cover shadow-lg"
          />
          {!bannerUrl && (
            <span className="font-semibold text-white text-sm">{creatorName}</span>
          )}
        </div>
      )}
    </div>
  )
}
