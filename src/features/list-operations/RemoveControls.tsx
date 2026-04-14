import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { theme } from "../../theme";

type Props = {
  onRemoveByIndex: (index: number) => void;
  onRemoveByValue: (value: number) => void;
  onRemoveDuplicates: () => void;
};

export const RemoveControls: React.FC<Props> = ({
  onRemoveByIndex,
  onRemoveByValue,
  onRemoveDuplicates,
}) => {
  const [indexInput, setIndexInput] = useState("");
  const [valueInput, setValueInput] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Input
          value={indexInput}
          onChangeText={setIndexInput}
          placeholder="Index"
          keyboardType="numeric"
          style={styles.input}
        />
        <Button
          label="Remove by Index"
          variant="danger"
          size="sm"
          style={styles.button}
          onPress={() => {
            const idx = Number(indexInput);
            if (!isNaN(idx)) {
              onRemoveByIndex(idx);
              setIndexInput("");
            }
          }}
        />
      </View>
      <View style={styles.row}>
        <Input
          value={valueInput}
          onChangeText={setValueInput}
          placeholder="Value"
          keyboardType="numeric"
          style={styles.input}
        />
        <Button
          label="Remove by Value"
          variant="danger"
          size="sm"
          style={styles.button}
          onPress={() => {
            const val = Number(valueInput);
            if (!isNaN(val)) {
              onRemoveByValue(val);
              setValueInput("");
            }
          }}
        />
      </View>
      <View style={styles.row}>
        {/* Spacer keeps "Remove Duplicates" button aligned to the button column */}
        <View style={styles.inputSpacer} />
        <Button
          label="Remove Duplicates"
          variant="secondary"
          size="sm"
          style={styles.button}
          onPress={onRemoveDuplicates}
        />
      </View>
    </View>
  );
};

const INPUT_WIDTH = 100;

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.xs,
  },
  input: {
    width: INPUT_WIDTH,
    flexShrink: 0,
    margin: 0,
    marginRight: theme.spacing.sm,
  },
  inputSpacer: {
    width: INPUT_WIDTH + theme.spacing.sm,
  },
  button: {
    flex: 1,
    margin: 0,
  },
});
