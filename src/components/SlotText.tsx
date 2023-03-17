import { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet } from "react-native";
import SlotMachine from "react-native-slot-machine";

export default function SlotText() {
  const [slotSettings, setSlotSettings] = useState({
    duration: 2000,
    slot1: "2",
  });
  const slotRef = useRef(null);
  //   useEffect(() => {
  //     setTimeout(
  //       () =>
  //         setSlotSettings({
  //           duration: 1000,
  //           slot1: "4934",
  //           slot2: "world",
  //           slot3: "1234",
  //         }),
  //       5000
  //     );
  //     setTimeout(
  //       () =>
  //         setSlotSettings({
  //           duration: 4000,
  //           slot1: "0001",
  //           slot2: "hello",
  //           slot3: "2351",
  //         }),
  //       7000
  //     );
  //     setTimeout(() => slotRef.current.spinTo("0001"), 12000);
  //   }, []);

  return (
    <View
      style={{
        height: 80,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <SlotMachine
        text={slotSettings.slot1}
        duration={slotSettings.duration}
        styles={styles}
        padding={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    overflow: "hidden",
    backgroundColor: "white",
    width: 100,
  },
  slotWrapper: {
    backgroundColor: "white",
    width: 80,
    height: 40,
    marginLeft: 5,
  },
  slotInner: {
    backgroundColor: "white",
    // alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  text: {
    fontSize: 18,
    top: -2,
    fontWeight: "bold",
    color: "purple",
  },
  innerBorder: {
    position: "absolute",
    top: 1,
    right: 1,
    left: 1,
    bottom: 1,
    borderColor: "white",
    // borderWidth: 1,
    zIndex: 1,
  },
  outerBorder: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    borderColor: "white",
    // borderWidth: 1,
    zIndex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: "#ffffff77",
  },
});
