import { Address } from 'viem';

// --------------------------------------------------------------------------------
export type MorphoScaleState = {
	loaded: boolean;

	factory: LeverageMorphoInstance[];
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
export type DispatchBoolean = {
	type: string;
	payload: Boolean;
};

export type DispatchInstanceArray = {
	type: string;
	payload: LeverageMorphoInstance[];
};
