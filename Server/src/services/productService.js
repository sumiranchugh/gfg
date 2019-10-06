import util from "util";
import HitElastic from "../utils/HitElastic";
import {
  sortedByPrice,
  filterByName,
  filterByBrand,
  topProducts
} from "./queries";

export default class ProductService {
  constructor() {
    this.retrieve = new HitElastic().retrieve;
  }

  async getSortedByPrice() {
    return await this.retrieve(sortedByPrice);
  }

  async getFilteredByName(searchTxt) {
    return await this.retrieve(filterByName(searchTxt));
  }

  async getFilteredByBrand(searchTxt) {
    return await this.retrieve(filterByBrand(searchTxt));
  }

  async getTopProducts() {
      return await this.retrieve(topProducts);
  }
}
