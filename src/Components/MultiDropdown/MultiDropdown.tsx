import React from "react";

import styles from "@components/MultiDropdown/MultiDropdown.module.scss";
import classnames from "classnames";

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
    let newValue = value.slice(0);
    let selected = newValue.find((val) => val["key"] === option["key"]);
    if (selected) {
      newValue.splice(newValue.indexOf(selected), 1);
    } else {
      newValue.push(option);
    }
    onChange(newValue);
  };

  const dropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const checkOption = (option: Option) => {
    let selected = value.find((val) => val["key"] === option["key"]);
    if (selected) return true;
    return false;
  };

  return (
    <div className={classnames(styles.multidropdown, className)} {...props}>
      <div className={styles.multidropdown_title} onClick={dropdownToggle}>
        {pluralizeOptions(value)}
      </div>
      {isOpen && !disabled && (
        <div className={styles.categories_container}>
          {options.map((option) => (
            <div
              className={classnames(styles.multidropdown_category, {
                [styles.multidropdown_category_checked]:
                  checkOption(option) === true,
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
