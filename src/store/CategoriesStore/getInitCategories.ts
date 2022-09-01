import { queryParamsStore } from "@store/QueryParamsStore";
import { MEAL_TYPES } from "@utils/constants/MealTypes";

import { categoriesStore } from "./CategoriesStore";

export const getInitCategories = () => {
  const selectedCategories = queryParamsStore.getParam("categories");
  if (typeof selectedCategories === "string") {
    if (selectedCategories.length === 0) {
      categoriesStore.setSelectedCategories([]);
    }
    const categoriesArray = selectedCategories.split(",");
    const availableCategories = MEAL_TYPES;
    const result = availableCategories.filter((val) =>
      categoriesArray.includes(val.value)
    );
    categoriesStore.setSelectedCategories(result);
  } else {
    categoriesStore.setSelectedCategories([]);
  }
};
