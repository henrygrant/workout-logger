import { View, Text } from "react-native";
import React from "react";

interface ExerciseProps {
  exercise: any;
}

const Exercise: React.FC<ExerciseProps> = ({ exercise }) => {
  return (
    <View className="p-5 m-3 w-full bg-purple-200 items-center">
      <Text>{exercise.type}</Text>
      {/* {exercise.reps && <Text>{exercise.reps}</Text>} */}
      {/* {exercise.weight && <Text>{exercise.weight}</Text>} */}
      {/* {exercise.distance && <Text>{exercise.distance}</Text>} */}
      {/* {exercise.duration && <Text>{exercise.duration}</Text>} */}
    </View>
  );
};

export default Exercise;
