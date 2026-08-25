import { useContactModal } from '../../context/ContactModalContext'

type ContactButtonProps = {
  className?: string
  label?: string
}

export default function ContactButton({
  className = '',
  label = 'Contact Me',
}: ContactButtonProps) {
  const { openModal } = useContactModal()

  return (
    <button
      type="button"
      onClick={openModal}
      className={`inline-flex items-center justify-center rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white transition-transform hover:scale-105 sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base ${className}`}
      style={{
        background:
          'linear-gradient(123deg, #061412 7%, #0B7F75 37%, #15B8A6 72%, #7CEBDD 100%)',
        boxShadow:
          '0px 4px 24px rgba(21, 184, 166, 0.3), inset 4px 4px 12px #0F766E',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
    >
      {label}
    </button>
  )
}
