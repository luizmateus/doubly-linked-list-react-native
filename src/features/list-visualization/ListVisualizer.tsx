import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { NodeView } from "./NodeView";
import { ConnectionLines } from "./ConnectionLines";
import { theme } from "../../theme";

export type NodeData = {
  value: number;
  isHead?: boolean;
  isTail?: boolean;
  isHighlighted?: boolean;
};

type Props = {
  nodes: NodeData[];
  highlightIndex?: number | null;
};

export const ListVisualizer: React.FC<Props> = ({ nodes, highlightIndex }) => {
  if (nodes.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>List is empty</Text>
        <Text style={styles.emptyHint}>Insert a value to get started</Text>
      </View>
    );
  }

  return (
    <FlatList
      horizontal
      data={nodes}
      keyExtractor={(_, i) => i.toString()}
      contentContainerStyle={styles.scroll}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <View style={styles.row}>
          <NodeView
            value={item.value}
            isHead={index === 0}
            isTail={index === nodes.length - 1}
            isHighlighted={highlightIndex === index}
          />
          {index < nodes.length - 1 && <ConnectionLines />}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  scroll: {
    paddingVertical: 20,
    paddingHorizontal: theme.spacing.md,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.xl,
  },
  emptyText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
  },
  emptyHint: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.sm,
    marginTop: theme.spacing.xs,
  },
});
