'use client'

import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';

type DeleteTransactionProps = {
  onDelete: () => void
}

export const DeleteTransaction = ({ onDelete }: DeleteTransactionProps) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button icon='delete' variant='danger' aria-label='Excluir' onClick={handleShow} />
      <Modal
        open={show}
        onClose={handleClose}
        title="Excluir transação"
        primaryButtonLabel='Excluir'
        onPrimaryButtonClick={onDelete}
        secondaryButtonLabel='Cancelar'
        onSecondaryButtonClick={handleClose}
      >
        <p className='m-0'>Deseja mesmo excluir a transação? Essa ação não poderá ser desfeita após a confirmação.</p>
      </Modal>
    </>
  );
}
