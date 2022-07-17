import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Carousel from "../../components/carousel/carouselHome";
import Card from "../../components/card/card";
import { Container, Row, Col } from "react-bootstrap";
import { BsFillFileLockFill } from "react-icons/bs";
import { MdPayments } from "react-icons/md";
import { FaPhoneSquareAlt } from "react-icons/fa";

function Home() {
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);
  const [products, setProduct] = useState([]);

  const handle_category = async () => {
    // e.preventDefault();
    const response = await axios.get(`http://localhost:3001/products`);
    // const kat = JSON.stringify(res.kategori);
    // console.log(res.data.kategori);
    // const response = await axios.get(
    //   `http://localhost:3001/products/kategori/${kat}`
    // );
    setProduct(response.data);
    // console.log(res);
    // console.log(kat);
    // console.log(kat);
    console.log(response);
  };
  console.log(products);
  return (
    <div>
      <Carousel />
      <Card />
      <div>
        <Container>
          <h2 className="border-bottom border-top border-dark mb-4 py-3">
            Shop by Categories
          </h2>
          <div className="imgKategori ">
            <Row xs={1} lg={2} md={2} sm={2} xl={3}>
              <Col className="my-2">
                <div className="boxImg">
                  <a href="/shop/movie">
                    <img
                      title="Movie"
                      src="https://images.unsplash.com/photo-1602306081673-f26c56e0c0c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                    />
                  </a>
                  <h3 className="txtImg">Movie</h3>
                </div>
              </Col>
              <Col className="my-2">
                <div className="boxImg mx-3">
                  <a href="/shop/anime">
                    <img
                      title="Anime"
                      src="https://images.unsplash.com/photo-1606663889134-b1dedb5ed8b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                    />
                  </a>
                  <h3 className="txtImg">Anime</h3>
                </div>
              </Col>
              <Col className="my-2">
                <div className="boxImg">
                  <a href="/shop/superhero">
                    <img
                      title="Superhero"
                      src="https://i.pinimg.com/564x/9f/68/e5/9f68e514976b90c1f870e637ea663805.jpg"
                    />
                  </a>
                  <h3 className="txtImg">Superhero</h3>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>

      <div
        className="mt-5"
        style={{
          backgroundColor: "whitesmoke",
          height: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row xs={1} lg={2} md={2} sm={1} xl={3}>
          <Col sm="4">
            <div>
              <span className="fs-1">
                <BsFillFileLockFill />
              </span>
              <h3>Secure Shopping</h3>
              <p>
                Your personal information is secured with an industry standart
              </p>
            </div>
          </Col>
          <Col>
            <div className="border-right border-left border-dark">
              <span className="fs-1">
                <FaPhoneSquareAlt />
              </span>
              <h3>Need Assistance ?</h3>
              <p>
                We don't hide behind technical walls, We're open 7-Days to help
                you. Whenever you need. Contact us
              </p>
            </div>
          </Col>
          <Col>
            <div>
              <span className="fs-1">
                <MdPayments />
              </span>
              <h3>Safe Payment</h3>
              <p>With our payment gateway</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Home;
