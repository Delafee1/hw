import { categoriesStore } from "@store/CategoriesStore";
import { paginationStore } from "@store/PaginationStore";
import { queryParamsStore } from "@store/QueryParamsStore/QueryParamsStore";
import { API_KEY } from "@utils/constants/ApiKey";
import { Meta } from "@utils/constants/meta";
import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
  toJS,
} from "mobx";
import QueryString, { ParsedQs } from "qs";
import { useLocation } from "react-router-dom";

type Recipes = {
  id: number;
  image: string;
  title: string;
};

type PrivateFields = "_recipes" | "_meta";

export class RecipesStore {
  private _meta: Meta = Meta.initial;
  private _recipes: Recipes[] = [];

  constructor() {
    makeObservable<RecipesStore, PrivateFields>(this, {
      _meta: observable,
      _recipes: observable,
      meta: computed,
      recipes: computed,
      getRecipesList: action,
    });
  }

  get recipes(): Recipes[] {
    return this._recipes;
  }

  get meta(): Meta {
    return this._meta;
  }

  getRecipesList = async () => {
    this._meta = Meta.loading;
    this._recipes = [];
    try {
      const result = await axios({
        method: "get",
        url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&offset=${queryParamsStore.getParam(
          "page"
        )}&type=${queryParamsStore.getParam("categories")}`,
      });
      runInAction(() => {
        this._meta = Meta.success;
        this._recipes = result.data.results;
        paginationStore.setTotalPages(result.data.totalResults);
      });
    } catch (e) {
      this._meta = Meta.error;
    }
  };
}

export const recipesStore = new RecipesStore();
