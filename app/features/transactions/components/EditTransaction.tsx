import { Button } from '../../../components/ui/Button';
import { Form } from 'react-bootstrap';
import { Modal } from '../../../components/ui/Modal';

type EditTransactionProps = {
  open: boolean
  onClose: () => void
}

export const EditTransaction = ({ open, onClose }: EditTransactionProps) => {
  return (
    <>
      <Button icon='edit' variant='secondary' aria-label='Editar' onClick={onClose} />
      <Modal
        open={open}
        onClose={onClose}
        title="Editar transação"
        primaryButtonLabel='Salvar'
        onPrimaryButtonClick={onClose}
        secondaryButtonLabel='Cancelar'
        onSecondaryButtonClick={onClose}
      >
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Data da transação</Form.Label>
            <Form.Control type='date' />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Tipo de transação</Form.Label>
            <Form.Select aria-label="Tipo de transação">
              <option disabled>Selecione um tipo</option>
              <option value="EXPENSE">Despesa</option>
              <option value="INCOME">Receita</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Valor</Form.Label>
            <Form.Control type='text' placeholder="R$ 0,00" />
          </Form.Group>
        </Form>
      </Modal>
    </>
  );
}
