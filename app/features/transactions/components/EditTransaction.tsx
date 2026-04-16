import { IconButton, Modal, Select, TextField } from '@/app/components/ui';
import { NewTransactionInput } from '../hooks/useTransactions';
import { Dispatch, SetStateAction } from 'react';

type AddTransactionProps = {
  transaction: NewTransactionInput
  setTransaction: Dispatch<SetStateAction<NewTransactionInput>>
  open: boolean
  onAdd: () => void
  onOpen: () => void
  onClose: () => void
}

export const EditTransaction = ({ open, transaction, setTransaction, onAdd, onClose, onOpen }: AddTransactionProps) => {
  const transactionTypeOptions: Array<NewTransactionInput['type']> = ['EXPENSE', 'INCOME']
  const transactionTypeLabel: Record<NewTransactionInput['type'], string> = {
    EXPENSE: 'Despesa',
    INCOME: 'Receita',
  }
  return (
    <>
      <IconButton icon='edit' appearance='light' label='Editar' onClick={onOpen} />
      <Modal
        open={open}
        onClose={onClose}
        title="Editar transação"
        primaryButtonLabel='Salvar'
        onPrimaryButtonClick={onAdd}
        secondaryButtonLabel='Cancelar'
        onSecondaryButtonClick={onClose}
      >
        <TextField
          label='Data da transação'
          placeholder='Selecione a data'
          type='date'
          id='transaction-date'
          name='transaction-date'
          value={transaction.date}
          onChange={(event) => setTransaction({ ...transaction, date: event.target.value })}
        />

        <Select
          label='Tipo de transação'
          options={transactionTypeOptions}
          value={transaction.type}
          getOptionLabel={(option) => transactionTypeLabel[option]}
          getOptionKey={(option) => option}
          onChange={(value) => setTransaction({ ...transaction, type: value })}
        />

        <TextField
          label='Descrição'
          placeholder='Digite a descrição'
          type='text'
          id='transaction-description'
          name='transaction-description'
          value={transaction.description}
          onChange={(event) => setTransaction({ ...transaction, description: event.target.value })}
        />

        <TextField
          label='Valor'
          placeholder='0,00'
          type='number'
          id='transaction-amount'
          name='transaction-amount'
          min={0}
          value={transaction.amount}
          onChange={(event) => setTransaction({ ...transaction, amount: event.target.value })}
        />
      </Modal>
    </>
  );
}
