import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import axios from "axios";

const Shop = () => {
  const [sort, setSort] = useState("");
  const [products, setProduct] = useState([]);
  const [review, setReview] = useState("");
  const [setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getAllProducts = async () => {
    const response = await axios.get(`http://localhost:3001/products`);
    setProduct(response.data);
  };
  const getAllReview = async () => {
    const response = await axios.get(`http://localhost:3001/review/allreview`);
    setReview(response.data);
  };
  const onChange = (value) => {
    setSort(value);
  };
  // useEffect(() => {

  // });
  useEffect(() => {
    getAllReview();
    if (!sort) {
      getAllProducts();
    }
    if (sort === "low") {
      const sorted = [...products].sort((a, b) => a.price - b.price);
      setProduct(sorted);
      console.log(sorted);
    }
    if (sort === "high") {
      const sorted = [...products].sort((a, b) => b.price - a.price);
      setProduct(sorted);
      console.log(sorted);
    }
    if (sort === "latest") {
      const sorted = [...products].sort((a, b) => a.createdAt - b.createdAt);
      setProduct(sorted);
      console.log(sorted);
    }
    if (sort === "rating") {
      const sorted = [...products].sort((a, b) => b.rating - a.rating);
      setProduct(sorted);
    }
    console.log(sort);
    console.log(products);
  }, [sort]);

  const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div>
        <Row>
          {pageNumbers.map((number) => (
            <div className="_paginate" key={number}>
              <Button variant="outline-dark" onClick={() => paginate(number)}>
                {number}
              </Button>
            </div>
          ))}
        </Row>
      </div>
    );
  };
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return (
    <Container className="mb-5">
      <Row className="pt-5 pb-1">
        <div>
          <Breadcrumb>
            <Breadcrumb.Item className="breadcrumb-style" href="/">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Shop</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Col className="text-start">
          <h3>New Action Figure</h3>
        </Col>
        <Col className="text-end fs-5 pt-2">
          <select
            name="cars"
            defaultValue={" "}
            id="cars"
            onChange={(e) => onChange(e.target.value)}
          >
            <option value=" " hidden>
              Select sort
            </option>
            <option value="high">sort by high to low</option>
            <option value="low">sort by low to high</option>
            <option value="latest">sort by latest</option>
            <option value="rating">sort average rating</option>
          </select>
        </Col>
        <div className="text-end my-2">
          <Button
            href="/add"
            variant="outline-warning"
            size="sm"
            value="Input"
            style={{ width: "auto" }}
          >
            Add Product
          </Button>
        </div>
      </Row>
      <Row xs={1} lg={3} md={2} sm={2} xl={5} className="g-4">
        {currentPosts.map((item, index) => {
          return (
            <Col className="my-5" key={index}>
              <Link to={{ pathname: `/detail/${item.id}`, item: item }}>
                <Card style={{ width: "100%", height: "auto" }}>
                  <Card.Img
                    className="___card"
                    variant="top"
                    src={`http://localhost:3001/image/${item.image}`}
                  />
                  <Card.Body
                    className="text-start"
                    style={{ backgroundColor: "" }}
                  >
                    <div style={{ height: "70px" }}>
                      <Card.Title style={{ fontSize: "15px" }}>
                        {item.name}
                      </Card.Title>
                    </div>
                    <Card.Text style={{ color: "red" }}>
                      Rp. {numberWithCommas(item.price)},-
                    </Card.Text>
                    {/* <div className="my-3">
                              <Button variant="success" size="sm" href=""> Add To Cart  </Button>
                            </div> */}
                    <Card.Footer>
                      <small className="text-muted">
                        {`Last update ${item.createdAt} ago`}
                      </small>
                    </Card.Footer>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={products.length}
        paginate={paginate}
      />
    </Container>
  );
};

export default Shop;
