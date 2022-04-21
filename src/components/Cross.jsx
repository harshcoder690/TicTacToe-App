import { StyleSheet, View } from "react-native";

const Cross = () => {
  return (
    <View style={styles.cross}>
      <View style={styles.crossLine} />
      <View style={[styles.crossLine, styles.reverseLine]} />
    </View>
  );
};

const styles = StyleSheet.create({
  cross: {
    flex: 1,
    marginTop: 10,
  },
  crossLine: {
    position: "absolute",
    left: "48%",
    width: 10,
    height: "100%",
    backgroundColor: "#00d09c",
    borderRadius: 5,
    transform: [
      {
        rotate: "45deg",
      },
    ],
  },
  reverseLine: {
    transform: [
      {
        rotate: "-45deg",
      },
    ],
  },
});

export default Cross;
