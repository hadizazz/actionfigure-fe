// import { saveBufferToFile } from 'express-fileupload';
import React, { useState } from "react";
import { Col, Container, Form, Row, InputGroup, Button } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "@mui/material";

const AddProduct = () => {
  // const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [kategori, setKategori] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [image, setImage] = useState("https://fakeimg.pl/500x500/");
  const [image1, setImage1] = useState("https://fakeimg.pl/230x230/");
  const [image2, setImage2] = useState("https://fakeimg.pl/230x230/");
  const [image3, setImage3] = useState("https://fakeimg.pl/230x230/");
  const navigate = useNavigate();
  const [saveImage, setSaveImage] = useState("https://fakeimg.pl/500x500/");
  const [saveImage1, setSaveImage1] = useState([]);
  const [saveImage2, setSaveImage2] = useState([]);
  const [saveImage3, setSaveImage3] = useState([]);
  const [validated, setValidated] = useState(false);

  const saveProduct = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      const formData = new FormData();
      formData.append("image", saveImage);
      formData.append("image1", saveImage1);
      formData.append("image2", saveImage2);
      formData.append("image3", saveImage3);
      formData.append("name", name);
      formData.append("price", price);
      formData.append("kategori", kategori);
      formData.append("weight", weight);
      formData.append("size", size);
      formData.append("deskripsi", deskripsi);

      await axios.post(`http://localhost:3001/products`, formData);
      navigate("/");
    }

    setValidated(true);
  };
  function handleUploadChange(e) {
    const saveImage = e.target.files[0];
    const uploaded = e.target.files[0];
    setImage(URL.createObjectURL(uploaded));
    setSaveImage(uploaded);
  }
  function handleUploadChange1(e) {
    const saveImage1 = e.target.files[0];
    let uploaded = e.target.files[0];
    setImage1(URL.createObjectURL(uploaded));
    setSaveImage1(uploaded);
  }
  function handleUploadChange2(e) {
    const saveImage2 = e.target.files[0];
    let uploaded = e.target.files[0];
    setImage2(URL.createObjectURL(uploaded));
    setSaveImage2(uploaded);
  }
  function handleUploadChange3(e) {
    const saveImage3 = e.target.files[0];
    let uploaded = e.target.files[0];
    setImage3(URL.createObjectURL(uploaded));
    setSaveImage3(uploaded);
  }

  return (
    <Container>
      <div className="my-2">
        <Breadcrumb>
          <Breadcrumb.Item className="breadcrumb-style" href="/">
            {" "}
            Hompage{" "}
          </Breadcrumb.Item>
          <Breadcrumb.Item className="breadcrumb-style" href="/">
            {" "}
            Shop{" "}
          </Breadcrumb.Item>
          <Breadcrumb.Item active className="breadcrumb-style">
            Add Product
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="my-5 profile">
        <Form
          className="justify-content-center"
          noValidate
          validated={validated}
          onSubmit={saveProduct}
          method="POST"
          encType="multipart/form-data"
        >
          <Row>
            <Col sm="5">
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Product Image</Form.Label>
                <div className="mx-auto coverZoom">
                  <img src={image} className="img-thumbnail" />
                </div>
                <br></br>
                <Form.Control
                  accept=".png, .jpg, .jpeg"
                  required
                  type="file"
                  name="image"
                  onChange={handleUploadChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a image.
                </Form.Control.Feedback>
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group controlId="formFileMultiple" className="mb-3">
                    <div className="mx-auto addImage">
                      <img src={image1} />
                    </div>
                    <br></br>
                    <Form.Control
                      accept=".png, .jpg, .jpeg"
                      required
                      type="file"
                      name="image1"
                      size="sm"
                      onChange={handleUploadChange1}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a image.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formFileMultiple" className="mb-3 ">
                    <div className="mx-auto addImage">
                      <img src={image2} />
                    </div>
                    <br></br>
                    <Form.Control
                      accept=".png, .jpg, .jpeg"
                      required
                      type="file"
                      name="image1"
                      size="sm"
                      onChange={handleUploadChange2}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a image.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formFileMultiple" className="mb-3 ">
                    <div className="mx-auto addImage">
                      <img src={image3} />
                    </div>
                    <br></br>
                    <Form.Control
                      accept=".png, .jpg, .jpeg"
                      required
                      type="file"
                      name="image1"
                      size="sm"
                      onChange={handleUploadChange3}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a image.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Name is required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Select
                className="mb-3"
                aria-label="Default select example"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
              >
                <option value=" " hidden>
                  Category Product
                </option>
                <option value="movie">Movie</option>
                <option value="anime">Anime</option>
                <option value="superhero">Superhero</option>
              </Form.Select>
              <Form.Label>Product Price</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>Rp.</InputGroup.Text>
                <Form.Control
                  required
                  aria-label="Amount"
                  placeholder="(e.g.100000)"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Price is required
                </Form.Control.Feedback>
              </InputGroup>
              <Form.Label>Product Weight</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  required
                  aria-label="Amount"
                  placeholder="(e.g.100)"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                <InputGroup.Text>gr</InputGroup.Text>
                <Form.Control.Feedback type="invalid">
                  Price is required
                </Form.Control.Feedback>
              </InputGroup>
              <div>
                <Form.Label>Package Size</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    required
                    aria-label="Amount"
                    placeholder="Widht x Length x Height"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  />
                  <InputGroup.Text>cm</InputGroup.Text>
                  <Form.Control.Feedback type="invalid">
                    Price is required
                  </Form.Control.Feedback>
                </InputGroup>
              </div>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={3}
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Description is required
                </Form.Control.Feedback>
              </Form.Group>
              <div>
                <Button type="submit" style={{ width: "auto" }}>
                  Save
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </Container>
  );
};

export default AddProduct;
