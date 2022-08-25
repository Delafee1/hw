import React from "react";

import styles from "@components/Card/Card.module.scss";
import classNames from "classnames";

import { ReactComponent as Plus } from "./Plus.svg";

type CardProps = {
  image: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  content?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  className: string;
};

const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  content,
  className,
  ...props
}: CardProps) => {
  return (
    <div className={classNames(styles.card, className)} {...props}>
      <img src={image} alt={image} className={styles.image} />
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.subtitle}>{subtitle}</div>
      <div className={styles.footer}>
        <div className={styles.content}>{content}</div>
        <Plus className={styles.plus} />
      </div>
    </div>
  );
};

export default Card;
