import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function CarouselHome() {
  return (
    <div className="mb-5" >
      <Carousel >
        <Carousel.Item interval={1000} >
          <img style={{objectFit:"cover",height:"50rem" ,}}
            className="img-fluid"
            src="https://images.unsplash.com/photo-1472457847783-3d10540b03d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80"
            alt="First slide"
            width="100%"
          />
        
        </Carousel.Item>
        <Carousel.Item interval={500} >
          <img style={{objectFit:"cover",height:"50rem" ,}}
            className="img-fluid "
            src="https://images.unsplash.com/photo-1625895197185-efcec01cffe0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="Second slide"
            width="100%"
            
          />
          
        </Carousel.Item>
        <Carousel.Item >
          <img style={{objectFit:"cover",height:"50rem" ,}}
            className="img-fluid"
            src="https://images.unsplash.com/photo-1621478374422-35206faeddfb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="Third slide"
            width="100%"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselHome;
