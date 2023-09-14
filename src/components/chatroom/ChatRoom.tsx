import { Link, useParams } from 'react-router-dom';

import { Channels } from '../AuthenticatedApp';
import MessageInput from '../message-input/MessageInput';
import MessageList from '../message-list/MessageList';

type Params = {
  id: string;
};
interface ChannelsProp {
  channels: Channels[];
}
const ChatRoom = ({ channels }: ChannelsProp) => {
  const params = useParams<Params>();
  const room = channels.find((channel) => channel.id === params.id) || null;
  if (!room) {
    <>Channel not found! Go back and try again</>;
  }

  return (
    <>
      <h2>{room?.title}</h2>
      <div>
        <Link to="/">Back to all channels</Link>
      </div>
      <div className="messages-container">
        <MessageList roomId={room?.id as string} />
        <MessageInput roomId={room?.id as string} />
      </div>
    </>
  );
};

export default ChatRoom;
