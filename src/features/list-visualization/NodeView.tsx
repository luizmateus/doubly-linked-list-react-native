import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../theme";

type Props = {
  value: number;
  isHead?: boolean;
  isTail?: boolean;
  isHighlighted?: boolean;
};

export const NodeView: React.FC<Props> = ({
  value,
  isHead,
  isTail,
  isHighlighted,
}) => (
  <View style={styles.wrapper}>
    {isHead && (
      <View style={[styles.badge, styles.headBadge]}>
        <Text style={styles.badgeText}>HEAD</Text>
      </View>
    )}
    <View
      style={[
        styles.node,
        isHead && styles.nodeHead,
        isTail && styles.nodeTail,
        isHighlighted && styles.highlighted,
      ]}
    >
      <Text
        style={[styles.value, isHighlighted && styles.valueHighlighted]}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {value}
      </Text>
    </View>
    {isTail && (
      <View style={[styles.badge, styles.tailBadge]}>
        <Text style={styles.badgeText}>TAIL</Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    marginHorizontal: theme.spacing.xs,
  },
  node: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.node,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: theme.colors.nodeBorder,
    ...theme.shadow.sm,
  },
  nodeHead: {
    borderColor: theme.colors.nodeHead,
    borderWidth: 2.5,
  },
  nodeTail: {
    borderColor: theme.colors.nodeTail,
    borderWidth: 2.5,
  },
  highlighted: {
    backgroundColor: theme.colors.highlight,
    borderColor: theme.colors.highlightBorder,
  },
  value: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    maxWidth: 44,
    textAlign: "center",
  },
  valueHighlighted: {
    color: theme.colors.highlightText,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.round,
    marginVertical: 4,
  },
  headBadge: {
    backgroundColor: theme.colors.nodeHead,
    marginBottom: 4,
  },
  tailBadge: {
    backgroundColor: theme.colors.nodeTail,
    marginTop: 4,
  },
  badgeText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    letterSpacing: 0.5,
  },
});
