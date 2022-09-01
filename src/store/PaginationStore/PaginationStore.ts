import { API_KEY } from "@utils/constants/ApiKey";
import { Meta } from "@utils/constants/meta";
import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { ParsedQs } from "qs";

type PrivateFields = "_currentPage" | "_totalPages";

export class PaginationStore {
  private _currentPage: number = 1;
  private _totalPages: number = 1;

  constructor() {
    makeObservable<PaginationStore, PrivateFields>(this, {
      _currentPage: observable,
      _totalPages: observable,
      currentPage: computed,
      totalPages: computed,
      setCurrentPage: action,
    });
  }

  get currentPage(): number {
    return this._currentPage;
  }

  get totalPages(): number {
    return this._totalPages;
  }

  setCurrentPage(
    page: number | string | string[] | ParsedQs | ParsedQs[] | undefined
  ) {
    if (typeof page === "undefined") {
      this._currentPage = 1;
    } else {
      this._currentPage = Number(page);
    }
  }

  setTotalPages(page: number) {
    this._totalPages = page;
  }
}

export const paginationStore = new PaginationStore();
