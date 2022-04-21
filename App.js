import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, ImageBackground, Alert, Button} from "react-native";
import bg from "./assets/bg.jpeg";
import Box from "./src/components/Box";

export default function App() {
  const [matrix, setMatrix] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const [currentTurn, setCurrentTurn] = useState("x");

  //whenever matrix will be updated, we will run this function
  useEffect(() => {
    const winner = getWinner(matrix);
    if (winner) {
      gameWon(winner);
    } else {
      checkTieState();
    }
  }, [matrix]);

  //function for handling click event in the matrix
  const onPress = (rowIndex, colIndex) => {
    if (matrix[rowIndex][colIndex] !== "") {
      Alert.alert("already occupied!");
      return;
    }

    setMatrix((map) => {
      const updatedmatrix = [...map];
      updatedmatrix[rowIndex][colIndex] = currentTurn;
      return updatedmatrix;
    });

    setCurrentTurn(currentTurn === "x" ? "o" : "x");
  };

  //Logic for winner(player 1 or 2)
  const getWinner = (winnerMap) => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      const isRowXWinning = winnerMap[i].every((cell) => cell === "x");
      const isRowOWinning = winnerMap[i].every((cell) => cell === "o");

      if (isRowXWinning) {
        return "x";
      }
      if (isRowOWinning) {
        return "o";
      }
    }

    // Check columns
    for (let col = 0; col < 3; col++) {
      let isColumnXWinner = true;
      let isColumnOWinner = true;

      for (let row = 0; row < 3; row++) {
        if (winnerMap[row][col] !== "x") {
          isColumnXWinner = false;
        }
        if (winnerMap[row][col] !== "o") {
          isColumnOWinner = false;
        }
      }

      if (isColumnXWinner) {
        return "x";
      }
      if (isColumnOWinner) {
        return "o";
      }
    }

    // check diagonals
    let isDiagonal1OWinning = true;
    let isDiagonal1XWinning = true;
    let isDiagonal2OWinning = true;
    let isDiagonal2XWinning = true;
    for (let i = 0; i < 3; i++) {
      if (winnerMap[i][i] !== "o") {
        isDiagonal1OWinning = false;
      }
      if (winnerMap[i][i] !== "x") {
        isDiagonal1XWinning = false;
      }

      if (winnerMap[i][2 - i] !== "o") {
        isDiagonal2OWinning = false;
      }
      if (winnerMap[i][2 - i] !== "x") {
        isDiagonal2XWinning = false;
      }
    }

    if (isDiagonal1OWinning || isDiagonal2OWinning) {
      return "o";
    }
    if (isDiagonal1XWinning || isDiagonal2XWinning) {
      return "x";
    }
  };

  //Logic for tie
  const checkTieState = () => {
    if (!matrix.some((row) => row.some((cell) => cell === ""))) {
      Alert.alert("It's a tie");
      resetGame();
      return;
    }
    // resetGame();
  };

  //Alert
  const gameWon = (player) => {
    Alert.alert(
      player === "x" ? "Huraaay, Player 1 Won" : "Huraaay, Player 2 Won"
    );
    resetGame();
  };

  //Logic for resetting matrix
  const resetGame = () => {
    setMatrix([
      ["", "", ""], // 1st row
      ["", "", ""], // 2nd row
      ["", "", ""], // 3rd row
    ]);
    setCurrentTurn("x");
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} resizeMode="contain">
        <Text
          style={{
            fontSize: 24,
            color: "white",
            position: "absolute",
            top: 60,
          }}
        >
          TicTacToe
        </Text>
        <Text
          style={{
            fontSize: 24,
            color: "white",
            position: "absolute",
            top: 120,
          }}
        >
          Current Turn: {currentTurn === "x" ? "Player 1" : "Player 2"}
        </Text>
        <View style={styles.matrix}>
          {matrix.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.row}>
              {row.map((col, colIndex) => (
                <Box
                  key={`row-${rowIndex}-col-${colIndex}`}
                  boxes={col}
                  onPress={() => onPress(rowIndex, colIndex)}
                />
              ))}
            </View>
          ))}
        </View>
        <View style={styles.btn}>
          <Button onPress={resetGame} title="reset" color="#00d09c" />
        </View>
        <Text style={styles.groww}>@Groww Assignment</Text>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#242D34",
  },
  bg: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    paddingTop: 15,
  },
  matrix: {
    width: "80%",
    aspectRatio: 1,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  groww: {
    color: "#00d09c",
    top: 680,
    position: "absolute",
  },
  btn: {
    position: "absolute",
    top: 600,
    margin: 10,
    width: "30%",
    height: "30%",
  },
});
