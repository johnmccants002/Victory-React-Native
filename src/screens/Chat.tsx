import { GiftedChat } from "react-native-gifted-chat";
import React, { useState, useCallback, useEffect } from "react";

export interface User {
  _id: string | number;
  name: string;
  avatar: string;
}

export interface IMessage {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: User;
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
  quickReplies?: QuickReplies;
}

interface Reply {
  title: string;
  value: string;
  messageId?: any;
}

interface QuickReplies {
  type: "radio" | "checkbox";
  values: Reply[];
  keepIt?: boolean;
}

export const Chat = () => {
  const [messages, setMessages] = useState<Array<IMessage>>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <></>
    // <GiftedChat
    //   messages={messages}
    //   onSend={(messages) => console.log("SENT")}
    //   user={{
    //     _id: 1,
    //   }}
    // />
  );
};
