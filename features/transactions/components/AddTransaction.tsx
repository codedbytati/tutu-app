import { Button, Modal } from '@/components/ui';
import type { Dispatch, SetStateAction } from 'react';
import { ExtractItem } from '@/utils/types';
import { BaseForm } from './BaseForm';

type AddTransactionProps = {
  transaction: ExtractItem
  setTransaction: Dispatch<SetStateAction<ExtractItem>>
  open: boolean
  onAdd: () => void
  onOpen: () => void
  onClose: () => void
}

export const AddTransaction = ({ open, transaction, setTransaction, onAdd, onClose, onOpen }: AddTransactionProps) => {
  return (
    <>
      <Button onClick={onOpen} type='button' appearance='light' icon='add' label='Adicionar' />
      <Modal
        title="Adicionar Transação"
        open={open}
        onClose={onClose}
        primaryButtonLabel='Salvar transação'
        secondaryButtonLabel='Cancelar'
        onPrimaryButtonClick={onAdd}
        onSecondaryButtonClick={onClose}>
        <BaseForm transaction={transaction} setTransaction={setTransaction} />
      </Modal>
    </>
  );
}
