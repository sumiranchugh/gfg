import HitElastic from "../src/utils/HitElastic";
import ProductService from "../src/services/ProductService";
jest.mock("../src/utils/HitElastic");

beforeEach(() => {
  HitElastic.mockClear();
});

it("should able to create product service", async () => {
  let productService = new ProductService();
  expect(HitElastic.mock.calls.length).toEqual(1);
  expect(productService).toBeTruthy();
});
it("should fetch empty products list", async () => {
  HitElastic.mockImplementation(() => {
    return {
      retrieve: () => {
        return Promise.resolve([]);
      }
    };
  });
  let productService = new ProductService();
  let result = await productService.getTopProducts();
  expect(HitElastic.mock.calls.length).toEqual(1);
  expect(result).toStrictEqual([]);
});
it("should fetch empty products list by name", async () => {
  HitElastic.mockImplementation(() => {
    return {
      retrieve: () => {
        return Promise.resolve([]);
      }
    };
  });
  let productService = new ProductService();
  let result = await productService.getFilteredByName();
  expect(HitElastic.mock.calls.length).toEqual(1);
  expect(result).toStrictEqual([]);
});
it("should fetch empty products list by brand", async () => {
  HitElastic.mockImplementation(() => {
    return {
      retrieve: () => {
        return Promise.resolve([]);
      }
    };
  });
  let productService = new ProductService();
  let result = await productService.getFilteredByBrand();
  expect(HitElastic.mock.calls.length).toEqual(1);
  expect(result).toStrictEqual([]);
});
it("should fetch empty products list sorted by price", async () => {
  HitElastic.mockImplementation(() => {
    return {
      retrieve: () => {
        return Promise.resolve([]);
      }
    };
  });
  let productService = new ProductService();
  let result = await productService.getSortedByPrice();
  expect(HitElastic.mock.calls.length).toEqual(1);
  expect(result).toStrictEqual([]);
});
it("should fail fetching products list", done => {
  HitElastic.mockImplementation(() => {
    return {
      retrieve: () => {
        return Promise.reject(new Error("Test"));
      }
    };
  });
  let productService = new ProductService();
  expect(HitElastic.mock.calls.length).toEqual(1);
  expect(productService.getTopProducts()).rejects.toEqual(new Error("Test"));
  done();
});
