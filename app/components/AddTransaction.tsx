'use client'

import { useState } from 'react';
import { Button } from './ui/Button';
import { Form } from 'react-bootstrap';
import { Modal } from './ui/Modal';

export const AddTransaction = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow} type='button' variant='dark' icon='add' label='Adicionar' />
      <Modal open={show} onClose={handleClose} title="Adicionar Transação" primaryButtonLabel='Salvar' onPrimaryButtonClick={handleClose}>
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
