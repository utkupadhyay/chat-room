import { Link, useParams } from 'react-router-dom';

import { chatRooms } from '../../chatrooms/chatroomData';
import MessageInput from '../message-input/MessageInput';
import MessageList from '../message-list/MessageList';

type Params = {
  id: string;
};

function ChatRoom() {
  const params = useParams<Params>();

  const room = chatRooms.find((x) => x.id === params.id) || null;
  if (!room) {
    // TODO: 404
  }

  return (
    <>
      <h2>{room?.title}</h2>
      <div>
        <Link to="/">Back to all rooms</Link>
      </div>
      <div className="messages-container">
        <MessageList roomId={room?.id as string} />
        <MessageInput roomId={room?.id as string} />
      </div>
    </>
  );
}

export { ChatRoom };
