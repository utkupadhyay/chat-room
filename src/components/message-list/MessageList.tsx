import React, { useLayoutEffect, useRef } from 'react';

import { useAuth } from '../../hooks/useAuth';
import useMessages  from '../../hooks/useMessages';

interface MessageListProps {
  roomId: string;
}

interface MessageProps {
  message: {
    id: string;
    uid: string;
    displayName: string;
    text: string;
  };
  isOwnMessage: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ roomId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const messages = useMessages(roomId);

  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="message-list-container" ref={containerRef}>
      <ul className="message-list">
        {messages.map((msg) => (
          <Message
            key={msg.id}
            message = {{id:msg.id, uid: msg.uid, displayName: msg.displayName, text:msg.text}}
            isOwnMessage={msg.uid === user?.uid ?? ''}
          />
        ))}
      </ul>
    </div>
  );
};

const Message: React.FC<MessageProps> = ({ message, isOwnMessage }) => {
  const { displayName, text } = message;
  return (
    <li className={['message', isOwnMessage && 'own-message'].join(' ')}>
      <h4 className="sender">{isOwnMessage ? 'You' : displayName}</h4>
      <div>{text}</div>
    </li>
  );
};

export default MessageList;
