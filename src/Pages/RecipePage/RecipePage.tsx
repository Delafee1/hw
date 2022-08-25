import { useEffect, useState } from "react";

import { Loader, LoaderSize } from "@components/Loader/Loader";
import styles from "@pages/RecipePage/RecipePage.module.scss";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import { ReactComponent as Arrow } from "./Arrow.svg";
import { ReactComponent as Heart } from "./Heart.svg";
import { ReactComponent as Line } from "./Line.svg";
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
  const [data, setData] = useState<Recipe>();

  useEffect(() => {
    setIsLoading(true);

    const fetch = async () => {
      const result = await axios({
        method: "get",
        url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=2e9e4037dd0b45c29259e561907ef904`,
      });
      setData(result.data);
      setIsLoading(false);
    };
    fetch();
  }, [id]);

  return (
    <>
      <Loader
        loading={isLoading}
        size={LoaderSize.l}
        className={styles.loader}
      />
      {data && (
        <div
          style={{ backgroundImage: "url(" + data.image + ")" }}
          className={styles.container}
        >
          <Link to={"/recipes/1"}>
            <button className={styles.buttonBack}>
              <Arrow className={styles.buttonArrow} />
            </button>
          </Link>
          <div className={styles.content}>
            <Line className={styles.line} />
            <h2 className={styles.title}>{data.title}</h2>
            <div className={styles.numbers_container}>
              <div className={styles.minutes}>
                <Time className={styles.minutes_icon} />
                <p className={styles.minutes_text}>
                  {data.readyInMinutes} minutes
                </p>
              </div>
              <div className={styles.likes}>
                <Heart className={styles.likes_icon} />
                <p className={styles.likes_text}>{data.aggregateLikes} likes</p>
              </div>
            </div>
            <div
              className={styles.text}
              dangerouslySetInnerHTML={{ __html: data.summary }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default RecipePage;
