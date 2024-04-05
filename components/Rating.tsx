import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";

export default function Rating({ rating, stylesProp }) {
  return (
    <View
      style={stylesProp ? [styles.userRating, stylesProp] : styles.userRating}
    >
      {Array.from({ length: 5 }, (_, i) =>
        i < Math.floor(rating) ? (
          <FontAwesome key={i} name="star" size={15} color="#FED666" />
        ) : (
          <FontAwesome key={i} name="star" size={15} color="#9DA499" />
        )
      )}
    </View>
  );
}

const styles = {
  userRating: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  
};
