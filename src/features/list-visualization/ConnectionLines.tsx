import React from "react";
import { View } from "react-native";
import Svg, { Line, Polygon } from "react-native-svg";
import { theme } from "../../theme";

// Renders bidirectional arrows between nodes using SVG
export const ConnectionLines: React.FC = () => {
  const color = theme.colors.arrow;
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Svg height="36" width="44">
        {/* Forward arrow (left → right) */}
        <Line x1="4" y1="13" x2="38" y2="13" stroke={color} strokeWidth="2" />
        <Polygon points="40,13 33,9 33,17" fill={color} />
        {/* Backward arrow (right → left) */}
        <Line x1="40" y1="23" x2="6" y2="23" stroke={color} strokeWidth="2" />
        <Polygon points="4,23 11,19 11,27" fill={color} />
      </Svg>
    </View>
  );
};
