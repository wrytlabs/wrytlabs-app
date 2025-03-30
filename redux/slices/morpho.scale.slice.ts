import { createSlice, Dispatch } from '@reduxjs/toolkit';
import {
	DispatchCollateralArray,
	DispatchExecuteArray,
	DispatchInstanceArray,
	DispatchLoaded,
	DispatchLoanArray,
	LeverageMorphoCollateralFlatRaw,
	LeverageMorphoExecuteFlatRaw,
	LeverageMorphoInstance,
	LeverageMorphoInstanceRaw,
	LeverageMorphoLoanFlatRaw,
	MorphoScaleState,
} from './morpho.scale.types';
import { CONFIG, PONDER_CLIENT, WAGMI_CONFIG } from '../../app.config';
import { gql } from '@apollo/client';
import { CONTRACT, MorphoABI, MorphoChainlinkOracleV2ABI } from '@utils';
import { readContract } from '@wagmi/core/actions';
import { Hash, parseUnits } from 'viem';

// --------------------------------------------------------------------------------

export const initialState: MorphoScaleState = {
	loaded: {
		factory: false,
		loan: false,
		collateral: false,
		execute: false,
	},

	factory: [],
	loan: [],
	collateral: [],
	execute: [],
};

// --------------------------------------------------------------------------------

export const slice = createSlice({
	name: 'morphoScale',
	initialState,
	reducers: {
		// RESET
		resetState(state) {
			state = initialState;
		},

		// SET LOADED
		setLoaded: (state, action: { payload: [keyof MorphoScaleState['loaded'], boolean] }) => {
			state.loaded[action.payload[0]] = action.payload[1];
		},

		// -------------------------------------
		// SET FACTORY
		setFactory: (state, action: { payload: LeverageMorphoInstance[] }) => {
			state.factory = action.payload;
			state.loaded.factory = true;
		},

		// -------------------------------------
		// SET LOAN
		setLoan: (state, action: { payload: LeverageMorphoLoanFlatRaw[] }) => {
			state.loan = action.payload;
			state.loaded.loan = true;
		},

		// -------------------------------------
		// SET Collateral
		setCollateral: (state, action: { payload: LeverageMorphoCollateralFlatRaw[] }) => {
			state.collateral = action.payload;
			state.loaded.collateral = true;
		},

		// -------------------------------------
		// SET execute
		setExecute: (state, action: { payload: LeverageMorphoExecuteFlatRaw[] }) => {
			state.execute = action.payload;
			state.loaded.execute = true;
		},
	},
});

export const reducer = slice.reducer;
export const actions = slice.actions;

// --------------------------------------------------------------------------------

export const fetchMorphoFactory = () => async (dispatch: Dispatch<DispatchInstanceArray>) => {
	CONFIG.verbose && console.log('Loading [REDUX]: Morpho: Scale - Factory');

	// ---------------------------------------------------------------
	// Fetch data and dispatch
	const fetcher = async () => {
		const { data } = await PONDER_CLIENT.query<{
			leverageMorphoFactorys: {
				items: LeverageMorphoInstanceRaw[];
			};
		}>({
			fetchPolicy: 'no-cache',
			query: gql`
				{
					leverageMorphoFactorys(orderBy: "createdAt", orderDirection: "DESC") {
						items {
							address
							createdAt
							marketId
							txHash
							owner
							marketId
							loan
							loanDecimals
							loanName
							loanSymbol
							collateral
							collateralDecimals
							collateralName
							collateralSymbol
							oracle
							irm
							lltv
						}
					}
				}
			`,
		});
		return data.leverageMorphoFactorys.items;
	};

	try {
		const fetchedInstances = await fetcher();
		const modInstances: LeverageMorphoInstance[] = [];

		for (const instance of fetchedInstances) {
			try {
				const [supplyShares, borrowShares, collateral] = await readContract(WAGMI_CONFIG, {
					address: CONTRACT.Morpho,
					abi: MorphoABI,
					functionName: 'position',
					args: [instance.marketId as Hash, instance.address],
				});

				const [totalSupplyAssets, totalSupplyShares, totalBorrowAssets, totalBorrowShares, lastUpdate, fee] = await readContract(
					WAGMI_CONFIG,
					{
						address: CONTRACT.Morpho,
						abi: MorphoABI,
						functionName: 'market',
						args: [instance.marketId as Hash],
					}
				);

				const oraclePrice = await readContract(WAGMI_CONFIG, {
					address: instance.oracle,
					abi: MorphoChainlinkOracleV2ABI,
					functionName: 'price',
				});

				const oracleScale = await readContract(WAGMI_CONFIG, {
					address: instance.oracle,
					abi: MorphoChainlinkOracleV2ABI,
					functionName: 'SCALE_FACTOR',
				});

				const price = (oraclePrice * parseUnits('1', 10)) / oracleScale;
				const loanValue = (borrowShares * totalBorrowAssets) / totalBorrowShares;
				const collateralValue = (collateral * price) / parseUnits('1', 18 + instance.collateralDecimals - instance.loanDecimals);
				const equityValue = collateralValue - loanValue;
				const ltv = collateralValue > 0 ? (loanValue * parseUnits('1', 18)) / collateralValue : 0n;

				// create modified instances
				modInstances.push({
					...instance,
					lltv: BigInt(instance.lltv), // overwrite with type
					position: {
						supplyShares,
						borrowShares,
						collateral,
					},
					market: {
						totalSupplyAssets,
						totalSupplyShares,
						totalBorrowAssets,
						totalBorrowShares,
						lastUpdate,
						fee,
					},
					loanValue,
					collateralValue,
					equityValue,
					price,
					ltv,
				});
			} catch (error) {
				console.log(error);
				continue;
			}
		}

		dispatch(slice.actions.setFactory(modInstances));
	} catch (error) {
		console.error(error);
	}
};

// --------------------------------------------------------------------------------

export const fetchMorphoLoan = () => async (dispatch: Dispatch<DispatchLoanArray>) => {
	CONFIG.verbose && console.log('Loading [REDUX]: Morpho: Scale - Loan');

	// ---------------------------------------------------------------
	// Fetch data and dispatch
	const fetcher = async () => {
		const { data } = await PONDER_CLIENT.query<{
			leverageMorphoLoanFlats: {
				items: LeverageMorphoLoanFlatRaw[];
			};
		}>({
			fetchPolicy: 'no-cache',
			query: gql`
				{
					leverageMorphoLoanFlats(orderBy: "count", orderDirection: "DESC") {
						items {
							id
							count
							address
							createdAt
							txHash
							amount
							direction
						}
					}
				}
			`,
		});
		return data.leverageMorphoLoanFlats.items;
	};

	try {
		const fetched = await fetcher();
		const mod: LeverageMorphoLoanFlatRaw[] = [];

		for (const item of fetched) {
			try {
				// push modified
				mod.push({
					...item,
				});
			} catch (error) {
				console.log(error);
				continue;
			}
		}

		dispatch(slice.actions.setLoan(mod));
	} catch (error) {
		console.error(error);
	}
};

// --------------------------------------------------------------------------------

export const fetchMorphoCollateral = () => async (dispatch: Dispatch<DispatchCollateralArray>) => {
	CONFIG.verbose && console.log('Loading [REDUX]: Morpho: Scale - Collateral');

	// ---------------------------------------------------------------
	// Fetch data and dispatch
	const fetcher = async () => {
		const { data } = await PONDER_CLIENT.query<{
			leverageMorphoCollateralFlats: {
				items: LeverageMorphoCollateralFlatRaw[];
			};
		}>({
			fetchPolicy: 'no-cache',
			query: gql`
				{
					leverageMorphoCollateralFlats(orderBy: "count", orderDirection: "DESC") {
						items {
							id
							count
							address
							createdAt
							txHash
							amount
							direction
						}
					}
				}
			`,
		});
		return data.leverageMorphoCollateralFlats.items;
	};

	try {
		const fetched = await fetcher();
		const mod: LeverageMorphoCollateralFlatRaw[] = [];

		for (const item of fetched) {
			try {
				// push modified
				mod.push({
					...item,
				});
			} catch (error) {
				console.log(error);
				continue;
			}
		}

		dispatch(slice.actions.setCollateral(mod));
	} catch (error) {
		console.error(error);
	}
};
// --------------------------------------------------------------------------------

export const fetchMorphoExecute = () => async (dispatch: Dispatch<DispatchExecuteArray>) => {
	CONFIG.verbose && console.log('Loading [REDUX]: Morpho: Scale - Execute');

	// ---------------------------------------------------------------
	// Fetch data and dispatch
	const fetcher = async () => {
		const { data } = await PONDER_CLIENT.query<{
			leverageMorphoExecuteFlats: {
				items: LeverageMorphoExecuteFlatRaw[];
			};
		}>({
			fetchPolicy: 'no-cache',
			query: gql`
				{
					leverageMorphoExecuteFlats(orderBy: "count", orderDirection: "DESC") {
						items {
							id
							count
							address
							createdAt
							txHash
							opcode
							inputLoan
							inputCollateral
							flash
							swapIn
							swapOut
							provided
							price
						}
					}
				}
			`,
		});
		return data.leverageMorphoExecuteFlats.items;
	};

	try {
		const fetched = await fetcher();
		const mod: LeverageMorphoExecuteFlatRaw[] = [];

		for (const item of fetched) {
			try {
				// push modified
				mod.push({
					...item,
				});
			} catch (error) {
				console.log(error);
				continue;
			}
		}

		dispatch(slice.actions.setExecute(mod));
	} catch (error) {
		console.error(error);
	}
};
