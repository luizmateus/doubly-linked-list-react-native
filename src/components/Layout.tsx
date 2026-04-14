import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, ViewProps } from "react-native";
import { theme } from "../theme";

export const Layout: React.FC<ViewProps> = ({ children, ...rest }) => (
  <SafeAreaView style={styles.safe} {...rest}>
    <ScrollView
      contentContainerStyle={styles.scroll}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scroll: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
});
