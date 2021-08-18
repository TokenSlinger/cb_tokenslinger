import React from "react";
import { Container, InputGroup, FormControl, Button, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";


export default function Home() {
    const history = useHistory();
    let accountAddress = React.useRef('')

    const onButtonPress = () => {
        history.push(`/account/${accountAddress.current.value}`);
    }

    return(
        <React.Fragment>
            <Container fluid>
            <Row style={{paddingTop: 50}}>
                <Col md={{ span: 6, offset: 3 }}>
                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="Account Address"
                        aria-label="Account Address"
                        ref={accountAddress}
                        />
                        <Button onClick={onButtonPress} variant="outline-secondary">
                            View
                        </Button>
                    </InputGroup>
                </Col>
            </Row>

            </Container>
        </React.Fragment>
    )
}