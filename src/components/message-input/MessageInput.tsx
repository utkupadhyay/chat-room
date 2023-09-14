import React, { ChangeEvent, FormEvent, useState } from 'react';

import { useAuth } from '../../hooks/useAuth';
// Assuming useAuth provides User type
import { sendMessage } from '../../services/firebase';

interface MessageInputProps {
  roomId: string;
}

function MessageInput({ roomId }: MessageInputProps) {
  const { user } = useAuth();
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user !== null) {
      const displayName = user.displayName as string;
      sendMessage(roomId, { uid: user.uid, displayName }, value);
    }
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="message-input-container">
      <input
        type="text"
        placeholder="Enter a message"
        value={value}
        onChange={handleChange}
        className="message-input"
        required
        minLength={1}
      />
      <button
        type="submit"
        disabled={value.length < 1}
        className="send-message">
        Send
      </button>
    </form>
  );
}

export default MessageInput;
