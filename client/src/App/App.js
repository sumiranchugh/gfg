import React, { Component } from "react";
import Header from "../Header/Header";
import Search from "../Search/Search";
import Products from "../Product/Products";
import { Container, Col, Row, Alert } from "react-bootstrap";
import { fetchProductsAPI } from "../common/apis/productApi";

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      error: { state: false, message: "" }
    };
  }

  searchCallback = newProducts => this.setState({ products: newProducts });
  errorCallback = err => this.setState({ error: err });
  render() {
    return (
      <div className="App">
        <Header />
        <Container fluid>
          <Row className="justify-content-center mt-3">
            <Col lg="6">
              <Search
                updateProducts={this.searchCallback}
                errorCallback={this.errorCallback}
              />
            </Col>
          </Row>
          <Row className="justify-content-center">
            {this.state.error.status ? (
              <Alert className="mt-5" variant="danger">
                <Alert.Heading>{this.state.error.message}</Alert.Heading>
                Looks like we've got some trouble!. Please try again later.
              </Alert>
            ) : (
              <Products products={this.state.products} />
            )}
          </Row>
        </Container>
      </div>
    );
  }
  componentDidMount() {
    fetchProductsAPI(
      data => this.setState({ products: data }),
      err => this.setState({ error: err })
    );
  }
}

export default App;
