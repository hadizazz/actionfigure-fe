import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, Col, Container, Form, Row, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useCart } from "react-use-cart";
import ImageZoom from "react-image-zooom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import CardDetail from "../../components/card/cardDetail";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

const DetailProduct = () => {
  const [products, setProduct] = useState([]);
  const [value, setValue] = React.useState(0);
  const [navigation, setNavigation] = useState(1);
  const [source, setSource] = useState([]);
  const [productImage, setProductImage] = useState("");
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  const getProductById = async () => {
    const response = await axios.get(
      `http://localhost:3001/products/getProductReviews/${id}`
    );
    setProduct(response.data);
    console.log(response.data.success);
    ganti(response.data.image);
    setSource(products.image);
    setProductImage(response.image);

    setReviews(response.data.review);
    // setRating(response.rating)
    console.log(response.data.review);
  };
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    getProductById();
  }, []);

  const ganti = (b) => {
    document.querySelector("#imageZoom").src =
      `http://localhost:3001/image/` + b;
    document.querySelector("#featured").style.backgroundImage =
      "url(" + `http://localhost:3001/image/` + b + ")";
    setSource(b);
  };

  const changeImage = (id) => {
    document.querySelector("#imageZoom").src = id;
    document.querySelector("#featured").style.backgroundImage =
      "url(" + id + ")";
  };
  const { addItem } = useCart();

  const [val, setVal] = useState(0);
  const inputchangehandler = function (event) {
    setVal(event.target.value);
  };

  const addReviewHandler = async (e) => {
    e.preventDefault();

    const review = {
      product_id: id,
      rating: rating,
      description: description,
    };
    console.log(review);
    await axios.post(`http://localhost:3001/review/addreview/${id}`, review);
    navigate(`/detail/${id}`);
  };
  const [setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = reviews.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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

  return (
    <Container>
      <Row xs={1} lg={2} md={1} sm={1} xl={2} className="my-5">
        <Col style={{ width: "42%", height: "auto" }} className="mx-3">
          <div>
            <Breadcrumb>
              <Breadcrumb.Item className="breadcrumb-style" href="#">
                Home
              </Breadcrumb.Item>

              <Breadcrumb.Item active>Detail Product</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="coverZoom">
            <ImageZoom
              id="featured"
              src={`http://localhost:3001/${products.image}`}
              zoom="150"
            />
          </div>
          <Row className="mt-3">
            <Col className="_img">
              <div>
                <img
                  src={`http://localhost:3001/image/${products.image1}`}
                  alt="img"
                  onClick={() =>
                    changeImage(
                      `http://localhost:3001/image/${products.image1}`
                    )
                  }
                />
              </div>
            </Col>
            <Col className="_img">
              <div>
                <img
                  src={`http://localhost:3001/image/${products.image2}`}
                  alt="img"
                  onClick={() =>
                    changeImage(
                      `http://localhost:3001/image/${products.image2}`
                    )
                  }
                />
              </div>
            </Col>
            <Col className="_img">
              <div>
                <img
                  src={`http://localhost:3001/image/${products.image3}`}
                  alt="img"
                  onClick={() =>
                    changeImage(
                      `http://localhost:3001/image/${products.image3}`
                    )
                  }
                />
              </div>
            </Col>
          </Row>
        </Col>
        <Col className="my-5">
          <div className="detailproduct">
            <h3 className="titleDetail text-start pb-3">{products.name}</h3>
            <p className="text-start titlePrice">{products.price}</p>
          </div>
          <div
            className="text-start"
            dangerouslySetInnerHTML={{ __html: products.deskripsi }}
          ></div>

          <div className="qty ">
            <div className=" mx-4 ">Quantity</div>
            <div className="d-flex item-center">
              <Form.Group as={Col}>
                <Col sm={4}>
                  <Form.Control
                    type="number"
                    onChange={inputchangehandler}
                    value={val}
                    min={0}
                    step={1}
                    maks={10}
                  />
                </Col>
              </Form.Group>
            </div>
          </div>
          <div className="text-start my-4">
            <Button
              className="mx-3"
              variant="outline-secondary"
              size="md"
              onClick={() => addItem(products, parseInt(val, 10))}
            >
              {" "}
              Add To Cart{" "}
            </Button>
            <Button variant="success" size="md">
              {" "}
              Buy Now{" "}
            </Button>
            <div className="my-5 px-3">
              <Link
                to={`/edit/${id}`}
                type="button"
                className="btn btn-warning"
                style={{ width: "auto" }}
              >
                Edit Product
              </Link>
            </div>
          </div>
        </Col>

        <div className="_comment my-5">
          <ul className="nav">
            <li className="nav-item">
              <a
                onClick={() => setNavigation(1)}
                className="nav-link active"
                href="#Tab-dditional-Information"
              >
                Additional Information{" "}
              </a>
            </li>
            <li className="nav-item">
              <a
                onClick={() => setNavigation(2)}
                className="nav-link active"
                href="#Tab-Review"
              >
                Reviews (){" "}
              </a>
            </li>
          </ul>

          {navigation === 1 ? (
            <div className="addInformation" id="Tab-Additional-Information">
              <Table striped bordered hover className="my-4">
                <tbody className="_table">
                  <tr>
                    <td className="__table">Weight</td>
                    <td>{products.weight} gr</td>
                  </tr>
                  <tr>
                    <td className="__table">Dimensions</td>
                    <td>{products.size} cm</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          ) : navigation === 2 ? (
            <div className="review py-5" id="Tab-review">
              <Row>
                <div id="review">
                  <Col id="comment" className="text-start mx-2">
                    <h4> Comment Product </h4>
                    {reviews.length > 0 ? (
                      currentPosts.map((review) => {
                        return (
                          <div key={review.id} className="my-2">
                            <Card>
                              <Card.Header>username</Card.Header>
                              <Card.Body>
                                <Rating value={rating} onHover={review.rating}>
                                  {" "}
                                  {review.rating}
                                </Rating>
                                <h6>Rating: {review.rating}</h6>
                                <h5>{review.description}</h5>
                              </Card.Body>
                            </Card>
                          </div>
                        );
                      })
                    ) : (
                      <p> No reviews for this product </p>
                    )}
                    <Pagination
                      postsPerPage={postsPerPage}
                      totalPosts={reviews.length}
                      paginate={paginate}
                    />
                  </Col>

                  <Col
                    id="review_form_wrapper"
                    className="text-start formReview mx-2"
                    style={{ height: "auto" }}
                  >
                    <h4>Product Ratings </h4>
                    <Form onSubmit={addReviewHandler}>
                      <Typography className="py-2" component="legend">
                        Your rating <span style={{ color: "#585b53" }}>*</span>
                      </Typography>
                      <Rating
                        ratingValue={rating}
                        onChange={(e) => setRating(e.target.value)}
                      />
                      <div id="formReview">
                        <Form.Group className="mb-3" controlId="review">
                          <Form.Label>
                            Your review
                            <span style={{ color: "#585b53" }}>*</span>{" "}
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={7}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </Form.Group>
                        <div id="formSubmit">
                          <Button
                            variant="success"
                            type="submit"
                            style={{ color: "#fff" }}
                          >
                            {" "}
                            Submit{" "}
                          </Button>
                        </div>
                      </div>
                    </Form>
                  </Col>
                </div>
              </Row>
            </div>
          ) : (
            " "
          )}
        </div>

        <div style={{ width: "100%", height: "auto" }}>
          <CardDetail />
        </div>
      </Row>
    </Container>
  );
};

export default DetailProduct;
