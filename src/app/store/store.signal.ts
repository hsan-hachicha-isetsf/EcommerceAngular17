import { signal } from "@angular/core";
import { Article } from "../classes/article";
import { Categories } from "../classes/categories";

export const articles=signal<Article[] | []>([]);
export const categories=signal<Categories[] | []>([]);