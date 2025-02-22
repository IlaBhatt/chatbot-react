import React, { useState, useRef, useEffect } from 'react';
import styles from './Chatbox.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faR, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import ResponseModal from '../responseModal/ResponseModal';
import Card from '../card/Card';
import config from '../../config/config';
import CustomMarkdownRenderer from '../customMarkdownRenderer/CustomMarkdownRenderer';
import image from '../../assets/images/chatbot.png';

interface Message {
  chat_order: number;
  message_type: string;
  message: string;
}

interface Chat {
  user_id: number;
  chat_id: number | null;
  messages: Message[];
}

interface Payload {
  query: string;
  user_id: number;
  chat_id: number;
  chat_order: number;
}

const ChatBox: React.FC = () => {
  const navigate = useNavigate();
  const { chatId } = useParams<{ chatId: string }>();
  const [chats, setChat] = useState<Chat | null>(null);
  const [input, setInput] = useState('');
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [dots, setDots] = useState<string>('.');

  useEffect(() => {
    if (!loading) return; // Only run when loading is true
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : '.'));
    }, 500);

    return () => clearInterval(interval); // Cleanup interval when loading stops
  }, [loading]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  useEffect(() => {
    // Fetch existing chat data if chatId is present
    if(!chats || parseInt(chatId) !== chats.chat_id){
        fetchChatData(chatId);
    }
  }, [chatId]);

  const fetchChatData = async(chatId: string) => {
    if(chatId){
        const response = await fetch(`${config.API_BASE_URL}/retrieve-chat/?user_id=777&chat_id=${chatId}`);
        const chat = await response.json();
        setChat(chat);
    }
    else{
        setChat(null);
    }
  }

  const getNewChatId = async() => {
    const response = await fetch(`${config.API_BASE_URL}/start-chat/?user_id=777`, {method: 'POST'});
    const chat = await response.json();
    setChat(chat);
    return chat.chat_id;
  };

  const askQuery = async(payload: Payload) => {
    setLoading(true);
    const response = await fetch(`${config.API_BASE_URL}/ask-question/`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)   
       });
    const data = await response.json();
    if(data.detail){
       setTitle('Error');
       setMessage(data.detail);
       setShow(true);
    }
    else{
      const newMessage: Message = {
        chat_order: data.chat_order,
        message_type: 'ai',
        message: data.answer
      }
      setChat((prevChat)=> ({
        ...prevChat,  
        messages: [...prevChat.messages, newMessage]
      }));
      setLoading(false);
    }           
  }

  const onCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const div = event.currentTarget as HTMLDivElement;
    const divText = div.textContent || '';
    setInput(divText);
  }

  const handleSend = async() => {
    let userInput = input;
    setInput('');
    if (!userInput.trim()) return; // Ignore empty input
    let payload: Payload;
    let newMessage: Message;

    // Check if it's a new chat (i.e., if there is no chatId in the URL)
    if (!chatId) {
      // Generate a new chatId (this could be from the server or a UUID)
      const newChatId = await getNewChatId();
      newMessage={
        chat_order: 2,
        message_type: 'human',
        message: userInput,
      };
      // Navigate to the new chat route with the generated chatId
      navigate(`/chat/${newChatId}`);
      // Add the new message to the chat (this simulates adding it locally for now)
      setChat((prevChat)=> ({
            ...prevChat,  
            messages: [...prevChat.messages, newMessage]
      }));

      payload={
        query: userInput,
        user_id: 777,
        chat_id: newChatId,
        chat_order: newMessage.chat_order
      }
    }else{
      // If it's an existing chat, append the message to the current chat
      const newChatOrder = chats.messages[chats.messages.length-1].chat_order + 1;
      newMessage = {
        chat_order: newChatOrder,
        message_type: 'human',
        message: userInput,
      };
      setChat((prevChat)=> ({
        ...prevChat,  
        messages: [...prevChat.messages, newMessage]
      }));
      payload={
        query: userInput,
        user_id: 777,
        chat_id: parseInt(chatId),
        chat_order: newChatOrder
      }
    }
    await askQuery(payload);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className={styles.container}>
      {chats === null &&
            <div className={styles.cardContainer}>
              <div className={styles.rIconContainer}>
                <img
                  src={image}
                  alt='Chatbot Image'
                  className={styles.icon}
                  style={{ width: 65, height: 65, marginBottom:10 }}
                />
              </div>
              <div className={styles.cards}>
                  <Card title="What is Market cap?" onClick={onCardClick}/>
                  <Card title="Help me understand simple attributes and complex attributes." onClick={onCardClick} />
                  <Card title="Help me understand validation rules." onClick={onCardClick} />
              </div>
            </div>
      }
      <div className={styles.chatboxContainer}>
        {chats?.messages?.map((message: Message, index: number) =>
            <div
              key={index}
              className={`${styles.message} ${
                message.message_type === 'ai' ? styles.chatgpt : styles.human
              }`}
            >
              {message.message_type === 'ai' ? 
                <CustomMarkdownRenderer text={message.message}/> : message.message
              }
            </div>
        )}
        {loading && <span>Searching for the best answer{dots}</span>}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.inputArea}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask your question"
            onKeyDown={handleKeyDown}
            className={styles.messageInput}
          />
          <FontAwesomeIcon
            icon={faArrowRight}
            onClick={handleSend}
            className={styles.sendBtn}
            size="lg"
          />
        </div>
      </div>
      <ResponseModal
        title={title}
        show={show}
        message={message}
        onHide={() => setShow(false)}
      />
    </div>
  );
};

export default ChatBox;
