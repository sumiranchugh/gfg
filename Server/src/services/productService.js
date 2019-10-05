import util from "util";
import { hitElastic } from "../utils/elasticUtil";

let ProductService =  {

getSortedByPrice : async () => {
  const queryClause = {
    from: 0,
    size: 1000,
    sort: [{ price: { order: "asc" } }],
    query: {
      match_all: {}
    }
  };
  let results = {};
  const productMap = new Map();
  try {
    results = await hitElastic(queryClause);
    console.log("results:", results);

    if (results.hits && results.hits.length > 0) {
      results.hits.map(p => productMap.set(p._source.id, p._source));
      return [...productMap.values()];
    }
  } catch (e) {
    console.log(util.inspect(e));
  }
  return [...productMap.values()];
},

getFilteredByName : async searchTxt => {
  const queryClause = {
    query: {
      match: {
        name: { query: searchTxt }
      }
    }
  };
  let results = {};
  const productMap = new Map();
  try {
    results = await hitElastic(queryClause);
    console.log("results:", results);

    if (results.hits && results.hits.length > 0) {
      results.hits.map(p => productMap.set(p._source.id, p._source));
      return [...productMap.values()];
    }
  } catch (e) {
    console.log(util.inspect(e));
  }
  return [...productMap.values()];
},

 getFilteredByBrand : async searchTxt => {
  const queryClause = {
    query: {
      match: {
        brand: { query: searchTxt }
      }
    }
  };

  let results = {};
  const productMap = new Map();
  try {
    results = await hitElastic(queryClause);
    console.log("results:", results);

    if (results.hits && results.hits.length > 0) {
      results.hits.map(p => productMap.set(p._source.id, p._source));
      return [...productMap.values()];
    }
  } catch (e) {
    console.log(util.inspect(e));
  }
  return [...productMap.values()];
},

 getTopProducts : async () => {
  const queryClause = {
    from: 0,
    size: 1000,
    query: {
      match_all: {}
    }
  };
  let results = {};

  try {
    results = await hitElastic(queryClause);
    console.log("results:", results);
    if (results.hits) {
      return results.hits.map(r => r._source);
    }
  } catch (e) {
    results = {
      error: 'error connecting to DB'
    };
    return Promise.reject(results);
  }
  return [];
}
}

export default ProductService;
