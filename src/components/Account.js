import React from "react";
import { Container, Row, Col, Badge, Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getBnbBalance, getUnclaimedSkill, getInGameOnlySkill, getWalletSkill, getStakedSkill, getAccountWeapons, getAccountShields, getAccountCharacters } from "../utils/blockchain";

function Balances({ bnbBalance, stakedSkillBalance, unclaimedSkillBalance, inGameSkillBalance, walletSkillBalance }) {
    return(
        <React.Fragment>
            <Container>
                <Row>
                    <Col>  
                        <b>BNB: </b><Badge bg="secondary"> { bnbBalance.toFixed(5) } </Badge>
                    </Col>
                    <Col>  
                        <b>Staked: </b><Badge bg="secondary"> { stakedSkillBalance.toFixed(5) } </Badge>
                    </Col>
                    <Col>  
                        <b>Unclaimed: </b><Badge bg="secondary"> { unclaimedSkillBalance.toFixed(5) } </Badge>
                    </Col>
                    <Col>  
                        <b>In Game: </b><Badge bg="secondary"> { inGameSkillBalance.toFixed(5) } </Badge>
                    </Col>
                    <Col>  
                        <b>Wallet: </b><Badge bg="secondary">{ walletSkillBalance.toFixed(5) }</Badge>
                    </Col>
                    <Col>  
                        <b>Total: </b><Badge bg="primary">{ 
                                        (inGameSkillBalance + 
                                        walletSkillBalance + 
                                        unclaimedSkillBalance + 
                                        stakedSkillBalance).toFixed(5) }
                                    </Badge>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

function Characters({ accountCharacters }) {
    return (
        <Container fluid>
            <Row>
                <Col>
                    {accountCharacters.join(', ')}
                </Col>
            </Row>
        </Container>
    )
}

function Weapons({ accountWeapons }) {
    return (
        <Container fluid>
            <Row>
                <Col>
                {accountWeapons.join(', ')}
                </Col>
            </Row>
        </Container>
    )
}

function Shields({ accountShields }) {
    return (
        <Container fluid>
            <Row>
                <Col>
                {accountShields.join(', ')}
                </Col>
            </Row>
        </Container>
    )
}

export default function Account() {
    
    const { address } = useParams()

    const [ accountCharacters, setAccountCharacters ] = React.useState([]) // Array of character IDs
    const [ bnbBalance, setBnbBalance ] = React.useState(0) // BNB Balance from MetaMask
    const [ inGameSkillBalance, setInGameSkillBalance ] = React.useState(0) // IGO SKILL
    const [ walletSkillBalance, setWalletSkillBalance ] = React.useState(0) // Wallet SKILL from contract
    const [ unclaimedSkillBalance, setUnclaimedSkillBalance ] = React.useState(0) // Unclaimed SKILL
    const [ stakedSkillBalance, setStakedSkillBalance ] = React.useState(0) // Staked SKILL
    const [ accountWeapons, setAccountWeapons ] = React.useState([]) // Array of weapon IDs
    const [ accountShields, setAccountShields ] = React.useState([]) // Array of shield IDs

    React.useEffect(() => {
        async function fetchData() {
            setBnbBalance( await getBnbBalance( address ) )
            setStakedSkillBalance( await getStakedSkill( address ) )
            setUnclaimedSkillBalance( await getUnclaimedSkill( address ) )
            setInGameSkillBalance( await getInGameOnlySkill( address ) )
            setWalletSkillBalance( await getWalletSkill( address ) )
            setAccountWeapons( await getAccountWeapons( address ) )
            setAccountShields( await getAccountShields( address ) )
            setAccountCharacters( await getAccountCharacters( address ) )
        }

        fetchData()
    }, [])

    return(
        <React.Fragment>
            <Balances 
                bnbBalance={ bnbBalance }
                stakedSkillBalance={ stakedSkillBalance } 
                unclaimedSkillBalance={ unclaimedSkillBalance }
                inGameSkillBalance={ inGameSkillBalance }
                walletSkillBalance={ walletSkillBalance }
            />
            <div style={{paddingTop: 50}}></div>
            <Tabs defaultActiveKey="Characters" id="tab-bar" className="mb-3">
                <Tab eventKey="Characters" title="Characters">
                    <Characters accountCharacters={ accountCharacters } />
                </Tab>
                <Tab eventKey="Weapons" title="Swords">
                    <Weapons accountWeapons={ accountWeapons } />
                </Tab>
                <Tab eventKey="Shields" title="Shields">
                    <Shields accountShields={ accountShields} />
                </Tab>
            </Tabs>
        </React.Fragment>
    )

}