import { useState } from "react";
import { StyleSheet, Pressable, SafeAreaView } from "react-native";
import { ManropeText } from "./StyledText";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Controller } from "react-hook-form";

export default function DateInput({
  control,
  name,
  rules,
  defaultValue,
  label,
}) {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(defaultValue);

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <>
      <SafeAreaView>
        <ManropeText style={styles.label} weight={600}>
          {label}
        </ManropeText>
        <Pressable style={styles.input} onPress={showDatepicker}>
          <ManropeText style={styles.placeholder} weight={400}>
            {selectedDate ? selectedDate : "Selectionner une date"}
          </ManropeText>
          <FontAwesome name="calendar" />
        </Pressable>
        {show && (
          <Controller
            control={control}
            render={({ field }) => (
              <DateTimePicker
                testID="dateTimePicker"
                mode="date"
                value={new Date()}
                onChange={(event, selectedDate) => {
                  const selectedDateString = selectedDate?.toLocaleDateString();
                  field.onChange(selectedDateString);
                  setSelectedDate(selectedDateString);
                  setShow(false);
                }}
              />
            )}
            name={name}
            rules={rules}
          />
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: "black",
  },
  input: {
    marginTop: 6,
    borderRadius: 12,
    marginBottom: 10,
    padding: 15,
    paddingLeft: 18,
    fontFamily: "Manrope_400Regular",
    backgroundColor: "#F5F3EF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
