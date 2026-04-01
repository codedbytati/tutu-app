'use client'

import { Modal as ModalComponent } from 'react-bootstrap';
import { Button } from './Button';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onPrimaryButtonClick?: () => void;
  primaryButtonLabel?: string;
  onSecondaryButtonClick?: () => void;
  secondaryButtonLabel?: string;

}

export const Modal = ({
  open,
  onClose,
  title,
  children,
  onPrimaryButtonClick,
  primaryButtonLabel,
  onSecondaryButtonClick,
  secondaryButtonLabel
}: ModalProps) => {
  return (
    <ModalComponent show={open} onHide={onClose}>
      <ModalComponent.Header closeButton>
        <ModalComponent.Title>{title}</ModalComponent.Title>
      </ModalComponent.Header>
      <ModalComponent.Body>
        {children}
      </ModalComponent.Body>
      <ModalComponent.Footer>
        {onPrimaryButtonClick && (
          <Button variant='success' onClick={onPrimaryButtonClick} label={primaryButtonLabel} />
        )}
        {onSecondaryButtonClick && (
          <Button variant='success' onClick={onSecondaryButtonClick} label={secondaryButtonLabel} />
        )}
      </ModalComponent.Footer>
    </ModalComponent>
  );
}
