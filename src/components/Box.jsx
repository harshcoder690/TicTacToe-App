import { StyleSheet, View, Pressable } from "react-native";
import Circle from "./Circle";
import Cross from "./Cross";
const Box = (props) => {
  const { boxes, onPress } = props;
  return (
    <Pressable style={styles.box} onPress={() => onPress()}>
      {boxes === "o" && <Circle />}
      {boxes === "x" && <Cross />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    flex: 1,
  },
});

export default Box;
