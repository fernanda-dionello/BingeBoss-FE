import Modal from 'react-bootstrap/Modal';
import './ModalElement.css';

export function ModalElement(props){
    return (
        <Modal
          {...props}
          size={props.size ? props.size : 'sm'}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton />
          <Modal.Body>
            {props.children}
          </Modal.Body>
        </Modal>
      );
}