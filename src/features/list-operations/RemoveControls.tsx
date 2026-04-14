import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Input } from "../../components/Input";
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
        <TouchableOpacity
          style={[styles.button, styles.danger]}
          activeOpacity={0.75}
          onPress={() => {
            const idx = Number(indexInput);
            if (!isNaN(idx)) {
              onRemoveByIndex(idx);
              setIndexInput("");
            }
          }}
        >
          <Text style={styles.label}>Remove by Index</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Input
          value={valueInput}
          onChangeText={setValueInput}
          placeholder="Value"
          keyboardType="numeric"
          style={styles.input}
        />
        <TouchableOpacity
          style={[styles.button, styles.danger]}
          activeOpacity={0.75}
          onPress={() => {
            const val = Number(valueInput);
            if (!isNaN(val)) {
              onRemoveByValue(val);
              setValueInput("");
            }
          }}
        >
          <Text style={styles.label}>Remove by Value</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.button, styles.secondary, styles.fullWidth]}
        activeOpacity={0.75}
        onPress={onRemoveDuplicates}
      >
        <Text style={styles.label}>Remove Duplicates</Text>
      </TouchableOpacity>
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
  button: {
    flex: 1,
    paddingVertical: theme.spacing.sm + 1,
    paddingHorizontal: theme.spacing.sm + 2,
    borderRadius: theme.borderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  fullWidth: {
    flex: 0,
    marginTop: theme.spacing.xs,
  },
  danger: {
    backgroundColor: theme.colors.danger,
  },
  secondary: {
    backgroundColor: theme.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  label: {
    color: theme.colors.text,
    fontWeight: theme.fontWeight.semibold,
    fontSize: theme.fontSize.sm,
    letterSpacing: 0.2,
  },
});
