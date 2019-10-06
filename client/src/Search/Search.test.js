import React from "react";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import Search from "./Search";
import expect from "expect";
import { Form } from "react-bootstrap";
import { shallow, mount, render, configure } from "enzyme";
import { PRODUCTS_FILTER, PRODUCTS } from "../common/URLS";
configure({ adapter: new Adapter() });

// it("renders without crashing", () => {
//   const tree = renderer.create(<App/>).toJSON();
//   expect(tree).toMatchSnapshot();
// });

describe("Search", () => {
  it("render search with no text", done => {
    const wrapper = shallow(<Search />);
    expect(wrapper).toMatchSnapshot();
    process.nextTick(() => {
      expect(wrapper.state().changed).toEqual(false);
    });
    done();
  });
  it("render search with text length greater than 3", done => {
    const mockSuccessResponse = [];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const event = {
      preventDefault() {},
      target: { value: "the-value" }
    };
    const wrapper = mount(<Search />);
    wrapper.find(Form.Control).simulate("change", event);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "api/products/filter?q=the-value"
    );
    process.nextTick(() => {
      expect(wrapper.state().changed).toEqual(true);
      // expect(wrapper.find('Products').props().products).toEqual(mockSuccessResponse);
    });

    expect(wrapper).toMatchSnapshot();
    global.fetch.mockClear();
    delete global.fetch;

    done();
  });
  it("render app with backend error", done => {
    global.fetch = jest.fn().mockRejectedValue("");
    const mock = jest.fn();
    const event = {
      preventDefault() {},
      target: { value: "the-value" }
    };
    const wrapper = shallow(<Search />);
    wrapper.setProps({ errorCallback: mock });
    wrapper.find(Form.Control).simulate("change", event);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "api/products/filter?q=the-value"
    );
    process.nextTick(() => {
      expect(wrapper.state().changed).toEqual(true);
      expect(mock).toHaveBeenCalledTimes(1);
    });
    expect(wrapper).toMatchSnapshot();
    global.fetch.mockClear();
    delete global.fetch;
    done();
  });
});

it("render search with text length less than equal 3", done => {
  global.fetch = jest.fn();

  const wrapper = mount(<Search />);
  wrapper.find(Form.Control).simulate("change", {});
  expect(global.fetch).toHaveBeenCalledTimes(0);
  process.nextTick(() => {
    expect(wrapper.state().changed).toEqual(false);
  });

  expect(wrapper).toMatchSnapshot();
  global.fetch.mockClear();
  delete global.fetch;

  done();
});

it("render search with text length from more than  3 to 0", done => {
  const mockSuccessResponse = [];
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise
  });
  global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

  const event = {
    preventDefault() {},
    target: { value: "" }
  };
  const wrapper = mount(<Search />);
  wrapper.setState({ changed: true });
  wrapper.find(Form.Control).simulate("change", event);
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(PRODUCTS);
  process.nextTick(() => {
    expect(wrapper.state().changed).toEqual(false);
  });

  expect(wrapper).toMatchSnapshot();
  global.fetch.mockClear();
  delete global.fetch;

  done();
});
