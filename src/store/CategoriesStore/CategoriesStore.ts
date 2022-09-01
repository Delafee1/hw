import { Option } from "@components/MultiDropdown";
import { queryParamsStore } from "@store/QueryParamsStore/QueryParamsStore";
import { MEAL_TYPES } from "@utils/constants/MealTypes";
import { action, computed, makeObservable, observable, toJS } from "mobx";

import { getInitCategories } from "./getInitCategories";

type PrivateFields = "_selectedCategories";

export class CategoriesStore {
  private _selectedCategories: Option[] = [];

  constructor() {
    makeObservable<CategoriesStore, PrivateFields>(this, {
      _selectedCategories: observable,
      selectedCategories: computed,
      setSelectedCategories: action,
      setSelectedCategoriesArray: action,
      getSelectedCategoriesString: action,
      getSelectedCategoriesTitle: action,
      checkOption: action,
    });
  }

  checkOption = (category: Option) => {
    return this._selectedCategories.findIndex(
      (val) => val.key === category.key
    );
  };

  get selectedCategories(): Option[] {
    return this._selectedCategories;
  }

  setSelectedCategories(categories: Option[]) {
    this._selectedCategories = categories;
  }

  setSelectedCategoriesArray(category: Option) {
    const selected = this.checkOption(category);
    if (selected === -1) {
      this._selectedCategories.push(category);
    } else {
      this._selectedCategories = this._selectedCategories.filter(
        (val, index) => index !== selected
      );
    }
  }

  getSelectedCategoriesString() {
    const categories = this._selectedCategories.reduce(
      (acc, value) => `${acc}${value.value},`,
      ""
    );
    return categories.substring(0, categories.length - 1);
  }

  getSelectedCategoriesTitle() {
    if (this._selectedCategories.length === 0) {
      return "Pick categories";
    }
    const title = this._selectedCategories.reduce(
      (acc, value) => `${acc}${value.value}, `,
      ""
    );
    return title.substring(0, title.length - 2);
  }
}

export const categoriesStore = new CategoriesStore();
