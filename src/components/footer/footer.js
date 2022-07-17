import React from "react";
import { Container } from 'react-bootstrap';
import "../../assets/css/style.css";
import {AiFillFacebook} from 'react-icons/ai';
import {AiOutlineTwitter} from 'react-icons/ai';
import {AiFillLinkedin} from 'react-icons/ai';
import {AiFillGithub} from 'react-icons/ai';



function Footer() {
  return (
    <footer className="footer-distributed">
        <Container>
          <div className="footer-left">

            <h3>Action<span>figure</span></h3>

            <p className="footer-links">
              <a href="#">Home</a>
              ·
              <a href="#">Blog</a>
              ·
              <a href="#">Pricing</a>
              ·
              <a href="#">About</a>
              ·
              <a href="#">Faq</a>
              ·
              <a href="#">Contact</a>
            </p>

            <p className="footer-company-name">Plabstore © 2022 plabstore, Inc. © 2022 Plabstore, Inc.</p>

            <div className="footer-icons">

              <a href="#"><AiFillFacebook /></a>
              <a href="#"><AiOutlineTwitter /></a>
              <a href="#"><AiFillLinkedin /></a>
              <a href="#"><AiFillGithub /></a>

            </div>

          </div>

          <div className="footer-right">

            <p>Contact Us</p>

            <form action="#" method="post">

              <input type="text" name="email" placeholder="Email"/>
              <textarea name="message" placeholder="Message"></textarea>
              <button>Send</button>

            </form>

          </div>
      </Container>
</footer>
  );
}

export default Footer;
