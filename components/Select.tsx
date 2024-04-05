import { View, Text, StyleSheet } from "react-native";
import { ManropeText } from "./StyledText";
import { Controller } from "react-hook-form";
import { SelectList } from "react-native-dropdown-select-list";

export default function Select({
  control,
  errors,
  data,
  placeholder,
  label,
  name,
  rules,
  defaultValue,
}) {
  return (
    <View>
      <ManropeText style={styles.label} weight={600}>
        {label}
      </ManropeText>
      <Controller
        control={control}
        render={({ field }) => (
          <View style={styles.dropdownButton}>
            <SelectList
              setSelected={field.onChange}
              data={data}
              defaultOption={data.find((item) => item.value === defaultValue)}
              placeholder={placeholder}
              boxStyles={styles.selectInput}
              inputStyles={{
                fontFamily: "Manrope_400Regular",
              }}
              dropdownTextStyles={{
                fontFamily: "Manrope_400Regular",
              }}
            />
          </View>
        )}
        name={name}
        rules={rules}
      />
      {errors.city && (
        <ManropeText style={styles.errorText} weight="400">
          {errors.city.message}
        </ManropeText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: "black",
  },
  dropdownButton: {
    marginTop: 8,
    marginBottom: 10,
  },
  selectInput: {
    borderWidth: 0,
    backgroundColor: "#F5F3EF",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
