import styles from "@components/Input/Input.module.scss";
import classNames from "classnames";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  value: string;
  onChange: (value: string) => void;
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  className,
  disabled,
  ...props
}: InputProps) => {
  return (
    <input
      className={classNames(styles.input, className, {
        [styles.input_disabled]: disabled === true,
      })}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled ? true : false}
      type="text"
      value={value}
      {...props}
    />
  );
};

export default Input;
