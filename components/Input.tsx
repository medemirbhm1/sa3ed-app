import { Controller, FieldErrors } from "react-hook-form";
import {
  View,
  Text,
  TextInputProps,
  TextInput,
  StyleSheet,
} from "react-native";
import { Control, InputValidationRules } from "react-hook-form";
import { ManropeText } from "./StyledText";

interface InputProps extends TextInputProps {
  label: string;
  name: string;
  control: any;
  rules: any;
  errors: any;
}

export default function Input({
  label,
  name,
  control,
  errors,
  rules,
  ...rest
}: InputProps) {
  return (
    <View>
      <ManropeText style={styles.label} weight={600}>
        {label}
      </ManropeText>
      <Controller
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            {...rest}
            onChangeText={field.onChange}
            style={styles.input}
          />
        )}
        name={name}
        rules={rules}
      />
      {errors[name] && (
        <ManropeText style={styles.errorText} weight={400}>
          {errors[name].message}
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
  input: {
    marginTop: 6,
    borderColor: "transparent",
    borderRadius: 12,
    borderWidth: 1.6,
    marginBottom: 10,
    padding: 10,
    paddingLeft: 18,
    fontFamily: "Manrope_400Regular",
    backgroundColor: "#F5F3EF",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
