import AppBox from '@components/AppBox';
import { formatCurrency, FormatType } from '@utils';
import TokenLogo from '@components/TokenLogo';

export interface PortfolioBalanceBoxProps {
	additional_reserve: number;
	spot_reserve: number;
	available_withdrawal_funds: number;
	available_funds: number;
	initial_margin: number;
	maintenance_margin: number;
	equity: number;
	margin_balance: number;
	currency: string;
	balance: number;
}

export function PortfolioBalanceBox({ currency, balance, equity }: PortfolioBalanceBoxProps) {
	return (
		<AppBox>
			<div className="flex flex-row gap-4">
				<div className="flex items-center">
					<TokenLogo currency={currency} />
				</div>

				<div className="flex-1 font-semibold">
					<div className="flex justify-end">{formatCurrency(equity, 4, 4, FormatType.us)}</div>
					<div className="flex justify-end">{formatCurrency(equity, 4, 4, FormatType.us)}</div>
				</div>

				<div className="flex flex-col w-12">
					<div className="flex">{currency.toUpperCase()}</div>
					<div className="flex">USD</div>
				</div>
			</div>
		</AppBox>
	);
}
