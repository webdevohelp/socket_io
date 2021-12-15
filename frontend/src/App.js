import './App.css';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { nanoid } from 'nanoid';

const socket = io('http://localhost:5000');
const userName = nanoid(4);

function App() {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    useEffect(() => {
        socket.on('chat', (payload) => {
            setChat([...chat, payload]);
        });
    });

    const sendChat = (e) => {
        e.preventDefault();
        socket.emit('chat', { message, userName });
        setMessage('');
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Catty app</h1>
                {chat.map((payload, index) => {
                    return (
                        <p key={index}>
                            {payload.message}:{' '}
                            <span>id: {payload.userName}</span>
                        </p>
                    );
                })}
                <form onSubmit={sendChat}>
                    <input
                        type="text"
                        name="chat"
                        placeholder="Send message"
                        value={message}
                        autoFocus
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                    />
                    <button type="submit">Send</button>
                </form>
            </header>
        </div>
    );
}

export default App;
