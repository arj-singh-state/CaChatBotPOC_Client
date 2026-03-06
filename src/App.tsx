import connection from './SignalRConnection';

import assistantIcon from './assets/assistant.jpg'
import closeButtonIcon from './assets/close_button.jpg'

import "./App.css"

import {ChatWindow, type Message} from "./components/ChatWindow";

import { useEffect, useState } from "react";


function App() {

  const [messages, setMessages] = useState<Message[]>([]);
  const [windowOpen, setWindowOpen] = useState<boolean>(false);

  useEffect(() => {

        if (windowOpen) {

          connection.start().catch(err => console.error(err));

          connection.on('ReceiveMessage', (user, message) => {
              setMessages(messages => [...messages, {user: user, text: message}]);
          });
        }

        return () => {
            connection.off('ReceiveMessage');
        };

  }, [windowOpen]);
    
  const sendMessage = (messageToSend: string) => {
        setMessages(messages => [...messages, {user: "test", text: messageToSend}])
        connection.invoke('SendMessage', '', messageToSend)
        .catch(err => console.error(err));
  };

  if (windowOpen) {
    return (

      <div>
        <div className='chat-container'>
          
          <ChatWindow 
            user="test"
            messages={messages}
            onSend={(msg) => sendMessage(msg)}
          >
          </ChatWindow>
        </div>

        <button className='chat-button' onClick={() => setWindowOpen(false)} >
            <img src={closeButtonIcon} style={{width: "50px", height: "50px", borderRadius: "100px"}}></img>
        </button>

      </div>
    )
  }
  else {
    return (

        <button className='chat-button' onClick={() => setWindowOpen(true)}>
          <img src={assistantIcon} style={{width: "90px", height: "90px", borderRadius: "100px"}}></img>
        </button>
    )
  }
}

export default App
