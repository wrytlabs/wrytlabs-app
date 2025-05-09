import { Address } from 'viem';

// --------------------------------------------------------------------------------
export type MorphoScaleState = {
	loaded: {
		factory: boolean;
		loan: boolean;
		collateral: boolean;
		execute: boolean;
	};

	factory: LeverageMorphoInstance[];
	loan: LeverageMorphoLoanFlatRaw[];
	collateral: LeverageMorphoCollateralFlatRaw[];
	execute: LeverageMorphoExecuteFlatRaw[];
};

// --------------------------------------------------------------------------------

export type LeverageMorphoInstanceRaw = {
	address: Address;
	createdAt: number;
	creator: Address;
	txHash: string;
	owner: Address;
	marketId: string;
	loan: Address;
	loanDecimals: number;
	loanName: string;
	loanSymbol: string;
	collateral: Address;
	collateralDecimals: number;
	collateralName: string;
	collateralSymbol: string;
	oracle: Address;
	irm: Address;
	lltv: bigint;
};

export type LeverageMorphoLoanFlatRaw = {
	id: string;
	count: bigint;
	address: Address;
	createdAt: number;
	txHash: string;
	amount: bigint;
	direction: boolean;
	oracle: bigint;
};

export type LeverageMorphoCollateralFlatRaw = {
	id: string;
	count: bigint;
	address: Address;
	createdAt: number;
	txHash: string;
	amount: bigint;
	direction: boolean;
	oracle: bigint;
};

export type LeverageMorphoExecuteFlatRaw = {
	id: string;
	count: bigint;
	address: Address;
	createdAt: number;
	txHash: string;
	opcode: number;
	inputLoan: bigint;
	inputCollateral: bigint;
	flash: bigint;
	swapIn: bigint;
	swapOut: bigint;
	provided: bigint;
	price: bigint;
};

// --------------------------------------------------------------------------------

export type LeverageMorphoInstance = LeverageMorphoInstanceRaw & {
	position: Position;
	market: Market;
	collateralValue: bigint;
	loanValue: bigint;
	equityValue: bigint;
	price: bigint;
	ltv: bigint;
};

export type Market = {
	totalSupplyAssets: bigint;
	totalSupplyShares: bigint;
	totalBorrowAssets: bigint;
	totalBorrowShares: bigint;
	lastUpdate: bigint;
	fee: bigint;
};

export type Position = {
	supplyShares: bigint;
	borrowShares: bigint;
	collateral: bigint;
};

// --------------------------------------------------------------------------------
export type DispatchLoaded = {
	type: string;
	payload: [keyof MorphoScaleState['loaded'], boolean];
};

export type DispatchInstanceArray = {
	type: string;
	payload: LeverageMorphoInstance[];
};

export type DispatchLoanArray = {
	type: string;
	payload: LeverageMorphoLoanFlatRaw[];
};

export type DispatchCollateralArray = {
	type: string;
	payload: LeverageMorphoCollateralFlatRaw[];
};

export type DispatchExecuteArray = {
	type: string;
	payload: LeverageMorphoExecuteFlatRaw[];
};
