import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ButtonGroup,
  ToggleButton,
  Radio,
} from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import DatePicker from "react-date-picker";
import { BiUserCircle } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";
import { AiOutlineSetting } from "react-icons/ai";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useIsRTL } from "react-bootstrap/esm/ThemeProvider";

const Profile = () => {
  const [value, onChange] = useState(new Date());
  const [navigation, setNavigation] = useState(1);
  const [section, setSection] = useState(1);
  const accessToken = localStorage.getItem("accessToken");
  const [user, setUser] = useState("");
  const [user_name, setUser_Name] = useState("");
  const [email, setEmail] = useState("");
  // const [birth_date, setBirth_Date] = useState();
  const [gender, setGender] = useState("");
  const [phone_number, setPhone_Number] = useState("");
  const navigate = useNavigate();

  function parseJwt(accessToken) {
    if (!accessToken) {
      return;
    }
    const base64Url = accessToken.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  const getUser = async () => {
    const jwtoken = parseJwt(accessToken);
    const id = jwtoken.id;
    const response = await axios.get(`http://localhost:3001/user/` + id);
    setUser(response.data);
    setUser_Name(response.data.user_name);
    setEmail(response.data.email);
    setGender(response.data.gender);
    setPhone_Number(response.data.phone_number);
  };

  useEffect(() => {
    getUser();
  }, []);

  const saveUser = async (e) => {
    e.preventDefault();
    // const formData = new FormData()
    const info = {
      user_name: user_name,
      gender: gender,
      email: email,
      phone_number: phone_number,
    };
    const a = await axios.patch("http://localhost:3001/user/" + user.id, info);
    navigate("/");
    console.log(a);
  };
  // console.log(saveUser);
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("1");
  const radios = [
    { name: "Male", value: "Male" },
    { name: "Female", value: "Female" },
    { name: "Other", value: "Other" },
  ];

  return (
    <div>
      <Container>
        <Row>
          <div className="my-2">
            <Breadcrumb>
              <Breadcrumb.Item className="breadcrumb-style" href="/">
                {" "}
                Hompage{" "}
              </Breadcrumb.Item>
              <Breadcrumb.Item active className="breadcrumb-style">
                My Profile{" "}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Col sm="2">
            <h2 className="text-start">My Account</h2>
            <div className="sideBar">
              <ul>
                <li>
                  <a
                    href="#personal-information"
                    className="nav-link"
                    onClick={() => setNavigation(1)}
                  >
                    <BiUserCircle className="me-2" />
                    Account{" "}
                  </a>
                </li>
                {/* <li>
                  <a
                    href="#my-purchase"
                    className="nav-link"
                    onClick={() => setNavigation(2)}
                  >
                    <FiShoppingBag className="me-2" />
                    My Purchase
                  </a>
                </li>
                <li>
                  <a
                    href="#account-setting"
                    className="nav-link"
                    onClick={() => setNavigation(3)}
                  >
                    <AiOutlineSetting className="me-2" />
                    Account Setting
                  </a>
                </li> */}
              </ul>
            </div>
          </Col>
          <Col>
            <div className="profile">
              {navigation === 1 ? (
                <div id="personal-information">
                  <h4>My Details</h4>
                  <h6 className="my-4">Personal Information</h6>
                  <div className="lines my-2"></div>
                  <Row>
                    <Col>
                      <p>
                        Assertively utilize adaptive customer service for
                        future-proof platforms. Completely drive optimal
                        markets.
                      </p>
                    </Col>
                    <Col>
                      <Form
                        onSubmit={saveUser}
                        method="POST"
                        encType="multipart/form-data"
                      >
                        <Form.Group className="mb-3">
                          <Form.Label>Name</Form.Label>
                          <Col sm="8">
                            <Form.Control
                              type="name"
                              value={user_name}
                              onChange={(e) => setUser_Name(e.target.value)}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Email address</Form.Label>
                          <Col sm="8">
                            <Form.Control
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group className="mb-3" as={Col}>
                          <Form.Label as="legend" column sm={2}>
                            Gender <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <Row>
                            <Col>
                              <div>
                                <ButtonGroup className="mb-2">
                                  {radios.map((radio, idx) => (
                                    <ToggleButton
                                      key={idx}
                                      id={`radio-${idx}`}
                                      type="radio"
                                      name="radio"
                                      variant="outline-dark"
                                      value={radio.value}
                                      style={{ marginRight: "10px" }}
                                      checked={gender === radio.value}
                                      onChange={(e) =>
                                        setGender(e.target.value)
                                      }
                                    >
                                      {radio.name}
                                    </ToggleButton>
                                  ))}
                                </ButtonGroup>
                              </div>
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Phone Number</Form.Label>
                          <Col sm="5">
                            <Form.Control
                              type="text"
                              value={phone_number}
                              onChange={(e) => setPhone_Number(e.target.value)}
                            />
                          </Col>
                        </Form.Group>
                        <div>
                          <Button
                            size="lg"
                            variant="success"
                            type="submit"
                            style={{ color: "#fff" }}
                          >
                            {" "}
                            Save{" "}
                          </Button>
                        </div>
                      </Form>
                    </Col>
                  </Row>
                </div>
              ) : (
                // ) : navigation === 2 ? (
                //   <div>
                //     <div className="myPurchase " id="my-purchase">
                //       <li className="mx-4">
                //         <a href="#all" onClick={() => setSection(1)}>
                //           All
                //         </a>
                //       </li>
                //       <li className="mx-4">
                //         <a href="#" onClick={() => setSection(2)}>
                //           To Ship
                //         </a>
                //       </li>
                //       <li className="mx-4">
                //         <a href="#" onClick={() => setSection(3)}>
                //           To Receive
                //         </a>
                //       </li>
                //       <li className="mx-4">
                //         <a href="#complated" onClick={() => setSection(4)}>
                //           Complated
                //         </a>
                //       </li>
                //       <li className="mx-4">
                //         <a href="#" onClick={() => setSection(5)}>
                //           Cancelled
                //         </a>
                //       </li>
                //     </div>
                //     <Form className="d-flex my-4 justify-content-center">
                //       <Col sm="10">
                //         <Form.Control
                //           type="search"
                //           placeholder="Search"
                //           className="me-2"
                //           aria-label="Search"
                //         />
                //       </Col>
                //       <Button className="ms-2" variant="outline-success">
                //         Search
                //       </Button>
                //     </Form>
                //     {section === 1 ? (
                //       <div id="all">
                //         <div className="lines mb-4" />
                //         <Row clasName="align-self-center">
                //           <Col sm="2">
                //             <img
                //               style={{ width: "60px", height: "auto" }}
                //               src="https://i.pinimg.com/originals/98/e6/31/98e6316684fb3bb9ed70739c11f96f7b.jpg"
                //             />
                //           </Col>
                //           <Col>
                //             <p className=" __title">Action Figure Minion</p>
                //           </Col>
                //           <Col>
                //             <p>price</p>
                //           </Col>
                //           <Col>
                //             <p>Complated</p>
                //           </Col>
                //         </Row>
                //       </div>
                //     ) : section === 2 ? (
                //       <div>
                //         Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                //         Vestibulum ullamcorper eros id vulputate eleifend. Donec
                //         vitae commodo neque, eu semper odio. Duis lobortis justo
                //         et ante elementum, nec auctor odio imperdiet. Nunc
                //         volutpat ullamcorper pretium. Sed ac hendrerit ligula,
                //         quis hendrerit purus. Vestibulum non posuere dui. Nam
                //         luctus diam quis viverra molestie. Duis tristique sed est
                //         in commodo. Etiam ut ligula nisl. Donec sit amet pretium
                //         sem, vitae ultricies leo.
                //       </div>
                //     ) : section === 3 ? (
                //       <div>
                //         Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                //         Vestibulum ullamcorper eros id vulputate eleifend. Donec
                //         vitae commodo neque, eu semper odio. Duis lobortis justo
                //         et ante elementum, nec auctor odio imperdiet. Nunc
                //         volutpat ullamcorper pretium. Sed ac hendrerit ligula,
                //         quis hendrerit purus. Vestibulum non posuere dui. Nam
                //         luctus diam quis viverra molestie. Duis tristique sed est
                //         in commodo. Etiam ut ligula nisl. Donec sit amet pretium
                //         sem, vitae ultricies leo.
                //       </div>
                //     ) : section === 4 ? (
                //       <div id="complated">
                //         <div className="lines mb-4" />
                //         <Row clasName="align-self-center">
                //           <Col sm="2">
                //             <img
                //               style={{ width: "60px", height: "auto" }}
                //               src="https://i.pinimg.com/originals/98/e6/31/98e6316684fb3bb9ed70739c11f96f7b.jpg"
                //             />
                //           </Col>
                //           <Col>
                //             <p className=" __title">Action Figure Minion</p>
                //           </Col>
                //           <Col>
                //             <p>price</p>
                //           </Col>
                //           <Col>
                //             <p>Complated</p>
                //           </Col>
                //         </Row>
                //       </div>
                //     ) : section === 5 ? (
                //       <div>
                //         Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                //         Vestibulum ullamcorper eros id vulputate eleifend. Donec
                //         vitae commodo neque, eu semper odio. Duis lobortis justo
                //         et ante elementum, nec auctor odio imperdiet. Nunc
                //         volutpat ullamcorper pretium. Sed ac hendrerit ligula,
                //         quis hendrerit purus. Vestibulum non posuere dui. Nam
                //         luctus diam quis viverra molestie. Duis tristique sed est
                //         in commodo. Etiam ut ligula nisl. Donec sit amet pretium
                //         sem, vitae ultricies leo.
                //       </div>
                //     ) : (
                //       " "
                //     )}
                //   </div>
                // ) : navigation === 3 ? (
                //   <div></div>
                " "
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
