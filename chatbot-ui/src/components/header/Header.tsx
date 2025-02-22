import React, { useRef, useState, useEffect } from 'react'
import styles from './Header.module.css';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import config from "../../config/config";

interface ListItem {
  id: number;
  label: string;
  action?: () => void;
  to?: string;
}

const Header : React.FC= () => {

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);
  const deleteVectorStore = () =>{
    setShowDeleteModal(true);
  }

  const items: ListItem[] = [
    { id: 1, label: 'Process PDF', to: '/pdf-upload' },
    { id: 2, label: 'Delete Vector Store', action: deleteVectorStore },
    { id: 3, label: 'Add Text', to: '/add-text' },
    { id: 4, label: 'Ask a Question', to: '/' }
  ];

  const toggleSettings = () =>{
    setIsOpen((prev) => !prev);
  }
  const handleClose = () => {
    setShowDeleteModal(false);
  }

  const handleCloseSuccess = () => {
    setDeleteSuccess(false);
  }

  const handleItemClick = (id: number): void => {
    setSelectedId(id);
  }

  const onVectorStoreDelete = async() => {
    try{
      const response = await fetch(`${config.API_BASE_URL}/delete-vector-store/`, {method : 'DELETE'});
      if(response.ok){
        setShowDeleteModal(false);
        setDeleteSuccess(true);
      }else{
        setShowDeleteModal(false);
        throw new Error('Failed to delete the item');
      }
    }
    catch(error){
      console.error("Error deleting vector store", error);
      alert('Error deleting vector store');
    }
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, []);

  return (
    <div className={styles.headerContainer}>
      <h5 className={styles.heading}>RDP Chatbot Companion</h5>
      <FontAwesomeIcon icon={faGear} className={styles.settings} size='lg' onClick={toggleSettings}/>
      {isOpen && (
        <div className={styles.dropdown} ref={dropdownRef}>
          <ul>
            {items.map((item) => (
              item.to ? <NavLink to={item.to} className={styles.navItem}><li className={`${styles.listItem} ${selectedId === item.id ? styles.selected : ''}`} onClick={() => handleItemClick(item.id)}>{item.label}</li></NavLink> 
                      : <li className={`${styles.listItem} ${selectedId === item.id ? styles.selected : ''}`} onClick={item.action}>{item.label}</li>
            ))}
          </ul>
        </div>
      )}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className={styles.title}>Delete Vector Store</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete vector store?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={onVectorStoreDelete}>Yes</Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={deleteSuccess}
        onHide={() => setDeleteSuccess(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className={styles.title}>Delete Vector Store Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your vector store has been deleted successfully.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSuccess}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Header