import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { theme } from "../theme";

type Variant = "primary" | "secondary" | "danger";

type Props = TouchableOpacityProps & {
  label: string;
  variant?: Variant;
  size?: "sm" | "md";
};

export const Button: React.FC<Props> = ({
  label,
  variant = "primary",
  size = "md",
  style,
  disabled,
  ...rest
}) => (
  <TouchableOpacity
    style={[
      styles.button,
      styles[variant],
      size === "sm" && styles.sm,
      disabled && styles.disabled,
      style as ViewStyle,
    ]}
    disabled={disabled}
    activeOpacity={0.75}
    {...rest}
  >
    <Text style={[styles.label, size === "sm" && styles.labelSm]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    paddingVertical: theme.spacing.sm + 2,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  sm: {
    paddingVertical: theme.spacing.xs + 2,
    paddingHorizontal: theme.spacing.sm + 2,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  danger: {
    backgroundColor: theme.colors.danger,
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    color: theme.colors.text,
    fontWeight: theme.fontWeight.semibold,
    fontSize: theme.fontSize.md,
    letterSpacing: 0.2,
  },
  labelSm: {
    fontSize: theme.fontSize.sm,
  },
});
