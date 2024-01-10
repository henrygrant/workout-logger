import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import ExerciseList from "./src/components/ExerciseList";
import React from "react";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <ExerciseList />
        <StatusBar style="auto" />
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
