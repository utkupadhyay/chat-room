import { useEffect, useState } from 'react';

import { getMessages } from '../services/firebase';

export interface MessageProp {
  id: string;
  uid: string;
  displayName: string;
  text: string;
}

function useMessages(roomId: string) {
  const [messages, setMessages] = useState<MessageProp[]>([]);

  useEffect(() => {
    const unsubscribe = getMessages(roomId, (receivedMessages) => {
      setMessages(receivedMessages as MessageProp[]);
    });
    return unsubscribe;
  }, [roomId]);

  return messages;
}

export default useMessages;
