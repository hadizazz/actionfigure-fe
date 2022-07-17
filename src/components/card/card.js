import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import axios from "axios";

const Cardhome = () => {
  const [products, setProduct] = useState([]);
  const [productImage, setProductImage] = useState("");
  const result = products.filter((item) => {
    return item.kategori === "anime";
  });
  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    const response = await axios.get(`http://localhost:3001/products`);
    const a = response.data;
    setProduct(response.data.slice(a.length - 10, a.length));
    setProductImage(response.image);
  };
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  // console.log(products)

  return (
    <div className="container my-3">
      <Row className="py-3 border-bottom border-top border-dark">
        <Col className="text-start font-weight-bold text-uppercase">
          <h3 style={{ lineHeight: "1.4" }}>New Action Figure</h3>
        </Col>

        <Col className="text-end">
          <Button href="/shop" size="lg" variant="success">
            Load More
          </Button>
        </Col>
      </Row>
      <Row xs={1} lg={3} md={2} sm={2} xl={5} className="g-4">
        {products.map((item, index) => {
          return (
            <Col className="my-5" key={item.id}>
              <Link to={`/detail/${item.id}`}>
                <Card style={{ width: "100%", height: "auto" }}>
                  <Card.Img
                    className="__card"
                    variant="top"
                    src={`http://localhost:3001/image/${item.image}`}
                  />
                  <Card.Body className="text-start">
                    <div style={{ height: "70px" }}>
                      <Card.Title style={{ fontSize: "15px" }}>
                        {item.name}
                      </Card.Title>
                    </div>
                    <Card.Text style={{ color: "red" }}>
                      Rp.{numberWithCommas(item.price)}
                    </Card.Text>

                    <Card.Footer>
                      <small className="text-muted">
                        {`Last update ${item.last_update} ago`}
                      </small>
                    </Card.Footer>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Cardhome;
