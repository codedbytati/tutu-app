import { Button } from '../../../components/ui/Button';
import { Form } from 'react-bootstrap';
import { Modal } from '../../../components/ui/Modal';
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

export const AddTransaction = ({ open, transaction, setTransaction, onAdd, onClose, onOpen }: AddTransactionProps) => {


  return (
    <>
      <Button onClick={onOpen} type='button' variant='dark' icon='add' label='Adicionar' />
      <Modal
        title="Adicionar Transação"
        open={open}
        onClose={onClose}
        primaryButtonLabel='Salvar'
        secondaryButtonLabel='Cancelar'
        onPrimaryButtonClick={onAdd}
        onSecondaryButtonClick={onClose}>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Data da transação</Form.Label>
            <Form.Control
              type='date'
              value={transaction.date}
              onChange={(event) => setTransaction({ ...transaction, date: event.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Tipo de transação</Form.Label>
            <Form.Select
              aria-label="Tipo de transação"
              value={transaction.type}
              onChange={(event) => setTransaction({ ...transaction, type: event.target.value as 'EXPENSE' | 'INCOME' })}
            >
              <option value='' disabled>Selecione um tipo</option>
              <option value="EXPENSE">Despesa</option>
              <option value="INCOME">Receita</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite a descrição"
              value={transaction.description}
              onChange={(event) => setTransaction({ ...transaction, description: event.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Valor</Form.Label>
            <Form.Control
              type='text'
              placeholder="R$ 0,00"
              value={transaction.amount}
              onChange={(event) => setTransaction({ ...transaction, amount: event.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal>
    </>
  );
}
