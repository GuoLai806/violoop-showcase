type CompanyLogosProps = { className?: string }

const platforms = ['macOS', 'Windows', 'Linux', 'BYOK', 'No API']

export default function CompanyLogos({ className = '' }: CompanyLogosProps) {
  return (
    <div className={`mt-2 max-sm:mt-2.5 sm:mt-4 ${className}`}>
      <p className="mb-2 text-left text-[9px] uppercase tracking-[0.18em] text-mist/35 sm:text-xs">
        Works on your real computer
      </p>
      <ul className="flex flex-wrap items-center justify-start gap-2">
        {platforms.map((platform) => (
          <li key={platform} className="rounded-full border border-mist/15 bg-black/20 px-3 py-1 text-[9px] tracking-[0.12em] text-mist/65 sm:text-[11px]">
            {platform}
          </li>
        ))}
      </ul>
    </div>
  )
}
