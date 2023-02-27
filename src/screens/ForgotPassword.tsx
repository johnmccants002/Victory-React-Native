import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

const PasswordReset = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    // code for sending password reset link to the provided email address goes here
  };

  return (
    <View>
      <Text>Enter your email address:</Text>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="email"
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={handleSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PasswordReset;
