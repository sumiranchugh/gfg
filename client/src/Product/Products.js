import React from "react";
import { Card, Button } from "react-bootstrap";

class Products extends React.Component {
  render() {
    const products = this.props.products
      .map(p => p._source)
      .map(product => (
        <Card style={{ width: "14rem" }} className="m-lg-5" key={product.id}>
          {/* <Card.Img variant="top" src="logo512.png" /> */}
          <Card.Body>
            <Card.Title>{product.brand}</Card.Title>
            <Card.Text>{product.name}</Card.Text>
            <Button variant="primary">{product.price}</Button>
          </Card.Body>
        </Card>
      ));
    return products;
  }
}

export default Products;
