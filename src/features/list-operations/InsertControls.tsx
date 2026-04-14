import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Input } from "../../components/Input";
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
        <TouchableOpacity
          style={[styles.button, styles.primary]}
          activeOpacity={0.75}
          onPress={() => handleInsert(onInsertHead)}
        >
          <Text style={styles.label}>Insert Head</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.primary]}
          activeOpacity={0.75}
          onPress={() => handleInsert(onInsertTail)}
        >
          <Text style={styles.label}>Insert Tail</Text>
        </TouchableOpacity>
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
    gap: theme.spacing.xs,
  },
  button: {
    flex: 1,
    paddingVertical: theme.spacing.sm + 1,
    paddingHorizontal: theme.spacing.sm + 2,
    borderRadius: theme.borderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  label: {
    color: theme.colors.text,
    fontWeight: theme.fontWeight.semibold,
    fontSize: theme.fontSize.sm,
    letterSpacing: 0.2,
  },
});
