import React from "react";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";
import expect from "expect";
import { shallow, mount, render, configure } from "enzyme";
import { PRODUCTS_FILTER, PRODUCTS } from "../common/URLS";
configure({ adapter: new Adapter() });

// it("renders without crashing", () => {
//   const tree = renderer.create(<App/>).toJSON();
//   expect(tree).toMatchSnapshot();
// });

describe("App", () => {
  it("render shallow app with no products", done => {
    const mockSuccessResponse = [];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    const wrapper = shallow(<App />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(PRODUCTS);

    expect(wrapper).toMatchSnapshot();
    process.nextTick(() => {
      expect(wrapper.state().products).toEqual(mockSuccessResponse);
      expect(wrapper.state().error.state).toEqual(false);
    });
    global.fetch.mockClear();
    delete global.fetch;
    done();
  });
  it("render mount app with no products", done => {
    const mockSuccessResponse = [];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    const wrapper = mount(<App />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(PRODUCTS);

    expect(wrapper).toMatchSnapshot();
    process.nextTick(() => {
      expect(wrapper.state().products).toEqual(mockSuccessResponse);
      expect(wrapper.state().error.state).toEqual(false);
    });
    global.fetch.mockClear();
    delete global.fetch;
    done();
  });
  it("render app with 1 products", done => {
    const mockSuccessResponse = [
      { id: 1, name: "product1", price: 20, brand: "gucci" }
    ];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    const wrapper = mount(<App />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(PRODUCTS);
    process.nextTick(() => {
      expect(wrapper.state().products).toEqual(mockSuccessResponse);
      expect(wrapper.state().error.state).toEqual(false);
    });

    expect(wrapper).toMatchSnapshot();
    global.fetch.mockClear();
    delete global.fetch;

    done();
  });
  it("render app with backend error", done => {
    global.fetch = jest.fn().mockRejectedValue("");
    const wrapper = shallow(<App />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(PRODUCTS);
    process.nextTick(() => {
      expect(wrapper.state().products).toEqual([]);
      expect(wrapper.state().error.state).toEqual(true);
    });
    expect(wrapper).toMatchSnapshot();
    global.fetch.mockClear();
    delete global.fetch;
    done();
  });
});
