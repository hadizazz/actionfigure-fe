import {useEffect, useState} from 'react'
import "../../assets/css/style.css"
import { Nav,Navbar,Container,NavDropdown} from 'react-bootstrap';
import {AiOutlineShoppingCart} from "react-icons/ai"
import { useCart } from "react-use-cart"
import Carts   from "../../pages/shop/cart"

const Navbars = () => {
  const {totalItems} = useCart();
  const [statusNavbar, setStatusNavbar] = useState(false)
 
  const accessToken = localStorage.getItem("accessToken");
  const tokens = () => {
    if (accessToken) {
      setStatusNavbar(true)
    } else {
      setStatusNavbar(false)
    }    
  }
  useEffect(()=>{
    const a = (localStorage.getItem("accessToken"));
    tokens()
  })
  const logout = () => {
    localStorage.removeItem('accessToken');
    setStatusNavbar(false)

  };

  return ( 
    <div className="nvbr">
      <Navbar bg="light" expand="md">
        <Container fluid>
          <Navbar.Brand className="offset-1 mr-5 pr-5" href="/">
            ActionFigure
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse className="justify-content-end" id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link style={{ color: "#000" }} href="/">
                Home
              </Nav.Link>
              <Nav.Link style={{ color: "#000" }} href="/shop">
                Shop
              </Nav.Link>
            </Nav>
            {statusNavbar ?(
                <>
              <div className="drpdwn">
                <NavDropdown title="Account" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item to="/login" onClick={logout} >Logout</NavDropdown.Item>
                </NavDropdown>
              </div>

                <a className="btn btn-lg _cart" href="/cart" role="button">
                  <AiOutlineShoppingCart />
                  <span>{totalItems}</span>
                </a>
              </>
            ): (
              <Nav.Link className="mx-5" style={{ color: "#000"}} href="/login">
                Login
              </Nav.Link>
            )}

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navbars