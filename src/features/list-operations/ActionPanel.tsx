import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { InsertControls } from "./InsertControls";
import { RemoveControls } from "./RemoveControls";
import { SearchBar } from "./SearchBar";
import { theme } from "../../theme";

type Props = {
  onInsertHead: (value: number) => void;
  onInsertTail: (value: number) => void;
  onRemoveByIndex: (index: number) => void;
  onRemoveByValue: (value: number) => void;
  onRemoveDuplicates: () => void;
  onSearch: (value: number) => void;
};

const SectionLabel: React.FC<{ label: string }> = ({ label }) => (
  <Text style={styles.sectionLabel}>{label}</Text>
);

export const ActionPanel: React.FC<Props> = (props) => (
  <View>
    <SectionLabel label="INSERT" />
    <InsertControls
      onInsertHead={props.onInsertHead}
      onInsertTail={props.onInsertTail}
    />
    <View style={styles.divider} />
    <SectionLabel label="REMOVE" />
    <RemoveControls
      onRemoveByIndex={props.onRemoveByIndex}
      onRemoveByValue={props.onRemoveByValue}
      onRemoveDuplicates={props.onRemoveDuplicates}
    />
    <View style={styles.divider} />
    <SectionLabel label="SEARCH" />
    <SearchBar onSearch={props.onSearch} />
  </View>
);

const styles = StyleSheet.create({
  sectionLabel: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textMuted,
    letterSpacing: 1,
    marginTop: theme.spacing.xs,
    marginLeft: theme.spacing.xs,
    marginBottom: 2,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.sm,
  },
});
