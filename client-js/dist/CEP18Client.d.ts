import { BigNumber, type BigNumberish } from '@ethersproject/bignumber';
import { type CLKeyParameters, type CLPublicKey, DeployUtil, GetDeployResult, type Keys } from 'casper-js-sdk';
import TypedContract from './TypedContract';
import { ApproveArgs, BurnArgs, ChangeSecurityArgs, EVENTS_MODE, InstallArgs, MintArgs, TransferArgs, TransferFromArgs } from './types';
export default class CEP18Client extends TypedContract {
    nodeAddress: string;
    networkName: string;
    constructor(nodeAddress: string, networkName: string);
    setContractHash(contractHash: `hash-${string}`, contractPackageHash?: `hash-${string}`): void;
    get contractHash(): `hash-${string}`;
    get contractPackageHash(): `hash-${string}`;
    install(wasm: Uint8Array, args: InstallArgs, paymentAmount: BigNumberish, sender: CLPublicKey, networkName?: string, signingKeys?: Keys.AsymmetricKey[]): DeployUtil.Deploy;
    transfer(args: TransferArgs, paymentAmount: BigNumberish, sender: CLPublicKey, networkName?: string, signingKeys?: Keys.AsymmetricKey[]): DeployUtil.Deploy;
    transferFrom(args: TransferFromArgs, paymentAmount: BigNumberish, sender: CLPublicKey, networkName?: string, signingKeys?: Keys.AsymmetricKey[]): DeployUtil.Deploy;
    approve(args: ApproveArgs, paymentAmount: BigNumberish, sender: CLPublicKey, networkName?: string, signingKeys?: Keys.AsymmetricKey[]): DeployUtil.Deploy;
    increaseAllowance(args: ApproveArgs, paymentAmount: BigNumberish, sender: CLPublicKey, networkName?: string, signingKeys?: Keys.AsymmetricKey[]): DeployUtil.Deploy;
    decreaseAllowance(args: ApproveArgs, paymentAmount: BigNumberish, sender: CLPublicKey, networkName?: string, signingKeys?: Keys.AsymmetricKey[]): DeployUtil.Deploy;
    mint(args: MintArgs, paymentAmount: BigNumberish, sender: CLPublicKey, networkName?: string, signingKeys?: Keys.AsymmetricKey[]): DeployUtil.Deploy;
    burn(args: BurnArgs, paymentAmount: BigNumberish, sender: CLPublicKey, networkName?: string, signingKeys?: Keys.AsymmetricKey[]): DeployUtil.Deploy;
    changeSecurity(args: ChangeSecurityArgs, paymentAmount: BigNumberish, sender: CLPublicKey, networkName?: string, signingKeys?: Keys.AsymmetricKey[]): DeployUtil.Deploy;
    balanceOf(account: CLKeyParameters): Promise<BigNumber>;
    allowances(owner: CLKeyParameters, spender: CLKeyParameters): Promise<BigNumber>;
    name(): Promise<string>;
    symbol(): Promise<string>;
    decimals(): Promise<BigNumber>;
    totalSupply(): Promise<BigNumber>;
    eventsMode(): Promise<keyof typeof EVENTS_MODE>;
    parseDeployResult(deployHash: string): Promise<GetDeployResult>;
}
