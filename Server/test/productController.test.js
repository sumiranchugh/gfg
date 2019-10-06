"use strict";

import ProductService from "../src/services/ProductService";
import ProductController from "../src/routes/ProductController";
jest.mock("../src/services/ProductService");

beforeEach(() => {
  ProductService.mockClear();
});
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

test("creation of controller object",  () => {
  const controller = new ProductController();
  return expect(controller).toBeTruthy();
});

test("get all products",  async () => {
  ProductService.mockImplementation(() => {
    return {
      getTopProducts: () => {
        return Promise.resolve([]);
      }
    };
  });
  const controller = new ProductController();
  const res = mockResponse();
  await controller.getProducts(null,res,jest.fn())
  expect(res.send).toHaveBeenCalledWith([])
  
});

test("fail get all products",  async () => {
  ProductService.mockImplementation(() => {
    return {
      getTopProducts: () => {
        return Promise.reject(new Error('Test'));
      }
    };
  });
  const controller = new ProductController();
  const res = mockResponse();
  await controller.getProducts(null,res,jest.fn())
  expect(res.status).toHaveBeenCalledWith(500)
  
});
test("get all filter products",  async () => {
  ProductService.mockImplementation(() => {
    return {
      getFilteredByName: () => {
        return Promise.resolve([]);
      },
      getFilteredByBrand: () => {
        return Promise.resolve([]);
      },
      getSortedByPrice: () => {
        return Promise.resolve([]);
      },
    };

  });
  const controller = new ProductController();
  const res = mockResponse();
  await controller.filterProducts({query: {q: 'test'}},res,jest.fn())
  expect(res.send).toHaveBeenCalledWith([])
  
});

test("get filter By name products",  async () => {
  const sample = [{'name': 'hello'}]
  ProductService.mockImplementation(() => {
    return {
      getFilteredByName: () => {
        return Promise.resolve(sample);
      },
      getFilteredByBrand: () => {
        return Promise.resolve([]);
      },
      getSortedByPrice: () => {
        return Promise.resolve([]);
      },
    };

  });
  const controller = new ProductController();
  const res = mockResponse();
  await controller.filterProducts({query: {q: 'test'}},res,jest.fn())
  expect(res.send).toHaveBeenCalledWith(sample)
  
});
test("get filter By brand products",  async () => {
  const sample = [{'name': 'hello'}]
  ProductService.mockImplementation(() => {
    return {
      getFilteredByName: () => {
        return Promise.resolve([]);
      },
      getFilteredByBrand: () => {
        return Promise.resolve(sample);
      },
      getSortedByPrice: () => {
        return Promise.resolve([]);
      },
    };

  });
  const controller = new ProductController();
  const res = mockResponse();
  await controller.filterProducts({query: {q: 'test'}},res,jest.fn())
  expect(res.send).toHaveBeenCalledWith(sample)
  
});
test("get filter By price products",  async () => {
  const sample = [{'name': 'hello'}]
  ProductService.mockImplementation(() => {
    return {
      getFilteredByName: () => {
        return Promise.resolve([]);
      },
      getFilteredByBrand: () => {
        return Promise.resolve([]);
      },
      getSortedByPrice: () => {
        return Promise.resolve(sample);
      },
    };

  });
  const controller = new ProductController();
  const res = mockResponse();
  await controller.filterProducts({query: {q: 'test'}},res,jest.fn())
  expect(res.send).toHaveBeenCalledWith(sample)
  
});
test("get filter By brand fails",  async () => {
  const sample = [{'name': 'hello'}]
  ProductService.mockImplementation(() => {
    return {
      getFilteredByName: () => {
        return Promise.resolve([]);
      },
      getFilteredByBrand: () => {
        return Promise.reject(new Error('test'));
      },
      getSortedByPrice: () => {
        return Promise.resolve(sample);
      },
    };

  });
  const controller = new ProductController();
  const res = mockResponse();
  await controller.filterProducts({query: {q: 'test'}},res,jest.fn())
  expect(res.status).toHaveBeenCalledWith(500)
  expect(res.send).toHaveBeenCalledWith({'error': 'error fetching result'})
  
});

test("fail get all filter products",  async () => {
  ProductService.mockImplementation(() => {
    return {
      getFilteredByName: () => {
        return Promise.reject(new Error('Test'));
      }
    };
  });
  const controller = new ProductController();
  const res = mockResponse();
  await controller.getProducts({query: {q: 'test'}},res,jest.fn())
  expect(res.status).toHaveBeenCalledWith(500)
  
});
