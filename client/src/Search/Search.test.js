import React from "react";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import Search from "./Search";
import expect from "expect";
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
    })
    done();
  });
  it("render search with text length les than 3", done => {
    const onSearchMock = jest.fn();
    const event = {
    preventDefault() {},
    target: { value: 'the-value' }
    };
    const wrapper = shallow(<Search />);
    wrapper.find('Form.Control').setProps(onChange={this.handleSearch}) 
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(PRODUCTS);
    process.nextTick(() => {
      expect(wrapper.state().products).toEqual(mockSuccessResponse);
      // expect(wrapper.find('Products').props().products).toEqual(mockSuccessResponse);
    })
    
    expect(wrapper).toMatchSnapshot();
    // wrapper.unmount();
    // console.log(wrapper.debug())
    global.fetch.mockClear();
    delete global.fetch;
    
    done();
  });
  it("render app with backend error", done => {
    global.fetch = jest.fn().mockRejectedValue('');
    const wrapper = shallow(<App />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(PRODUCTS);
    process.nextTick(() => {
      expect(wrapper.state().products).toEqual([]);
      expect(wrapper.state().error.state).toEqual(true);
    })
    expect(wrapper).toMatchSnapshot();
    global.fetch.mockClear();
    delete global.fetch;
    done();
  });
});
