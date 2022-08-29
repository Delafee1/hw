import React from "react";

import cn from "classnames";

import styles from "./MultiDropdown.module.scss";

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  pluralizeOptions: (value: Option[]) => string;
  className: string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled,
  pluralizeOptions,
  className,
  ...props
}: MultiDropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onClickHandler = (option: Option) => {
    let selected = checkOption(option);
    if (selected === -1) {
      onChange([...value, option]);
    } else {
      onChange(value.filter((val, index) => index !== selected));
    }
  };

  const dropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const checkOption = (option: Option) => {
    return value.findIndex((val) => val.key === option.key);
  };

  return (
    <div className={cn(styles.multidropdown, className)} {...props}>
      <div className={styles.multidropdown__title} onClick={dropdownToggle}>
        {pluralizeOptions(value)}
      </div>
      {isOpen && !disabled && (
        <div className={styles.multidropdown__categories}>
          {options.map((option) => (
            <div
              className={cn(styles.multidropdown__category, {
                [styles.multidropdown__category_checked]:
                  checkOption(option) !== -1,
              })}
              key={option.key}
              onClick={() => onClickHandler(option)}
              {...props}
            >
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
