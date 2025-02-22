import React, { useState } from 'react';
import styles from './PdfUploadPage.module.css';
import ResponseModal from '../responseModal/ResponseModal';
import config from "../../config/config";

const PdfUploadPage: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [show, setShow] = useState<boolean>(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async() => {
        if (selectedFile) {
            // Process the file here. For example, send it to a server or use a PDF library to read contents.
            console.log('Uploading', selectedFile.name);
            // Example: You could use FormData and fetch/Axios to send it to a server.
            const formData = new FormData();
            formData.append('file', selectedFile);

            // Example POST request (you need to have a server endpoint to handle this)
            const response = await fetch(`${config.API_BASE_URL}/process-pdf/`, { method: 'POST', body: formData });
            const data = await response.json();
            if(data.detail){
                setTitle('Error')
                setMessage(data.detail);
                setShow(true);
            }else{
                setTitle('Success!')
                setMessage(data.message);
                setShow(true);
            }
        } else {
            console.error('No file selected');
            alert('No file selected! Please select a file.')
        }
    };

    return (
        <div className={styles.container}>
            <input type="file" accept="application/pdf" onChange={handleFileChange} className={styles.fileInput} />
            <button onClick={handleUpload} className={styles.uploadButton}>Upload PDF</button>
            <ResponseModal
                title={title}
                show={show}
                message={message}
                onHide={()=> setShow(false)}
            />
        </div>
    );
};

export default PdfUploadPage;
