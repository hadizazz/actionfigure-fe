import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useCart } from "react-use-cart";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { items, cartTotal } = useCart();
  const [user_id, setUser_id] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone_number, setPhone_Number] = useState();
  const [province, setProvince] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [fullAddress, setFullAddress] = useState();
  const [total, setTotal] = useState(0);
  const [shipping, setShipping] = useState();
  const [shippingPrice, setShippingPrice] = useState();
  const [status, setStatus] = useState();
  const [district, setDistrict] = useState();
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const saveTransaction = async (e) => {
    setIsLoading(true);
    const product_id = [];
    const price = [];
    const quantity = [];
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      product_id.push(element.id);
      price.push(element.price);
      quantity.push(element.quantity);
    }
    const p_id = product_id.toString();
    const p_price = price.toString();
    const p_quantity = quantity.toString();

    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      const info = {
        user_id: user_id,
        price: p_price,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone_number: phone_number,
        province: province,
        district: district,
        city: city,
        zip: zip,
        fullAddress: fullAddress,
        product_id: p_id,
        quantity: p_quantity,
        subTotal: cartTotal,
        total: total,
        shipping: shipping,
        shippingPrice: shippingPrice,
        status: status,
      };
      await axios.post(`http://localhost:3001/transaction/all`, info);

      const name = firstName + " " + lastName;
      const bank = "bri";
      const order_id = new Date().getTime();
      // let token = "";
      const order = {
        payment_type: "bank_transfer",
        bank_transfer: {
          bank: bank,
        },
        transaction_details: {
          order_id: order_id,
          gross_amount: total,
        },
        name: name,
        email: email,
      };
      const response = await axios.post(
        `http://localhost:3001/order/charge`,
        order
      );
      // console.log(`TOKENNNNN : ${response.data.token}`);
      window.snap.pay(response.data.token);
      // navigate('/')
      console.log(response);
      console.log(name);
      console.log(bank);
      console.log(order);
      console.log(info);
    }
    setIsLoading(false);
  };
  const shippingOptions = [
    { value: 0, label: 10000, name: "JNE" },
    { value: 1, label: 7000, name: "JNT" },
    { value: 2, label: 5000, name: "SiCepat" },
  ];

  const shippingHandle = (e) => {
    console.log(e);

    setShipping(shippingOptions[e].name);
    setShippingPrice(shippingOptions[e].label);
    setTotal(cartTotal + shippingOptions[e].label);
  };

  useEffect(() => {
    getAllOrder();
  }, []);
  const [orders, setOrders] = useState();
  const getAllOrder = async () => {
    const response = await axios.get(`http://localhost:3001/order/all`);
    setOrders(response.data);
    console.log(response);
    console.log(sessionStorage);
  };

  return (
    <Container>
      <Row className="mb-5">
        <h3 className=" pt-5 text-start">Checkout</h3>
        <div className="lines"></div>
        {isLoading ? (
          <span className="d-flex justify-content-center align-content-center align-items-center">
            <ReactLoading
              type={"spinningBubbles"}
              color={"#000"}
              height={50}
              width={50}
            />
          </span>
        ) : (
          <>
            <Col>
              <div className="my-5">
                <Form
                  className="formLogin"
                  onSubmit={saveTransaction}
                  noValidate
                  validated={validated}
                >
                  <h5 className="pb-2">Billing details</h5>
                  <div className="lines mb-4"></div>
                  <Row>
                    <Form.Group as={Col} className="mb-3">
                      <Form.Label>
                        {" "}
                        First Name <span style={{ color: "red" }}>*</span>{" "}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {" "}
                        Please Input Your Firstname{" "}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                      <Form.Label>
                        {" "}
                        Last Name <span style={{ color: "red" }}>*</span>{" "}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {" "}
                        Please Input Your Lasttname{" "}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group
                      as={Col}
                      className="mb-3"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>
                        Email address <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="email"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {" "}
                        Please Input Your Email{" "}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      className="mb-3 phoneNmbr"
                      controlId="phoneNumber"
                    >
                      <Form.Label>
                        {" "}
                        Phone Number <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        className="phoneNmbr"
                        type="text"
                        placeholder="+62"
                        onChange={(e) => setPhone_Number(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {" "}
                        Please Input Your Phone Number{" "}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group
                      as={Col}
                      className="mb-3"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label sm="2"> District</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        onChange={(e) => setDistrict(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {" "}
                        Please Input Your District{" "}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      className="mb-3 phoneNmbr"
                      controlId="phoneNumber"
                    >
                      <Form.Label>
                        {" "}
                        Province <span style={{ color: "red" }}>*</span>{" "}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        onChange={(e) => setProvince(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {" "}
                        Please Input Your Province{" "}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Label>
                        {" "}
                        City <span style={{ color: "red" }}>*</span>{" "}
                      </Form.Label>
                      <Form.Control
                        required
                        onChange={(e) => setCity(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {" "}
                        Please Input Your City
                      </Form.Control.Feedback>
                    </Col>
                    <Col>
                      <Form.Label>
                        {" "}
                        Zip <span style={{ color: "red" }}>*</span>{" "}
                      </Form.Label>
                      <Form.Control
                        required
                        onChange={(e) => setZip(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {" "}
                        Please Input Your Zip{" "}
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                  <Form.Group as={Col} className="mt-3">
                    <Form.Label>
                      Full Address <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      onChange={(e) => setFullAddress(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {" "}
                      Please Input Your Full Address{" "}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="mt-5">
                    <Button type="submit">Submit</Button>
                  </div>
                </Form>
              </div>
            </Col>
            <Col sm="5">
              <div className="cardCart my-5 ">
                <Row>
                  <Col>
                    <Card>
                      <Card.Header>Cart Totals</Card.Header>
                      <Card.Title className="mx-3 mt-2">Product</Card.Title>
                      <div className="lines"></div>
                      <Card.Body>
                        {items.map((item, index) => (
                          <Row key={index}>
                            <Col>
                              <Card.Text className="text-muted">
                                {item.name} x{item.quantity}
                              </Card.Text>
                            </Col>
                            <Col>
                              <Card.Text className="py-1">
                                Rp. {item.price}{" "}
                              </Card.Text>
                            </Col>
                          </Row>
                        ))}
                        <div className="lines"></div>
                        <Row>
                          <Col>
                            <Card.Title>Subtotal</Card.Title>
                          </Col>
                          <Col>
                            <Card.Text>Rp. {cartTotal}</Card.Text>
                          </Col>
                        </Row>
                        <div className="lines"></div>

                        <Row>
                          <Col>
                            <Card.Title>Shipping</Card.Title>
                          </Col>
                          <Col className="my-2">
                            <Card.Text>
                              <select
                                onChange={(e) => shippingHandle(e.target.value)}
                              >
                                {shippingOptions.map((items) => (
                                  <option key={items.value} value={items.value}>
                                    {items.name} {items.label}
                                  </option>
                                ))}
                              </select>
                            </Card.Text>
                          </Col>
                        </Row>
                        <div className="lines"></div>
                        <Row>
                          <Col>
                            <Card.Title>Total</Card.Title>
                          </Col>
                          <Col>
                            <Card.Text>Rp. {total} </Card.Text>
                          </Col>
                        </Row>
                        <div className="lines"></div>
                      </Card.Body>
                      <div className="text-end">
                        <Button
                          className="mx-2 my-2 "
                          size="md"
                          type="submit"
                          variant="success"
                          onClick={getAllOrder}
                        >
                          Checkout
                        </Button>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default Checkout;
