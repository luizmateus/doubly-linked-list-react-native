import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { theme } from "../../theme";

type Props = {
  onSearch: (value: number) => void;
};

export const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [input, setInput] = useState("");

  return (
    <View style={styles.row}>
      <Input
        value={input}
        onChangeText={setInput}
        placeholder="Value"
        keyboardType="numeric"
        style={styles.input}
      />
      <Button
        label="Search"
        variant="secondary"
        size="sm"
        style={styles.button}
        onPress={() => {
          const val = Number(input);
          if (!isNaN(val)) {
            onSearch(val);
            setInput("");
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: 100,
    flexShrink: 0,
    margin: 0,
    marginRight: theme.spacing.sm,
  },
  button: {
    flex: 1,
    margin: 0,
  },
});
