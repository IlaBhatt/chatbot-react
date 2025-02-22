import React, { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleXmark, faTrash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink, useNavigate } from 'react-router-dom';
import config from "../../config/config";
import ResponseModal from '../responseModal/ResponseModal';
import image from '../../assets/images/chat.png';

interface Chat {
    user_id: number;
    chat_id: number;
    last_updated: string;
    chat_header: string;
}

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    // const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [chats, setChats] = useState<Chat[]>(null);
    const [title, setTitle]= useState<string>('');
    const [message, setMessage]= useState<string>('');
    const [show, setShow]= useState<boolean>(false);
    const [fetchChat, setFetchChat] = useState<boolean>(false);
    const navigate =useNavigate();

    const toggleSidebar = () => setIsOpen(!isOpen);

    const deleteChat = async(chatId: number) => {
        const response = await fetch(`${config.API_BASE_URL}/delete-chat/?user_id=777&chat_id=${chatId}`, {method : 'DELETE'});
        const data = await response.json();
        if(data.detail){
            setTitle('Success!');
            setMessage(data.detail);
            setShow(true);
            setChats((prevChats) => prevChats.filter((chat) => chat.chat_id!==chatId));
        }else{
            alert('Failed to delete the item');
        }
    }

    const onHide = () => {
        setShow(false);
        navigate('/');
    }

    useEffect(() => {
        // [GET] chats
        const fetchChats = async () => {
            const response = await fetch(`${config.API_BASE_URL}/get-user-chats/?user_id=777`);
            const chats = await response.json();
            if(chats.detail){
                //do something
            }else{
                setChats(chats);
            }    
        };
        fetchChats();
    }, [fetchChat]);

    return (
        <div className={styles.sidebarContainer}>
            {isOpen ? (
                    <FontAwesomeIcon
                        icon={faCircleXmark}
                        className={styles.closeIcon}
                        onClick={toggleSidebar}
                        size='lg'
                    />
                ) : (
                    <FontAwesomeIcon
                        icon={faBars}
                        className={styles.hamIcon}
                        onClick={toggleSidebar}
                        size='lg'
                    />
                )}
            <div className={isOpen ? styles.sidebarOpen : styles.sidebarClosed}>
                <ul>
                <NavLink to='/' className={styles.navItem}>
                    <li className={styles.sidebarListItem} onClick={()=> setFetchChat((fetchChat) => !fetchChat)}>
                        New Chat

                        <img
                            src={image}
                            alt='New Chat'
                            className={styles.icon}
                            style={{}}
                        />
                    </li>
                </NavLink>
                    <li className={styles.sidebarListItem}>About</li>
                </ul>
                <h6>Chat History</h6>
                <ul>
                    {chats?.map((chat, index) => (
                        <li key={chat.chat_id} className={styles.sidebarListItem}>
                            <NavLink to={`/chat/${chat.chat_id}`} className={styles.navItem}>
                                Chat {chat.chat_header?.slice(0,12)}...
                            </NavLink>
                            <FontAwesomeIcon icon={faTrash} className={styles.deleteIcon} onClick={() => deleteChat(chat.chat_id)}/>
                        </li>
                    ))}
                </ul>
            </div>
            <ResponseModal
                title={title}
                message={message}
                show={show}
                onHide={onHide}
            />
        </div>
    );
};

export default Sidebar;
