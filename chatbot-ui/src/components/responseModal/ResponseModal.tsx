import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './ResponseModal.module.css';
interface ModalProps {
    title: string,
    show: boolean;
    message: string;
    onHide: () => void;
}

const ResponseModal: React.FC<ModalProps> = ({ title, show, message, onHide }) => {
    return (
        <Modal show={show} onHide={onHide} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title className={styles.title}>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ResponseModal;
