import { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useQuery } from "react-query";
import PocketBase from "pocketbase";
import { POCKETBASE_URL } from "../../constants";
import React from "react";
import Exercise from "./Exercise";
import { styled } from "nativewind";

const fetchExercises = (page = 0) => {
  const pb = new PocketBase(POCKETBASE_URL);
  return pb.collection("exercises").getList(page, 50);
};
const StyledScrollView = styled(ScrollView);
export default function ExerciseList() {
  const [page, setPage] = useState(0);

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery({
      queryKey: ["projects", page],
      queryFn: () => fetchExercises(page),
      keepPreviousData: true,
    });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error: {JSON.stringify(error)}</Text>;
  }

  return (
    <ScrollView>
      <View className="container justify-center items-center">
        {data?.items.map((a) => (
          <Exercise exercise={a} key={a.id} />
        ))}
      </View>
    </ScrollView>
  );
}
