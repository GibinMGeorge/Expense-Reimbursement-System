import { InputProps } from "../interfaces/InputProps";

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  type,
  placeholder,
  required = false,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="input-field"
    />
  );
};

export { Input };