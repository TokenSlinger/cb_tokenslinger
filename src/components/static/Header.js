import React from "react";
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import logo from '../../assets/images/logo.png'
export default function Header() {
    return(
        <React.Fragment>
            <Navbar sticky="top" bg="dark" variant="dark">
                <Container fluid>

                    <Navbar.Brand>
                        <img
                        src={ logo }
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="CB TokenSlinger"
                        />{' '}
                        CB TokenSlinger
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="me-auto">

                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>

                        {/* <LinkContainer to="/accounts">
                            <Nav.Link>Accounts</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/characters">
                            <Nav.Link>Characters</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/swords">
                            <Nav.Link>Swords</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/shields">
                            <Nav.Link>Shields</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/trade">
                            <Nav.Link>Trade</Nav.Link>
                        </LinkContainer> */}

                    </Nav>
                    
                    <Button disabled style={{marginRight: 10}} size="sm" variant="outline-light">Add Account</Button>{' '}
                    <Button disabled size="sm" variant="outline-light">Connect MetaMask</Button>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </React.Fragment>
    )
}