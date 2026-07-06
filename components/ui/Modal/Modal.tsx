import { useEffect } from 'react'
import { Button } from '../Button/Button'

type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  primaryButtonLabel: string
  onPrimaryButtonClick: () => void
  secondaryButtonLabel: string
  onSecondaryButtonClick: () => void

}

export const Modal = ({
  open,
  onClose,
  title,
  children,
  primaryButtonLabel,
  onPrimaryButtonClick,
  secondaryButtonLabel,
  onSecondaryButtonClick
}: ModalProps) => {
  useEffect(() => {
    if (!open) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <div className='relative z-10 w-full'>
      <div className='fixed inset-0 z-10 bg-gray-500/75' onClick={onClose} />

      <div className='fixed inset-0 z-20 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
            <div className='w-full bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
              <h1 className='text-base font-semibold text-gray-900'>
                {title}
              </h1>
              <div className='mt-2 w-full'>
                {children}
              </div>
            </div>
            <div className='flex gap-2 justify-end p-4'>
              <Button
                type='button'
                appearance='light'
                label={secondaryButtonLabel}
                onClick={onSecondaryButtonClick}
              />
              <Button
                type='button'
                appearance='dark'
                label={primaryButtonLabel}
                onClick={onPrimaryButtonClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
