import { Channel, MessageList, MessageInput } from "stream-chat-expo"; // Or stream-chat-expo
import { useAppContext } from "../config/AppContext";

const ChatScreen = (props) => {
  const { channel } = useAppContext();

  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
};

export default ChatScreen;
