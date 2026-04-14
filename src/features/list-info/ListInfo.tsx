import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../theme";

type Props = {
  head: number | null;
  tail: number | null;
  size: number;
};

type ChipProps = { label: string; value: string; accent?: string };

const Chip: React.FC<ChipProps> = ({ label, value, accent }) => (
  <View style={[styles.chip, accent ? { borderColor: accent } : undefined]}>
    <Text style={styles.chipLabel}>{label}</Text>
    <Text style={[styles.chipValue, accent ? { color: accent } : undefined]}>
      {value}
    </Text>
  </View>
);

export const ListInfo: React.FC<Props> = ({ head, tail, size }) => (
  <View style={styles.container}>
    <Chip
      label="HEAD"
      value={head !== null ? String(head) : "—"}
      accent={theme.colors.nodeHead}
    />
    <Chip
      label="TAIL"
      value={tail !== null ? String(tail) : "—"}
      accent={theme.colors.nodeTail}
    />
    <Chip label="SIZE" value={String(size)} accent={theme.colors.success} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: theme.spacing.sm,
  },
  chip: {
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    minWidth: 72,
  },
  chipLabel: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  chipValue: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
});
