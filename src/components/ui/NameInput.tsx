import Input, { type InputProps } from "./Input";
import { capitalizeWords } from "@/utils/CapitalizeWords";

interface NameInputProps extends Omit<InputProps, "onChange" | "value" | "type"> {
  value: string;
  onChange: (value: string) => void;
}

const NameInput = ({ value, onChange, label = "Nombre completo", ...props }: NameInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(capitalizeWords(e.target.value.trimStart())); // trimStart para evitar espacios iniciales
  };

  return <Input label={label} type="text" value={value} onChange={handleChange} {...props} />;
};

export default NameInput;