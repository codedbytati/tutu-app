import { Modal } from '@/components/ui';
import { ExtractItem } from '@/utils/types';
import type { Dispatch, SetStateAction } from 'react';
import { BaseForm } from './BaseForm';

type AddTransactionProps = {
  transaction: ExtractItem
  setTransaction: Dispatch<SetStateAction<ExtractItem>>
  open: boolean
  onAdd: () => void
  onClose: () => void
}

export const EditTransaction = ({ open, transaction, setTransaction, onAdd, onClose }: AddTransactionProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Editar transação"
      primaryButtonLabel='Salvar edição'
      onPrimaryButtonClick={onAdd}
      secondaryButtonLabel='Cancelar'
      onSecondaryButtonClick={onClose}
    >
      <BaseForm transaction={transaction} setTransaction={setTransaction} />
    </Modal>
  )
}
