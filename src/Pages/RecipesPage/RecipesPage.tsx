import { useEffect, useState } from "react";
import React from "react";

import Card from "@components/Card";
import Input from "@components/Input";
import Loader, { LoaderSize } from "@components/Loader";
import MultiDropdown, { Option } from "@components/MultiDropdown";
import Pagination from "@components/Pagination";
import { API_KEY } from "@utils/constants/ApiKey";
import { MEAL_TYPES } from "@utils/constants/MealTypes";
import axios from "axios";
import cn from "classnames";
import { Link, useParams } from "react-router-dom";

import styles from "./RecipesPage.module.scss";

type Recipes = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
};

const RecipesPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Option[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  const { page } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const pickedCategories = categories.reduce(
      (acc, value) => `${acc}${value.value},`,
      ""
    );

    const fetch = async () => {
      const result = await axios({
        method: "get",
        url:
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&offset=${page}&type=` +
          pickedCategories.split(" ").join("%20"),
      });
      setRecipes(result.data.results);
      setTotalPages(result.data.totalResults);
      setIsLoading(false);
    };
    fetch();
  }, [categories, page]);

  const handleChange = (selectedCategories: Option[]) => {
    setCategories(selectedCategories);
  };

  const multidropdownTitleChange = (values: Option[]) => {
    if (values.length === 0) {
      return "Pick categories";
    }
    const title = values.reduce((acc, value) => acc + value.value + ", ", "");
    return title.substring(0, title.length - 2);
  };

  return (
    <div className={styles.recipes}>
      <div className={styles.recipes__heading}>
        <Input
          value={""}
          onChange={() => {}}
          placeholder={"Search"}
          className={styles.recipes__heading__input}
        />
        <MultiDropdown
          options={MEAL_TYPES}
          value={categories}
          onChange={handleChange}
          pluralizeOptions={multidropdownTitleChange}
          className={styles.recipes__heading__multidropdown}
        />
      </div>
      <Pagination
        totalResults={totalPages}
        currentPage={Number(page)}
        className={styles.recipes__pagination}
      />
      <div
        className={cn(styles.recipes__cards, {
          [styles.recipes__cards_loading]: isLoading === true,
        })}
      >
        <Loader
          loading={isLoading}
          size={LoaderSize.l}
          className={styles.loader}
        />
        {recipes.map((recipe) => (
          <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
            <Card
              image={recipe.image}
              title={recipe.title}
              subtitle={""}
              className={styles.recipes__card}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecipesPage;
