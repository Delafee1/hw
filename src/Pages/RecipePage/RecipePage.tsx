import { useEffect, useState } from "react";
import React from "react";

import ErrorMessage from "@components/ErrorMessage";
import Loader, { LoaderSize } from "@components/Loader";
import { API_KEY } from "@utils/constants/ApiKey";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import { ReactComponent as Arrow } from "./Arrow.svg";
import { ReactComponent as Heart } from "./Heart.svg";
import { ReactComponent as Line } from "./Line.svg";
import styles from "./RecipePage.module.scss";
import { ReactComponent as Time } from "./Time.svg";

type Recipe = {
  id: number;
  image: string;
  title: string;
  summary: string;
  readyInMinutes: number;
  aggregateLikes: number;
};

const RecipePage: React.FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Recipe | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);

    const fetch = async () => {
      try {
        const result = await axios({
          method: "get",
          url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`,
        });
        if (result) {
          setData(result.data);
          setIsLoading(false);
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
          setIsLoading(false);
        }
      }
    };
    fetch();
  }, [id]);

  if (!data && !isLoading) {
    return <ErrorMessage errorText={error} />;
  }

  return (
    <>
      <Loader
        loading={isLoading}
        size={LoaderSize.l}
        className={styles.loader}
      />
      {data && (
        <div
          style={{ backgroundImage: `url(${data.image})` }}
          className={styles.recipe}
        >
          <Link to={"/recipes/1"}>
            <button className={styles.recipe__back}>
              <Arrow className={styles.recipe__back__arrow} />
            </button>
          </Link>
          <div className={styles.recipe__content}>
            <Line className={styles.recipe__content__line} />
            <h2 className={styles.recipe__content__title}>{data.title}</h2>
            <div className={styles.recipe__content__numbers}>
              <div className={styles.recipe__content__numbers__minutes}>
                <Time
                  className={styles.recipe__content__numbers__minutes__icon}
                />
                <p className={styles.recipe__content__numbers__minutes__text}>
                  {data.readyInMinutes} minutes
                </p>
              </div>
              <div className={styles.recipe__content__numbers__likes}>
                <Heart
                  className={styles.recipe__content__numbers__likes__icon}
                />
                <p className={styles.recipe__content__numbers__likes__text}>
                  {data.aggregateLikes} likes
                </p>
              </div>
            </div>
            <div
              className={styles.recipe__content__text}
              dangerouslySetInnerHTML={{ __html: data.summary }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default RecipePage;
