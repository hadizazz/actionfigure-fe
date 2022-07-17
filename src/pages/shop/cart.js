import React,{useState} from 'react'
import { Container,Row,Col,Button,Table,Card} from 'react-bootstrap'
import {useCart} from "react-use-cart"
import {BsTrash} from "react-icons/bs"

const Cart = () => {
  const {items,isEmpty,cartTotal,updateItemQuantity,removeItem} = useCart();
  if (isEmpty) return <div className="my-5 py-5"><h1 className="py-5 my-5">Your Cart is Empty</h1><Button href="Shop" variant="info" size="lg">Return To Shop</Button> </div>
    
  return (
    <Container style={{ height: "100%" }}>
      <Row lg={1} md={1} sm={1} >
        <div className="my-5">
          <h3 className="text-start my-5">Cart</h3>
          <div>
            <Table >
              <thead>
                <tr>
                <td>Product</td>
                  <td>Product Name</td>
                  <td>Price</td>
                  <td>Quantity</td>
                  <td>Substotal</td>
                </tr>
              </thead>
           {items.map((item, index) => 
              <tbody className='text-center'>
                <tr>
                  <td  className="tabImg"><img className="imgCart" style={{height:"50%"}} src={`http://localhost:3001/image/${item.image}`}/></td>
                  <td className="text-center p-0 m-0">{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    Quantity ({item.quantity})
                  </td>
                  <td>
                    <Button variant="secondary" onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</Button>
                    <Button variant="secondary" className="mx-2" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</Button>
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => removeItem(item.id)}><BsTrash/></Button>
                  </td>
                </tr>
              </tbody>
            )}
            </Table>
          </div>
          <div>
            <div className="cardCart">
              <Row>
                <Col>
                </Col>

                <Col> 
              <Card>
                <Card.Header>Cart Totals</Card.Header>
                <Card.Body>
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
                    <Col>
                      <Card.Text>
                        Enter your address to view shipping options.Calculate
                        shipping
                      </Card.Text>
                    </Col>
                  </Row>
                  <div className="lines"></div>
                  <Row>
                    <Col>
                      <Card.Title>Total</Card.Title>
                    </Col>
                    <Col>
                      <Card.Text>Rp. {cartTotal}</Card.Text>
                    </Col>
                  </Row>
                <div className="lines"></div>
                </Card.Body>
                <div className="text-end">
                  <Button className="mx-2 my-2 " href="/checkout" size="lg" type="submit" variant="success">Proceed To Checkout</Button>
                </div>
              </Card>
              </Col>
              </Row>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
}

export default Cart