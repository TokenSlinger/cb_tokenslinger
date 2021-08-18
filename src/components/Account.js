import React from "react";
import { Container, Row, Col, Badge, Tab, Tabs, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { 
    getBnbBalance, 
    getUnclaimedSkill, 
    getInGameOnlySkill, 
    getWalletSkill, 
    getStakedSkill, 
    getAccountWeapons, 
    getAccountShields, 
    getAccountCharacters,
    getCharacterStamina,
    getCharacterData,
    getWeaponData,
    getShieldData,
    getUnclaimedXp,
 } from "../utils/blockchain";
 import { elementTable, experienceTable } from "../utils/constants";

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

function Character({ id }) {
    const [ stamina, setStamina ] = React.useState("Loading")
    const [ level, setLevel ] = React.useState("Loading")
    const [ element, setElement ] = React.useState("Loading")
    const [ xpProgress, setXpProgress ] = React.useState("Loading")
    const [ unclaimedXp, setUnclaimedXp ] = React.useState("Loading")
    const [ staminaTimeStamp, setStaminaTimeStamp ] = React.useState("Loading")

    React.useEffect(() => {
        async function fetchData() {
            setStamina( await getCharacterStamina( id ) )
            const charData = await getCharacterData( id )
            setXpProgress(charData[0])
            setLevel(parseInt(charData[1], 10))
            setElement(elementTable[charData[2]])
            setUnclaimedXp( await getUnclaimedXp( id ) )
        }

        fetchData()
    }, [id])

    return (
        <tr>
            <td>
                { id }
            </td>
            <td>
                { element }
            </td>
            <td>
                { level+1 }
            </td>
            <td>
                { xpProgress }/{experienceTable[level]}
            </td>
            <td>
                { unclaimedXp }
            </td>
            <td>
                { stamina }/200
            </td>
        </tr>
    )
}

function Characters({ accountCharacters }) {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Element</th>
                                <th>Level</th>
                                <th>XP</th>
                                <th>Unclaimed XP</th>
                                <th>Stamina</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accountCharacters.map(c => <Character key={ c } id={ c } />)}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

function Weapon({ id }) {
    const [ weaponData, setWeaponData ] = React.useState(null)

    React.useEffect(() => {
        async function fetchData() {
            setWeaponData( await getWeaponData( id ))
        }

        fetchData()
    }, [ id ])

    if( weaponData ) {
        return(
            <tr>
                <td>
                    { id }
                </td>
                <td>
                    { weaponData.stars }
                </td>
                <td>
                    { weaponData.element }
                </td>
                <td>
                    { `${weaponData.stat1}: ${weaponData.stat1Value}`}
                </td>
                <td>
                    { `${weaponData.stat2}: ${weaponData.stat2Value}`}
                </td>
                <td>
                    { `${weaponData.stat3}: ${weaponData.stat3Value}`}
                </td>
                <td>
                    { weaponData.lowStarBurnPoints }
                </td>
                <td>
                    { weaponData.fourStarBurnPoints }
                </td>
                <td>
                    { weaponData.fiveStarBurnPoints}
                </td>
                <td>
                    { weaponData.bonusPower }
                </td>
            </tr>
        )
    } else {
        return(
            <tr>
            <td>
                Loading
            </td>
            <td>
                Loading
            </td>
            <td>
                Loading
            </td>
            <td>
                Loading
            </td>
            <td>
                Loading
            </td>
            <td>
                Loading
            </td>
            <td>
                Loading
            </td>
            <td>
                Loading
            </td>
            <td>
                Loading
            </td>
            <td>
                Loading
            </td>
        </tr>
        )
    }


}

function Weapons({ accountWeapons }) {

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Stars</th>
                                <th>Element</th>
                                <th>Trait 1</th>
                                <th>Trait 2</th>
                                <th>Trait 3</th>
                                <th>LB</th>
                                <th>4B</th>
                                <th>5B</th>
                                <th>Bonus Power</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accountWeapons.map(w => <Weapon key={ w } id={ w } />)}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

function Shield({ id }) {
    const [ shieldData, setShieldData ] = React.useState(null)

    React.useEffect(() => {
        async function fetchData() {
            setShieldData( await getShieldData( id ))
        }

        fetchData()
    }, [ id ])

    if( shieldData ) {
        return(
            <tr>
                <td>
                    { id }
                </td>
                <td>
                    { shieldData.stars }
                </td>
                <td>
                    { shieldData.element }
                </td>
                <td>
                    { `${shieldData.stat1}: ${shieldData.stat1Value}`}
                </td>
                <td>
                    { `${shieldData.stat2}: ${shieldData.stat2Value}`}
                </td>
                <td>
                    { `${shieldData.stat3}: ${shieldData.stat3Value}`}
                </td>
            </tr>
        )
    }

    return (
        <tr>
            <td>
                Loading
            </td>
        </tr>
    )
}


function Shields({ accountShields }) {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Stars</th>
                                <th>Element</th>
                                <th>Trait 1</th>
                                <th>Trait 2</th>
                                <th>Trait 3</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accountShields.map(s => <Shield key={ s } id={ s } />)}
                        </tbody>
                    </Table>
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
    }, [ address ])

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