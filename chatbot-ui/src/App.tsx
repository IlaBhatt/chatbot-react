import React from 'react';
import './App.css';
import ChatBox from './components/chatbox/Chatbox';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PdfUploadPage from './components/pdfUploadPage/PdfUploadPage';
import Layout from './components/layout/Layout';
import AddTextPage from './components/addTextPage/AddTextPage';


function App() {
  return (
    <Router>
    <div className="App">
        <Layout>
          <Routes>
            <Route path='/' element={<ChatBox />} />
            <Route path="/pdf-upload" element={<PdfUploadPage/>}/>
            <Route path="/add-text" element={<AddTextPage/>} />
            <Route path="/chat/:chatId" element={<ChatBox />} />
          </Routes>
        </Layout>
    </div>
    </Router>
  );
}

export default App;
