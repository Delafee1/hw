import { useEffect } from "react";
import React from "react";

import Card from "@components/Card";
import Loader, { LoaderSize } from "@components/Loader";
import MultiDropdown, { Option } from "@components/MultiDropdown";
import Pagination from "@components/Pagination";
import Search from "@components/Search";
import { paginationStore } from "@store/PaginationStore";
import { recipesStore } from "@store/RecipesStore";
import { MEAL_TYPES } from "@utils/constants/MealTypes";
import { Meta } from "@utils/constants/meta";
import cn from "classnames";
import { observer } from "mobx-react-lite";
import { Link, useLocation } from "react-router-dom";

import styles from "./RecipesPage.module.scss";

const RecipesPage: React.FC = () => {
  // eslint-disable-next-line no-console
  console.log("recipes rendered");

  useEffect(() => {
    recipesStore.getRecipesList();
  }, []);

  const handleSearchSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    //  navigate(`./?search=${searchStore.search}`);
  };

  return (
    <div className={styles.recipes}>
      <div className={styles.recipes__heading}>
        <Search onSubmit={handleSearchSubmit} />
        <MultiDropdown
          options={MEAL_TYPES}
          className={styles.recipes__heading__multidropdown}
        />
      </div>
      <Pagination
        totalResults={paginationStore.totalPages}
        className={styles.recipes__pagination}
      />
      <div
        className={cn(styles.recipes__cards, {
          [styles.recipes__cards_loading]: recipesStore.meta === Meta.loading,
        })}
      >
        <Loader
          loading={recipesStore.meta === Meta.loading}
          size={LoaderSize.l}
          className={styles.loader}
        />
        {recipesStore.recipes.map((recipe) => (
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

export default observer(RecipesPage);
