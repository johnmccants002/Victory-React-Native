import { Channel, MessageList, MessageInput } from "stream-chat-expo"; // Or stream-chat-expo
import { useAppContext } from "../config/AppContext";
import { View } from "react-native";

const ChatScreen = (props) => {
  const { channel } = useAppContext();

  return (
    <View style={{ flex: 1, marginBottom: 20 }}>
      <Channel channel={channel}>
        <MessageList />
        <MessageInput />
      </Channel>
    </View>
  );
};

export default ChatScreen;
