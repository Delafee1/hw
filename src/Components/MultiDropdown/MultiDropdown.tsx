import React from "react";

import { categoriesStore } from "@store/CategoriesStore";
import { paginationStore } from "@store/PaginationStore";
import { recipesStore } from "@store/RecipesStore";
import cn from "classnames";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import styles from "./MultiDropdown.module.scss";

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  options: Option[];
  disabled?: boolean;
  className: string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  disabled,
  className,
  ...props
}: MultiDropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const onClickHandler = (option: Option) => {
    categoriesStore.setSelectedCategoriesArray(option);
    paginationStore.setCurrentPage(1);
    navigate(
      `./?categories=${categoriesStore.getSelectedCategoriesString()}&page=${
        paginationStore.currentPage
      }`
    );
  };

  const dropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={cn(styles.multidropdown, className)} {...props}>
      <div className={styles.multidropdown__title} onClick={dropdownToggle}>
        {categoriesStore.getSelectedCategoriesTitle()}
      </div>
      {isOpen && !disabled && (
        <div className={styles.multidropdown__categories}>
          {options.map((option) => (
            <div
              className={cn(styles.multidropdown__category, {
                [styles.multidropdown__category_checked]:
                  categoriesStore.checkOption(option) !== -1,
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
