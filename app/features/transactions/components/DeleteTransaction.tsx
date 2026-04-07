import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';

type DeleteTransactionProps = {
  open: boolean
  onDelete: () => void
  onOpenDelete: () => void
  onClose: () => void
}

export const DeleteTransaction = ({ open, onClose, onDelete, onOpenDelete }: DeleteTransactionProps) => {
  return (
    <>
      <Button icon='delete' variant='danger' aria-label='Excluir' onClick={onOpenDelete} />
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
