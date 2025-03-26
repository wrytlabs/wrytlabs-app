import { createSlice, Dispatch } from '@reduxjs/toolkit';
import {
	DispatchBoolean,
	DispatchInstanceArray,
	LeverageMorphoInstance,
	LeverageMorphoInstanceRaw,
	MorphoScaleState,
} from './morpho.scale.types';
import { CONFIG, PONDER_CLIENT, WAGMI_CONFIG } from '../../app.config';
import { gql } from '@apollo/client';
import { CONTRACT, MorphoABI, MorphoChainlinkOracleV2ABI } from '@utils';
import { readContract } from '@wagmi/core/actions';
import { Hash, parseUnits } from 'viem';

// --------------------------------------------------------------------------------

export const initialState: MorphoScaleState = {
	loaded: false,

	factory: [],
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
		setLoaded: (state, action: { payload: boolean }) => {
			state.loaded = action.payload;
		},

		// -------------------------------------
		// SET FACTORY
		setFactory: (state, action: { payload: LeverageMorphoInstance[] }) => {
			state.factory = action.payload;
		},
	},
});

export const reducer = slice.reducer;
export const actions = slice.actions;

// --------------------------------------------------------------------------------
export const fetchMorphoMarkets = () => async (dispatch: Dispatch<DispatchBoolean | DispatchInstanceArray>) => {
	CONFIG.verbose && console.log('Loading [REDUX]: Morpho: Scale');

	// ---------------------------------------------------------------
	// Fetch data and dispatch
	const fetcher = async () => {
		const { data } = await PONDER_CLIENT.query<{
			leverageMorphoFactorys: {
				items: LeverageMorphoInstanceRaw[];
			};
		}>({
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

	// ---------------------------------------------------------------
	// Finalizing, loaded set to true
	dispatch(slice.actions.setLoaded(true));
};
