import styles from "@components/Loader/Loader.module.scss";
import cn from "classnames";

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

export const Loader: React.FC<LoaderProps> = ({
  loading = true,
  size = LoaderSize.m,
  className,
  ...props
}: LoaderProps) => {
  if (!loading) {
    return null;
  }

  return (
    <span
      className={cn(styles.loader, className, {
        [styles.loader_size_s]: size === LoaderSize.s,
        [styles.loader_size_m]: size === LoaderSize.m,
        [styles.loader_size_l]: size === LoaderSize.l,
      })}
      {...props}
    />
  );
};
