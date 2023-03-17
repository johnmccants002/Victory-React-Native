import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  SafeAreaView,
} from "react-native";

const Tokens = (props) => {
  const { toggleModal, setToggleModal } = props;

  return (
      <Modal
        transparent={true}
        animationType="slide"
        visible={toggleModal}
        onDismiss={() => setToggleModal(false)}
        style={styles.modalContainer}
        animationType="slide"
      >
        <Pressable
          onPress={() => setToggleModal(false)}
          style={styles.backdrop}
        >
          <></>
        </Pressable>
        <View style={styles.modalContent}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                    {/* MaterialIcon */}
                </View>
                <View>
                    {/* Title */}
                </View>
            </View>
          <Text>Testing</Text>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
  },
  modalContainer: {
    flex: 1,
  },
  backdrop: {
    backgroundColor: "rgba(0,0,0,.7)",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContent: {
    // borderColor: "red",
    // borderWidth: 1,
    flex: 1,
    backgroundColor: "white",
    // borderRadius: 15,
  },
});

export default Tokens;
