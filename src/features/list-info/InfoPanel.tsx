import React from "react";
import { View } from "react-native";
import { ListInfo } from "./ListInfo";

type Props = {
  head: number | null;
  tail: number | null;
  size: number;
};

export const InfoPanel: React.FC<Props> = ({ head, tail, size }) => (
  <View>
    <ListInfo head={head} tail={tail} size={size} />
  </View>
);
