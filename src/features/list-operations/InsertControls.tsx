import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { theme } from "../../theme";

type Props = {
  onInsertHead: (value: number) => void;
  onInsertTail: (value: number) => void;
};

export const InsertControls: React.FC<Props> = ({
  onInsertHead,
  onInsertTail,
}) => {
  const [input, setInput] = useState("");

  const handleInsert = (fn: (v: number) => void) => {
    const num = Number(input);
    if (!isNaN(num)) {
      fn(num);
      setInput("");
    }
  };

  return (
    <View style={styles.row}>
      <Input
        value={input}
        onChangeText={setInput}
        placeholder="Value"
        keyboardType="numeric"
        style={styles.input}
      />
      <View style={styles.buttons}>
        <Button
          label="Insert Head"
          onPress={() => handleInsert(onInsertHead)}
          style={styles.button}
        />
        <Button
          label="Insert Tail"
          onPress={() => handleInsert(onInsertTail)}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.xs,
  },
  input: {
    width: 100,
    flexShrink: 0,
    margin: 0,
    marginRight: theme.spacing.sm,
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
  },
  button: {
    flex: 1,
    margin: 0,
    marginHorizontal: theme.spacing.xs,
  },
});
