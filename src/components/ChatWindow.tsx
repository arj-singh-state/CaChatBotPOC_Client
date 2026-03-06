import React, { useState, useRef, useEffect } from "react";
import parse from 'html-react-parser';
import './ChatWindow.css';

export interface Message {
    user: string;
    text: string;
}

interface ChatWindowProps {
    user: string;
    messages: Message[];
    onSend: (message: string) => void;
    isLoading?: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
    user,
    messages,
    onSend
}) => {
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = (e: React.SubmitEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onSend(input.trim());
            setInput("");
        }
    };

    return (
        <div className="chat-window">
            <div className="chat-messages">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`chat-message-row${msg.user === user ? " user" : ""}`}
                    >
                        <div
                            className={`chat-message-bubble${msg.user === user ? " user" : ""}`}
                        >
                            <strong>{msg.user === user ? "You" : msg.user}</strong>
                            <div>{parse(msg.text)}</div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSend} className="chat-input-form">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="chat-input"
                />
                <button
                    type="submit"
                    disabled={!input.trim()}
                    className="chat-send-btn"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatWindow;