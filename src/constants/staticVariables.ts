import { IFetchOptions } from "../utils/types";

export enum HTTP_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export const ALLOWED_TAGS_DYNAMIC_TABLE = [
  "TABLE",
  "TR",
  "TD",
  "THEAD",
  "TFOOT",
  "TBODY",
  "INPUT",
];

export const defaultFetchOption: IFetchOptions = {
  headers: {
    "Content-Type": "application/json",
  },
};
