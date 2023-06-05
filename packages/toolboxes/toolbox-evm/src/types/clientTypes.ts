import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { BytesLike } from '@ethersproject/bytes';
import { ContractInterface } from '@ethersproject/contracts';
import {
  Address,
  AmountWithBaseDenom,
  EIP1559TxParams,
  FeeOption,
  Fees,
  Network,
  WalletTxParams,
} from '@thorswap-lib/types';

export enum EthNetwork {
  Test = 'goerli',
  Main = 'homestead',
}

export type ClientUrl = Record<Network, string>;
export type ExplorerUrl = Record<Network, string>;

export type TxOverrides = {
  nonce?: BigNumberish;

  // mandatory: https://github.com/ethers-io/ethers.js/issues/469#issuecomment-475926538
  gasLimit: BigNumberish;
  gasPrice?: BigNumberish;
  data?: BytesLike;
  value?: BigNumberish;

  // EIP-1559
  maxPriorityFeePerGas?: BigNumberish;
  maxFeePerGas?: BigNumberish;
};

export type GasPrices = Record<
  FeeOption,
  { maxFeePerGas: AmountWithBaseDenom; maxPriorityFeePerGas: AmountWithBaseDenom }
>;

export type FeesWithGasPricesAndLimits = {
  fees: Fees;
  gasPrices: GasPrices;
  gasLimit: BigNumber;
};

export type ApproveParams = {
  assetAddress: Address;
  spenderAddress: Address;
  feeOptionKey?: FeeOption;
  amount?: BigNumberish;
  from: string;
  // Optional fallback in case estimation for gas limit fails
  gasLimitFallback?: BigNumberish;
  nonce?: number;
};

export type EstimateApproveParams = Omit<ApproveParams, 'feeOptionKey' | 'gasLimitFallback'>;

export type ApprovedParams = {
  assetAddress: Address;
  spenderAddress: Address;
  from: string;
};

export type IsApprovedParams = ApprovedParams & {
  amount?: BigNumberish;
};

export type CallParams = {
  contractAddress: Address;
  abi: ContractInterface;
  funcName: string;
  funcParams?: unknown[];
};

export type EstimateCallParams = Pick<
  CallParams,
  'contractAddress' | 'abi' | 'funcName' | 'funcParams'
>;

export interface EVMChainClientParams {
  chainId: number;
  networkUrl: string;
}

export interface FeeData {
  maxFeePerGas: BigNumber;
  maxPriorityFeePerGas: BigNumber;
}

export type SendTransactionParams = {
  signer?: Signer;
  provider: Provider;
};

export type EthereumWindowProvider = import('@ethersproject/providers').ExternalProvider & {
  isMetaMask?: boolean;
  on: (event: string, callback?: () => void) => void;
  isBraveWallet?: boolean;
  isCoinbaseWallet?: boolean;
  overrideIsMetaMask?: boolean;
  selectedProvider?: EthereumWindowProvider;
  isTrust?: boolean;
  __XDEFI?: boolean;
};

declare global {
  interface Window {
    keplr: import('@keplr-wallet/types').Keplr;
    ethereum: EthereumWindowProvider;
    trustwallet: EthereumWindowProvider;
    coinbaseWalletExtension: EthereumWindowProvider;
    xfi?: {
      binance: any;
      bitcoin: any;
      bitcoincash: any;
      dogecoin: any;
      ethereum: EthereumWindowProvider;
      litecoin: any;
      thorchain: any;
    };
    braveSolana: any;
  }
}

export type TxFormatter<T> = (tx: EIP1559TxParams<BigNumberish>) => EIP1559TxParams<T>;

export type TransferParams = WalletTxParams & {
  gasLimit?: BigNumber;
  gasPrice?: BigNumber;
  maxFeePerGas?: BigNumber;
  maxPriorityFeePerGas?: BigNumber;
  data?: string;
  from: string;
  nonce?: number;
};