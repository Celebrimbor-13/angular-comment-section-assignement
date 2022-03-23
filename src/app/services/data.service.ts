import { Injectable } from "@angular/core";
import data from "../../data.json";
import { Data, Comment, Reply } from "../interfaces/data-interface";

@Injectable({
  providedIn: "root",
})
export class DataService {
  dataFromStorage = localStorage.getItem("data");
  idFromStorage = String(localStorage.getItem("id"));
  constructor() {}

  saveToStorage(data: Data, id?: string) {
    localStorage.setItem("data", JSON.stringify(data));
    if (id) {
      localStorage.setItem("id", id);
    }
  }

  getFromStorage() {
    if (this.dataFromStorage) {
      return JSON.parse(this.dataFromStorage);
    } else {
      this.saveToStorage(data, "4");
    }
  }

  increase(score: number, comment: Comment | Reply, data: Data) {
    score = score + 1;
    comment.score = score;
    localStorage.setItem("data", JSON.stringify(data));
  }

  decrease(score: number, comment: Comment | Reply, data: Data) {
    if (score > 0) {
      score = score - 1;
    }
    comment.score = score;
    localStorage.setItem("data", JSON.stringify(data));
  }
}
