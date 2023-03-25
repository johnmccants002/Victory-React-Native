import React from "react";
import { ChannelList } from "stream-chat-expo";
import { chatApiKey, chatUserId } from "../config/chatConfig";
import { useAppContext } from "../config/AppContext";
import { useChatClient } from "../config/useChatClient";
import { useNavigation } from "@react-navigation/native";

const filters = {
  members: {
    $in: [chatUserId],
  },
};

const sort = {
  last_message_at: -1,
};

const Inbox = (props) => {
  const { setChannel } = useAppContext();
  const client = useChatClient();

  return (
    <ChannelList
      filters={filters}
      onSelect={(channel) => {
        const { navigation } = props;
        setChannel(channel);
        navigation.navigate("Chat");
      }}
    />
  );
};

export default Inbox;
