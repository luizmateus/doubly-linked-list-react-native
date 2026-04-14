import React, { useState } from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { theme } from "../theme";

export const Input: React.FC<TextInputProps> = ({ style, ...props }) => {
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      style={[styles.input, focused && styles.focused, style]}
      placeholderTextColor={theme.colors.textMuted}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: theme.spacing.sm + 1,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.fontSize.md,
    minWidth: 80,
    backgroundColor: theme.colors.surfaceElevated,
    color: theme.colors.text,
  },
  focused: {
    borderColor: theme.colors.borderFocus,
  },
});
