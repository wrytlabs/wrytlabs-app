import AppCard from '@components/AppCard';
import { LeverageMorphoInstance } from '../../redux/slices/morpho.scale.types';
import AppBox from '@components/AppBox';
import DisplayLabel from '@components/Display/DisplayLabel';
import DisplayOutputAlignedRight from '@components/Display/DisplayOutputAlignedRight';
import { formatCurrency, shortenAddress } from '@utils';
import AppLink from '@components/AppLink';
import { useContractUrl } from '../../hooks/useContractUrl';
import { formatUnits } from 'viem';

interface Props {
	instance: LeverageMorphoInstance;
}

export default function LeverageMorphDetails({ instance }: Props) {
	return (
		<AppCard>
			<div className={`grid md:grid-cols-4 max-md:grid-cols-1 gap-4`}>
				<AppBox>
					<DisplayLabel label="Equity Value" />
					<DisplayOutputAlignedRight
						amount={instance.collateralValue - instance.loanValue}
						digits={instance.loanDecimals} // shown in the loan unit
						unit={instance.loanSymbol} // shown in the loan unit
					/>
				</AppBox>

				<AppBox>
					<DisplayLabel label="Collateral Token" />
					<DisplayOutputAlignedRight output={instance.collateralName} />
				</AppBox>

				<AppBox>
					<DisplayLabel label="Loan Token" />
					<DisplayOutputAlignedRight output={instance.loanName} />
				</AppBox>

				<AppBox>
					<DisplayLabel label="Instance Address" />
					<AppLink label={shortenAddress(instance.address)} href={useContractUrl(instance.address)} external={true} />
				</AppBox>

				{/* 2nd */}

				<AppBox>
					<DisplayLabel label="LTV / LLTV" />
					<DisplayOutputAlignedRight
						output={`${formatCurrency(formatUnits(instance.ltv, 18 - 2))}% / ${formatUnits(instance.lltv, 18 - 2)}%`}
					/>
				</AppBox>

				<AppBox>
					<DisplayLabel label="Collateral Value" />
					<DisplayOutputAlignedRight
						amount={instance.collateralValue}
						digits={instance.loanDecimals} // shown in the loan unit
						unit={instance.loanSymbol} // shown in the loan unit
					/>
				</AppBox>

				<AppBox>
					<DisplayLabel label="Loan Value" />
					<DisplayOutputAlignedRight amount={instance.loanValue} digits={instance.loanDecimals} unit={instance.loanSymbol} />
				</AppBox>

				<AppBox>
					<DisplayLabel label="Profit" />
					<DisplayOutputAlignedRight amount={0n} digits={instance.loanDecimals} unit={instance.loanSymbol} />
				</AppBox>
			</div>
		</AppCard>
	);
}
