import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Alert, Text } from "react-native";
import { useDoublyLinkedList } from "./src/hooks/useDoublyLinkedList";
import { ActionPanel } from "./src/features/list-operations/ActionPanel";
import { ListVisualizer } from "./src/features/list-visualization/ListVisualizer";
import { InfoPanel } from "./src/features/list-info/InfoPanel";
import { Layout } from "./src/components/Layout";
import { theme } from "./src/theme";

export default function App() {
  const ddl = useDoublyLinkedList<number>();
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

  const handleSearch = (value: number) => {
    const idx = ddl.search(value);
    setHighlightIndex(idx);
    if (idx === null) {
      Alert.alert("Not found", `Value ${value} not found in the list.`);
    }
  };

  return (
    <Layout>
      <View style={styles.header}>
        <Text style={styles.title}>Doubly Linked List</Text>
        <Text style={styles.subtitle}>Visualizer</Text>
        <View style={styles.techRow}>
          {["React Native", "Expo", "TypeScript"].map((t) => (
            <View key={t} style={styles.techBadge}>
              <Text style={styles.techText}>{t}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>VISUALIZATION</Text>
        <View style={styles.visualizer}>
          <ListVisualizer
            nodes={ddl.state.nodes.map((n, i) => ({
              value: n.value,
              isHead: i === 0,
              isTail: i === ddl.state.nodes.length - 1,
              isHighlighted: highlightIndex === i,
            }))}
            highlightIndex={highlightIndex}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>STATS</Text>
        <View style={styles.infoCard}>
          <InfoPanel
            head={ddl.state.head}
            tail={ddl.state.tail}
            size={ddl.state.size}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>OPERATIONS</Text>
        <View style={styles.panel}>
          <ActionPanel
            onInsertHead={ddl.insertHead}
            onInsertTail={ddl.insertTail}
            onRemoveByIndex={ddl.removeByIndex}
            onRemoveByValue={ddl.removeByValue}
            onRemoveDuplicates={ddl.removeDuplicates}
            onSearch={handleSearch}
          />
        </View>
      </View>

      <StatusBar style="light" />
    </Layout>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.sm,
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
    letterSpacing: -0.3,
  },
  techRow: {
    flexDirection: "row",
    gap: theme.spacing.xs,
  },
  techBadge: {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.round,
    paddingHorizontal: theme.spacing.sm + 2,
    paddingVertical: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  techText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeight.medium,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textMuted,
    letterSpacing: 1.2,
    marginBottom: theme.spacing.sm,
    marginLeft: 2,
  },
  visualizer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    minHeight: 130,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: "hidden",
    ...theme.shadow.sm,
  },
  infoCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.sm,
  },
  panel: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.sm,
  },
});
