import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
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

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h1" className="text-base font-semibold text-gray-900">
                    {title}
                  </DialogTitle>
                  <div className="mt-2">
                    {children}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex gap-2 justify-end p-4'>
              <Button
                type="button"
                appearance="light"
                label={secondaryButtonLabel}
                onClick={onSecondaryButtonClick}
              />
              <Button
                type="button"
                appearance='dark'
                label={primaryButtonLabel}
                onClick={onPrimaryButtonClick}
              />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
