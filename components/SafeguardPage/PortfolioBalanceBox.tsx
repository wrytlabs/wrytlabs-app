import AppBox from '@components/AppBox';
import { formatCurrency, FormatType } from '@utils';
import TokenLogo from '@components/TokenLogo';

export interface PortfolioBalanceBoxProps {
	currency: string;
	amount?: number;
	value?: number;
}

export function PortfolioBalanceBox({ currency, amount, value }: PortfolioBalanceBoxProps) {
	return (
		<AppBox>
			<div className="flex flex-row gap-4">
				<div className="flex items-center">
					<TokenLogo currency={currency} />
				</div>

				<div className="flex-1 font-semibold">
					<div className="flex justify-end">{formatCurrency(amount ?? 0, 4, 4, FormatType.us)}</div>
					<div className="flex justify-end">{formatCurrency(value ?? 0, 4, 4, FormatType.us)}</div>
				</div>

				<div className="flex flex-col w-12">
					<div className="flex">{currency.toUpperCase()}</div>
					<div className="flex">USD</div>
				</div>
			</div>
		</AppBox>
	);
}
