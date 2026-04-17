import { IconButton, Modal } from '@/app/components/ui';

type DeleteTransactionProps = {
  open: boolean
  onDelete: () => void
  onOpenDelete: () => void
  onClose: () => void
}

export const DeleteTransaction = ({ open, onClose, onDelete, onOpenDelete }: DeleteTransactionProps) => {
  return (
    <>
      <IconButton icon='delete' appearance='danger' label='Excluir' onClick={onOpenDelete} />
      <Modal
        open={open}
        onClose={onClose}
        title="Excluir transação"
        primaryButtonLabel='Excluir'
        onPrimaryButtonClick={onDelete}
        secondaryButtonLabel='Cancelar'
        onSecondaryButtonClick={onClose}
      >
        <p className='m-0'>Deseja mesmo excluir a transação? Essa ação não poderá ser desfeita após a confirmação.</p>
      </Modal>
    </>
  );
}
