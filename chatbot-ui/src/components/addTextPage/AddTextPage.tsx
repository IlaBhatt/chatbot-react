import React, { useState } from 'react';
import styles from './AddTextPage.module.css';
import ResponseModal from '../responseModal/ResponseModal';
import config from "../../config/config";

const AddTextPage: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [show, setShow] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    const handleAddText = async() => {
        const response = await fetch(`${config.API_BASE_URL}/process-text/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({text: text})
        });
        const data = await response.json();
        setText('');
        if(data.detail){
            setTitle('Error');
            setMessage(data.detail);
            setShow(true);
        }else{
            setTitle('Success!');
            setMessage(data.message);
            setShow(true);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
            <h5 className={styles.heading}>Add Text Data</h5>
            <textarea
                value={text}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Enter text here"
            />
            <button onClick={handleAddText} className={styles.button}>
                Add Text
            </button>
            </div>
            <ResponseModal
                title={title}
                show={show}
                message={message}
                onHide={()=> setShow(false)}
            />
        </div>
    );
};

export default AddTextPage;
