import JSBI from 'jsbi';
import Web3 from 'web3';

import {CryptoBlades} from '../assets/abis/CryptoBlades'
import {Characters} from '../assets/abis/Characters'
import {Weapons} from '../assets/abis/Weapons'
import {BasicOraclePrice} from '../assets/abis/BasicOraclePrice'
import {Shields} from '../assets/abis/Shields'
import {NFTMarket} from '../assets/abis/NFTMarket'
import { ERC20 } from '../assets/abis/ERC20';
import { StakingRewards } from '../assets/abis/StakingRewards'

export const web3bsc = new Web3('https://bsc-dataseed1.binance.org:443')
// export const webmm = new Web3(window.ethereum)

const cryptoBladesAddress = '0x39Bea96e13453Ed52A734B6ACEeD4c41F57B2271';
const charAddress = '0xc6f252c2cdd4087e30608a35c022ce490b58179b';
const weapAddress = '0x7e091b0a220356b157131c831258a9c98ac8031a';
const oracleAddress = '0x1cbfa0ec28da66896946474b2a93856eb725fbba';
const defaultAddress = '0x0000000000000000000000000000000000000000';
const skillAddress = '0x154a9f9cbd3449ad22fdae23044319d6ef2a1fab'
const shieldAddress = '0xf9e9f6019631bbe7db1b71ec4262778eb6c3c520'
const stakingRewardAddress = '0xd6b2D8f59Bf30cfE7009fB4fC00a7b13Ca836A2c';

const conCryptoBlades = new web3bsc.eth.Contract(CryptoBlades, cryptoBladesAddress);
const conCharacters = new web3bsc.eth.Contract(Characters, charAddress);
const conWeapons = new web3bsc.eth.Contract(Weapons, weapAddress);
const conOracle = new web3bsc.eth.Contract(BasicOraclePrice, oracleAddress);
const conSkill = new web3bsc.eth.Contract(ERC20, skillAddress)
const conShield = new web3bsc.eth.Contract(Shields, shieldAddress)
const conStakingReward = new web3bsc.eth.Contract(StakingRewards, stakingRewardAddress);

// BALANCES
export const getBnbBalance = async ( walletAddress ) => {
    const bnbBalance = await web3bsc.eth.getBalance(walletAddress);
    const converted = web3bsc.utils.fromWei(JSBI.BigInt(bnbBalance).toString(), 'ether')
    return parseFloat(converted)
}

export const getUnclaimedSkill = async ( walletAddress ) => {
    const unclaimedSkill = await conCryptoBlades.methods.getTokenRewards().call({ from: walletAddress });
    const converted = web3bsc.utils.fromWei(JSBI.BigInt(unclaimedSkill).toString(), 'ether')
    return parseFloat(converted)
}

export const getInGameOnlySkill = async ( walletAddress ) => {
    const inGameOnlySkill = await conCryptoBlades.methods.inGameOnlyFunds(walletAddress).call({ from: walletAddress });
    const converted = web3bsc.utils.fromWei(JSBI.BigInt(inGameOnlySkill).toString(), 'ether')
    return parseFloat(converted)
}

export const getWalletSkill = async ( walletAddress ) => {
    const skill = await conSkill.methods.balanceOf( walletAddress ).call()
    const converted = web3bsc.utils.fromWei(JSBI.BigInt(skill).toString(), 'ether')
    return parseFloat(converted)
}

export const getStakedSkill = async ( walletAddress ) => {
    const skill = await conStakingReward.methods.balanceOf(walletAddress).call({ from: defaultAddress });
    const converted = web3bsc.utils.fromWei(JSBI.BigInt(skill).toString(), 'ether')
    return parseFloat(converted)
}

// ASSETS
export const getAccountCharacters = async ( walletAddress ) => {
    const characters = await conCryptoBlades.methods.getMyCharacters().call({ from: walletAddress });
    return characters
}

export const getAccountWeapons = async ( walletAddress ) => {
    const weapons = await conCryptoBlades.methods.getMyWeapons().call({ from: walletAddress });
    return weapons
}

export const getAccountShields = async ( walletAddress ) => {
    const shields = await conShield.methods.getOwned().call({ from: walletAddress });
    return shields
}

// CHARACTERS
export const getCharacterStamina = async( id ) => {
    const stamina = await conCharacters.methods.getStaminaPoints(`${id}`).call({ from: defaultAddress})
    return stamina
}

export const getCharacterData = async( id ) => {
    const data = await conCharacters.methods.get(`${id}`).call({ from: defaultAddress });
    return data
}

// WEAPONS
const WeaponElement = {
    Fire: 0,
    Earth: 1,
    Lightning: 2,
    Water: 3,
};

const WeaponTrait = {
    STR: 0,
    DEX: 1,
    CHA: 2,
    INT: 3,
    PWR: 4,
};

function getStatPatternFromProperties(properties) {
    return (properties >> 5) & 0x7f;
}

function getStat1Trait(statPattern) {
    return (statPattern % 5);
}

function getStat2Trait(statPattern) {
    return (Math.floor(statPattern / 5) % 5);
}

function getStat3Trait(statPattern) {
    return (Math.floor(Math.floor(statPattern / 5) / 5) % 5);
}

function getWeaponTraitFromProperties(properties) {
    return (properties >> 3) & 0x3;
}

function statNumberToName(statNum) {
    switch (statNum) {
        case WeaponTrait.CHA: return 'CHA';
        case WeaponTrait.DEX: return 'DEX';
        case WeaponTrait.INT: return 'INT';
        case WeaponTrait.PWR: return 'PWR';
        case WeaponTrait.STR: return 'STR';
        default: return '???';
    }
}

function traitNumberToName(traitNum) {
    switch (traitNum) {
        case WeaponElement.Fire: return 'Fire';
        case WeaponElement.Earth: return 'Earth';
        case WeaponElement.Water: return 'Water';
        case WeaponElement.Lightning: return 'Lightning';
        default: return '???';
    }
}

export const getWeaponData = async( id ) => {
    const data = await conWeapons.methods.get(`${id}`).call({ from: defaultAddress })

    const properties = data[0];
    const stat1 = data[1];
    const stat2 = data[2];
    const stat3 = data[3];
    const level = +data[4];
    const blade = data[5];
    const crossguard = data[6];
    const grip = data[7];
    const pommel = data[8];
    const burnPoints = +data[9];
    const bonusPower = +data[10];

    const stat1Value = +stat1;
    const stat2Value = +stat2;
    const stat3Value = +stat3;

    const statPattern = getStatPatternFromProperties(+properties);
    const stat1Type = getStat1Trait(statPattern);
    const stat2Type = getStat2Trait(statPattern);
    const stat3Type = getStat3Trait(statPattern);

    const traitNum = getWeaponTraitFromProperties(+properties);

    const lowStarBurnPoints = burnPoints & 0xff;
    const fourStarBurnPoints = (burnPoints >> 8) & 0xff;
    const fiveStarBurnPoints = (burnPoints >> 16) & 0xff;

    const stars = (+properties) & 0x7;

    return {
        id: +id,
        properties,
        trait: traitNum,
        element: traitNumberToName(traitNum),
        stat1: statNumberToName(stat1Type),
        stat1Value,
        stat1Type,
        stat2: statNumberToName(stat2Type),
        stat2Value,
        stat2Type,
        stat3: statNumberToName(stat3Type),
        stat3Value,
        stat3Type,
        level,
        blade,
        crossguard,
        grip,
        pommel,
        stars: stars+1,
        lowStarBurnPoints,
        fourStarBurnPoints,
        fiveStarBurnPoints,
        bonusPower,
        traitNum
    };
}

// SHIELD
function getStarsFromProperties( properties ) {
    return (properties) & 0x7 // first two bits for stars
}

function getTraitFromProperties( properties ) {
    return (properties >> 3) & 0x3 // two bits after star bits (3)
}

export const getShieldData = async( id ) => {
    const data = await conShield.methods.get(`${id}`).call({ from: defaultAddress })

    const properties = data[0];
    const stat1 = data[1];
    const stat2 = data[2];
    const stat3 = data[3];

    const stat1Value = +stat1;
    const stat2Value = +stat2;
    const stat3Value = +stat3;

    const statPattern = getStatPatternFromProperties(+properties);
    const stat1Type = getStat1Trait(statPattern);
    const stat2Type = getStat2Trait(statPattern);
    const stat3Type = getStat3Trait(statPattern);

    const stars = getStarsFromProperties(+properties)

    const traitNum = getTraitFromProperties(+properties);
    return {
        id: +id,
        properties,
        trait: traitNum,
        element: traitNumberToName(traitNum),
        stat1: statNumberToName(stat1Type),
        stat1Value,
        stat1Type,
        stat2: statNumberToName(stat2Type),
        stat2Value,
        stat2Type,
        stat3: statNumberToName(stat3Type),
        stat3Value,
        stat3Type,
        stars: stars+1,
    }
}