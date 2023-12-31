import { type BigNumberish } from '@ethersproject/bignumber';
import { type CLKeyParameters } from 'casper-js-sdk';
export declare enum EVENTS_MODE {
    NoEvents = 0,
    CES = 1
}
export interface InstallArgs {
    name: string;
    symbol: string;
    decimals: BigNumberish;
    totalSupply: BigNumberish;
    eventsMode?: EVENTS_MODE;
}
export interface TransferableArgs {
    amount: BigNumberish;
}
export interface TransferArgs extends TransferableArgs {
    recipient: CLKeyParameters;
}
export interface TransferFromArgs extends TransferArgs {
    owner: CLKeyParameters;
}
export interface ApproveArgs extends TransferableArgs {
    spender: CLKeyParameters;
}
export interface MintArgs extends TransferableArgs {
    owner: CLKeyParameters;
}
export interface BurnArgs extends TransferableArgs {
    owner: CLKeyParameters;
}
export interface ChangeSecurityArgs {
    adminList?: CLKeyParameters[];
    minterList?: CLKeyParameters[];
    burnerList?: CLKeyParameters[];
    mintAndBurnList?: CLKeyParameters[];
    noneList?: CLKeyParameters[];
}
