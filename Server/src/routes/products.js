import { Router } from "express";
import util from "util";
import productService from "../services/productService";

const router = Router();

/* GET filtered products listing. */
router.get("/filter", async (req, res, next) => {
  let { q: searchTxt } = req.query;
  searchTxt = searchTxt.trim();
  try {
    let results = await productService.getFilteredByName(searchTxt);
    console.log(util.inspect(results));
    
    results =
      results.length === 0 ? await productService.getFilteredByBrand(searchTxt) : results;
    results =
      results.length === 0 ? await productService.getSortedByPrice(searchTxt) : results;
    res.data = results;
    console.log(util.inspect(results, true, 2, true));
    res.send(results);
  } catch (e) {
    console.log(util.inspect(e, true, 2, true));
    next(e);
  }
});

/* GET top products listing. */
router.get("/", async (req, res, next) => {
  try {
    const results = await productService.getTopProducts();
    res.data = results;
    console.log(util.inspect(results, true, 2, true));
    res.send(results);
  } catch (e) {
    console.log(util.inspect(e, true, 2, true));
    next(e);
  }
});

export default router;
