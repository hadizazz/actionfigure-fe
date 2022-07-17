import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Register from "./register";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [savetoken, setSaveToken] = useState();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/signin", {
        username: username,
        password: password,
      });
      const savetoken = response.data.token;
      setSaveToken(response.data.token);
      console.log(savetoken);
      navigate({
        pathname: "/",
        state: {
          // accessTokens: response.token
        },
      });
      localStorage.setItem("accessToken", savetoken);
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
          <h3 className="text-start">Login</h3>
          <div>
            <Form className="formLogin" onSubmit={Auth}>
              {/* <p className="has-text-centered">{msg}</p> */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>
                  Username or email address{" "}
                  <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="name@example.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label sm="2">
                  Password <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Col sm="12">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Check
                type="checkbox"
                className="mb-2"
                label="Remember me"
              />
              <div className="my-2">
                <a className="_link" href="">
                  Forgot Password ?
                </a>
              </div>
              <Button size="lg" variant="success" type="submit">
                Log in
              </Button>
              <Button
                className="mx-2"
                href="/register"
                size="lg"
                type="submit"
                variant="primary"
              >
                Register
              </Button>
            </Form>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Login;
