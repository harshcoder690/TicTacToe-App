import { StyleSheet, Text, View } from "react-native";

const Circle = () => {
  return <View style={styles.circle}></View>;
};

const styles = StyleSheet.create({
  circle: {
    flex: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    marginBottom : 2,
    borderWidth: 10,
    borderColor: "#00d09c",
  },
});

export default Circle;
