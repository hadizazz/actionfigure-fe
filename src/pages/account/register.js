import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Login from "./login";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const Register = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    try {
      await axios.post("http://localhost:3001/signup", {
        name: name,
        username: username,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <Container style={{ height: "100%" }}>
      <Row>
        <div className="my-5">
          <h3 className="text-start">Register</h3>
          <div>
            <p>{msg}</p>
            <Form
              className="formLogin"
              noValidate
              validated={validated}
              onSubmit={Register}
            >
              <Row>
                <Form.Group as={Col} className="mb-3">
                  <Form.Label>
                    Full Name <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {" "}
                    Name is required{" "}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group
                  as={Col}
                  className="mb-3"
                  controlId="validationCustomUsername"
                >
                  <Form.Label>
                    Username <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {" "}
                    Username is required{" "}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="mb-3"
                  controlId="formBasicEmail"
                >
                  <Form.Label>
                    Email <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {" "}
                    Email is required{" "}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group
                  as={Col}
                  className="mb-3"
                  controlId="floatingPasswordCustom"
                >
                  <Form.Label sm="2">
                    Password <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {" "}
                    Password is required{" "}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="mb-3"
                  controlId="floatingPasswordCustom    "
                >
                  <Form.Label sm="2">
                    Confirm Password <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Confirm Password"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {" "}
                    Confirm Password is required{" "}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group
                  as={Col}
                  className="mb-3 phoneNmbr"
                  controlId="phoneNumber"
                >
                  <Form.Label>
                    Phone Number <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    className="phoneNmbr"
                    type="text"
                    placeholder="+62"
                  />
                  <Form.Control.Feedback type="invalid">
                    Phone Number is required{" "}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label required as="legend" column sm={2}>
                    Gender <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  {/* <Form.Control required/> */}
                  <Row>
                    <Col>
                      <Form.Check
                        type="radio"
                        label="Male"
                        name="formHorizontalRadios"
                        id="formGenderMale"
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        type="radio"
                        label="Female"
                        name="formHorizontalRadios"
                        id="formGenderFemale"
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        type="radio"
                        label="Other"
                        name="formHorizontalRadios"
                        id="formGenderOther"
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Row>
              {/* <Form.Group as={Col} className="mb-3" controlId="formGridAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control required as="textarea" />
              </Form.Group> */}
              <Form.Group className="mb-3">
                <Form.Check
                  required
                  label="Agree to terms and conditions"
                  feedback="You must agree before submitting."
                  feedbackType="invalid"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </Row>
    </Container>
  );
};
export default Register;
