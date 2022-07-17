// import { saveBufferToFile } from 'express-fileupload';
import React, { useState, useEffect } from "react";
import { Col, Container, Form, Row, InputGroup, Button } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@mui/material";

const EditProduct = () => {
  // const [selectedImage, setSelectedImage] = useState(null);
  const [products, setProduct] = useState([]);
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [kategori, setKategori] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState("https://fakeimg.pl/500x500/");
  const [image1, setImage1] = useState("https://fakeimg.pl/230x230/");
  const [image2, setImage2] = useState("https://fakeimg.pl/230x230/");
  const [image3, setImage3] = useState("https://fakeimg.pl/230x230/");
  const navigate = useNavigate();
  const [saveImage, setSaveImage] = useState([]);
  const [saveImage1, setSaveImage1] = useState([]);
  const [saveImage2, setSaveImage2] = useState([]);
  const [saveImage3, setSaveImage3] = useState([]);
  const [validated, setValidated] = useState(false);
  const [source, setSource] = useState([]);

  const deleteProduct = async () => {
    await axios.delete(`http://localhost:3001/products/${id}`);
    navigate(`/detail`);
  };

  const getProductById = async () => {
    const response = await axios.get(`http://localhost:3001/products/${id}`);
    setProduct(response.data);
    // setTitle(response.data.title);
    // ganti(response.data.image)
    setSource(products.image);
    setImage(`http://localhost:3001/image/${response.data.image}`);
    setImage1(`http://localhost:3001/image/${response.data.image1}`);
    setImage2(`http://localhost:3001/image/${response.data.image2}`);
    setImage3(`http://localhost:3001/image/${response.data.image3}`);
    setName(response.data.name);
    setPrice(response.data.price);
    setKategori(response.data.kategori);
    setWeight(response.data.weight);
    setDeskripsi(response.data.deskripsi);
    setSize(response.data.size);
  };
  useEffect(() => {
    getProductById();
  }, []);

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (saveImage.length !== 0) {
      // setSaveImage(products.image)
      formData.append("image", saveImage);
      console.log(products.image1);
    } else {
      formData.append("image", products.image);
    }
    if (saveImage1.length !== 0) {
      formData.append("image1", saveImage1);
    } else {
      formData.append("image1", products.image1);
    }
    if (saveImage2.length !== 0) {
      formData.append("image2", saveImage2);
    } else {
      formData.append("image2", products.image2);
    }
    if (saveImage3.length !== 0) {
      formData.append("image3", saveImage3);
    } else {
      formData.append("image3", products.image3);
    }
    const form = e.currentTarget;

    formData.append("name", name);
    formData.append("price", price);
    formData.append("kategori", kategori);
    formData.append("weight", weight);
    formData.append("size", size);
    formData.append("deskripsi", deskripsi);

    await axios.patch(`http://localhost:3001/products/${id}`, formData);
    navigate(`/detail/${id}`);
    console.log(saveImage1);
  };
  function handleUploadChange(e) {
    if (e.target.files[0]) {
      const uploaded = e.target.files[0];
      const saveImage = e.target.files[0];
      setSaveImage(uploaded);
      setImage(URL.createObjectURL(uploaded));
    } else {
      const uploaded1 = products.image;
      const saveImage = products.image;
      setSaveImage(uploaded1);
    }
    // console.log(saveImage);
  }
  function handleUploadChange1(e) {
    if (e.target.files[0]) {
      const uploaded = e.target.files[0];
      const saveImage1 = e.target.files[0];
      setSaveImage1(uploaded);
      setImage1(URL.createObjectURL(uploaded));
    } else {
      const uploaded1 = products.image1;
      const saveImage1 = products.image1;
      setSaveImage1(uploaded1);
    }
  }
  function handleUploadChange2(e) {
    if (e.target.files[0]) {
      const uploaded = e.target.files[0];
      const saveImage2 = e.target.files[0];
      setSaveImage2(uploaded);
      setImage2(URL.createObjectURL(uploaded));
    } else {
      const uploaded1 = products.image2;
      const saveImage2 = products.image2;
      setSaveImage2(uploaded1);
    }
  }
  function handleUploadChange3(e) {
    if (e.target.files[0]) {
      const uploaded = e.target.files[0];
      const saveImage3 = e.target.files[0];
      setSaveImage3(uploaded);
      setImage3(URL.createObjectURL(uploaded));
    } else {
      const uploaded1 = products.image3;
      const saveImage3 = products.image3;
      setSaveImage3(uploaded1);
    }
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
            Detail Product
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="my-5 profile">
        <Form
          className="justify-content-center"
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
                  type="file"
                  name="image"
                  onChange={handleUploadChange}
                />
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
                      type="file"
                      name="image1"
                      size="sm"
                      onChange={handleUploadChange1}
                    />
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
                      type="file"
                      name="image1"
                      size="sm"
                      onChange={handleUploadChange2}
                    />
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
                      type="file"
                      name="image1"
                      size="sm"
                      onChange={handleUploadChange3}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
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
                  aria-label="Amount"
                  placeholder="(e.g.100000)"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </InputGroup>
              <Form.Label>Product Weight</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  aria-label="Amount"
                  placeholder="(e.g.100)"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                <InputGroup.Text>gr</InputGroup.Text>
              </InputGroup>
              <div>
                <Form.Label>Package Size</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="Amount"
                    placeholder="Widht x Length x Height"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  />
                  <InputGroup.Text>cm</InputGroup.Text>
                </InputGroup>
              </div>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                />
              </Form.Group>
              <Row>
                <Col sm={1}>
                  <div>
                    <Button type="submit" style={{ width: "auto" }}>
                      Update
                    </Button>
                  </div>
                </Col>
                <Col>
                  <div className="mx-4">
                    <Button
                      onClick={deleteProduct}
                      variant="danger"
                      style={{ width: "auto" }}
                    >
                      Delete
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    </Container>
  );
};

export default EditProduct;
