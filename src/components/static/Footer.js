import React from "react";
import { Navbar, Container, Tooltip, Overlay } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Donation() {
    const [show, setShow] = React.useState(false);
    const target = React.useRef(null);

    const copyAddress = () => {
        navigator.clipboard.writeText("0xE7E5cf966f33D557ab56A720A04C024863cfE4c4")
        setShow(true)
        window.setTimeout(() => {setShow(false)}, 1000)
    }

    return (
        <React.Fragment>
            <Navbar.Text>

                <span style={{fontSize: 12}}>Please consider donating SKILL/BNB to: <b>0xE7E5cf966f33D557ab56A720A04C024863cfE4c4</b></span>{' '}
                <>
                    <span ref={ target } style={{cursor: 'pointer'}} onClick={copyAddress}><FontAwesomeIcon icon={['far', 'copy']} /></span>
                    <Overlay target={ target.current } show={ show } placement="top">
                        {( props ) => (
                        <Tooltip id="overlay-example" {...props}>
                            Thanks Friend!
                        </Tooltip>
                        )}
                    </Overlay>
                </>

            </Navbar.Text>
            <Navbar.Text>
                <span style={{fontSize: 12}}>Created with <FontAwesomeIcon icon={['far', 'coffee-togo']}/> by TokenSlinger</span>
            </Navbar.Text>
        </React.Fragment>
    );
}

export default function Footer() {
    return(
        <React.Fragment>
            <Navbar fixed="bottom" bg="dark" variant="dark">
                <Container fluid>
                    <Donation />
                </Container>
            </Navbar>
        </React.Fragment>
    )
}