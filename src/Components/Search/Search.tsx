import React from "react";

import Input from "@components/Input";
import { searchStore } from "@store/SearchStore/SearchStore";
import { observer } from "mobx-react-lite";

export type SearchProps = React.FormHTMLAttributes<HTMLFormElement>;

const Search: React.FC<SearchProps> = ({
  onSubmit,
  className,
  ...props
}: SearchProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    searchStore.setSearch(e.target.value);
  };

  return (
    <form onSubmit={onSubmit} className={className} {...props}>
      <Input
        value={searchStore.search}
        onChange={handleInputChange}
        placeholder={"Search"}
      />
      <input type="submit" value="search" />
    </form>
  );
};

export default observer(Search);
