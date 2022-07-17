import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Button, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const CardDetail = () => {
  // const [data,setData] = useState(dataProduk)
  // const [kategori,setKategori] = useState([])
  const [products, setProduct] = useState([]);
  const { id } = useParams();

  function refreshPage() {
    window.parent.location = window.child.location;
  }

  useEffect(() => {
    getProductByKategori();
  }, []);

  const getProductByKategori = async () => {
    const res = await axios.get(`http://localhost:3001/products/${id}`);
    const a = res.data.kategori;

    const response = await axios.get(
      `http://localhost:3001/products/kategori/${a}`
    );
    setProduct(response.data);
    console.log(res);
    console.log(response);
    console.log(a);
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return (
    <div>
      <Row>
        <Col className="text-start">
          <h3>Related products</h3>
        </Col>
      </Row>
      <Row xs={1} lg={3} md={2} sm={2} xl={4} className="g-4">
        {products.map((item, index) => {
          return (
            <Col className="my-5" id="#featured" key={item.id}>
              <Link
                onClick={refreshPage}
                to={{ pathname: `/detail/${item.id}`, item: item }}
              >
                <Card style={{ width: "100%", height: "auto" }}>
                  <Card.Img
                    className="__card"
                    variant="top"
                    src={`http://localhost:3001/image/${item.image}`}
                  />
                  <Card.Body className="text-start">
                    <div style={{ height: "50px" }}>
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

export default CardDetail;
