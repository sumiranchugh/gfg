import util from "util";
import ProductService from "../services/ProductService";

export default class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  filterProducts = async (req, res) => {
    let { q: searchTxt } = req.query;
    searchTxt = searchTxt.trim();
    try {
      let results = await this.productService.getFilteredByName(searchTxt);
      console.log(util.inspect(results));

      results =
        results.length === 0
          ? await this.productService.getFilteredByBrand(searchTxt)
          : results;
      results =
        results.length === 0
          ? await this.productService.getSortedByPrice(searchTxt)
          : results;
      res.data = results;
      console.log(util.inspect(results, true, 2, true));
      res.send(results);
    } catch (e) {
      console.log(util.inspect(e, true, 2, true));
      res.status(500).send({'error': 'error fetching result'})
    }
  };

  getProducts = async (req, res) => {
    try {
      const results = await this.productService.getTopProducts();
      res.data = results;
      console.log(util.inspect(results, true, 2, true));
      res.send(results);
    } catch (e) {
      console.log(util.inspect(e, true, 2, true));
      res.status(500).send({'error': 'error fetching result'})
    }
  };
}
