import { Modal } from '@/components/ui';

type DeleteTransactionProps = {
  open: boolean
  onDelete: () => void
  onClose: () => void
}

export const DeleteTransaction = ({ open, onClose, onDelete }: DeleteTransactionProps) => {
  return (
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
  );
}
