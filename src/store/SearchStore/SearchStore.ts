import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

type PrivateFields = "_search";

export class SearchStore {
  private _search: string = "";

  constructor() {
    makeObservable<SearchStore, PrivateFields>(this, {
      _search: observable,
      search: computed,
      setSearch: action,
    });
  }

  get search(): string {
    return this._search;
  }

  setSearch(search: string) {
    this._search = search;
  }
}

export const searchStore = new SearchStore();
