import AppCard from '@components/AppCard';
import { LeverageMorphoInstance } from '../../../redux/slices/morpho.scale.types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/redux.store';
import AppTitle from '@components/AppTitle';
import TokenInput from '@components/Input/TokenInput';
import AppButton from '@components/AppButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import GuardToAllowedChainBtn from '@components/Input/GuardToAllowedChainBtn';

interface Props {
	instance: LeverageMorphoInstance;
}

export default function LeverageMorphoAdjustCollateral({ instance }: Props) {
	const { morphoScale } = useSelector((state: RootState) => state);
	const [direction, setDirection] = useState(false);

	return (
		<div className="grid md:grid-cols-2 max-md:grid-cols-1 gap-2">
			<AppCard>
				<AppTitle title="Adjust Collateral" />

				<TokenInput
					symbol={instance.collateralSymbol}
					label="Position"
					disabled={true}
					value={String(instance.position.collateral)}
					digit={instance.collateralDecimals}
				/>

				<div className="py-4 text-center z-0">
					<AppButton className={`h-10 rounded-full`} width="w-10">
						<FontAwesomeIcon
							icon={direction ? faArrowUp : faArrowDown}
							className="w-6 h-6"
							onClick={() => setDirection(!direction)}
						/>
					</AppButton>
				</div>

				<TokenInput
					symbol={instance.collateralSymbol}
					label={direction ? 'Deposit' : 'Withdraw'}
					// max={direction ? undefined : instance.position.collateral}
					reset={0n}
				/>

				<GuardToAllowedChainBtn>
					<AppButton onClick={() => {}}>{direction ? 'Deposit' : 'Withdraw'} Collateral</AppButton>
				</GuardToAllowedChainBtn>
			</AppCard>
		</div>
	);
}
