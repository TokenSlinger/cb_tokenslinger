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

export const web3bsc = new Web3('https://bsc-dataseed1.defibit.io/')
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