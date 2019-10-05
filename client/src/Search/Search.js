import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { filterProductsAPI, fetchProductsAPI } from "../common/apis/productApi";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changed: false
    };
  }
  handleSearch = e => {
    const searchTxt = e.target.value;
    if (searchTxt === "" && this.state.changed) {
      this.setState({ changed: false });
      fetchProductsAPI(this.props.updateProducts, this.props.errorCallback);
    } else if (searchTxt.length > 3) {
      this.setState({ changed: true });
      filterProductsAPI(
        searchTxt,
        this.props.updateProducts,
        this.props.errorCallback
      );
    }
  };
  render() {
    return (
      <Form>
        <Form.Group>
          <InputGroup>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Search Our Catalogue"
              className="border-dark"
              onChange={this.handleSearch}
              aria-describedby="btnGroupAddon"
            ></Form.Control>
            <InputGroup.Append>
              <InputGroup.Text id="btnGroupAddon">
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    );
  }
}

export default Search;
