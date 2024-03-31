import { Text, TextProps } from "./Themed";

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: "SpaceMono" }]} />;
}

export function ManropeText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: manrope(props.weight) }]}
    />
  );
}

const manrope = (weight: number) => {
  switch (weight) {
    case 400:
      return "Manrope_400Regular";
    case 500:
      return "Manrope_500Medium";
    case 600:
      return "Manrope_600SemiBold";
    case 700:
      return "Manrope_700Bold";
    default:
      return "Manrope_400Regular";
  }
};
