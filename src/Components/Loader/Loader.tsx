import React from "react";

import cn from "classnames";

import styles from "./Loader.module.scss";
import { ReactComponent as Ring } from "./Loader.svg";

export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({
  loading = true,
  size = LoaderSize.m,
  className,
  ...props
}: LoaderProps) => {
  if (!loading) {
    return null;
  }

  return (
    <Ring
      className={cn(styles.loader, className, {
        [styles.loader_size_s]: size === LoaderSize.s,
        [styles.loader_size_m]: size === LoaderSize.m,
        [styles.loader_size_l]: size === LoaderSize.l,
      })}
      {...props}
    />
  );
};

export default Loader;
