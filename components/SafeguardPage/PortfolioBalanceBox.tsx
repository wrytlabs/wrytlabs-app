import AppBox from '@components/AppBox';
import { formatCurrency, FormatType } from '@utils';
import TokenLogo from '@components/TokenLogo';

export interface PortfolioBalanceBoxProps {
	currency: string;
	amount?: number;
	value?: number;
	deposit?: number;
	withdrawal?: number;
	sent?: number;
	received?: number;
}

export function PortfolioBalanceBox({ currency, amount, value, deposit, withdrawal, sent, received }: PortfolioBalanceBoxProps) {
	return (
		<div>
			<AppBox>
				<div className="flex flex-row gap-2">
					<div className="flex items-center">
						<TokenLogo currency={currency} />
					</div>

					<div className="flex-1 font-semibold">
						<div className="flex justify-end">{formatCurrency(amount ?? 0, 2, 2, FormatType.us)}</div>
						<div className="flex justify-end">{formatCurrency(value ?? 0, 2, 2, FormatType.us)}</div>
					</div>

					<div className="flex flex-col w-12">
						<div className="flex">{currency.toUpperCase()}</div>
						<div className="flex">USD</div>
					</div>
				</div>
			</AppBox>

			<div className="flex flex-row gap-2 my-4 px-6">
				<div className="flex flex-col">
					<div className="flex justify-start">Deposit</div>
					<div className="flex justify-start">Withdrawal</div>
					<div className="flex justify-start">Sent</div>
					<div className="flex justify-start">Received</div>
				</div>

				<div className="flex-1">
					<div className="flex justify-end">{formatCurrency(deposit ?? 0, 2, 2, FormatType.us)}</div>
					<div className="flex justify-end">{formatCurrency(withdrawal ?? 0, 2, 2, FormatType.us)}</div>
					<div className="flex justify-end">{formatCurrency(sent ?? 0, 2, 2, FormatType.us)}</div>
					<div className="flex justify-end">{formatCurrency(received ?? 0, 2, 2, FormatType.us)}</div>
				</div>

				<div className="flex flex-col w-12">
					<div className="flex">{currency.toUpperCase()}</div>
					<div className="flex">{currency.toUpperCase()}</div>
					<div className="flex">{currency.toUpperCase()}</div>
					<div className="flex">{currency.toUpperCase()}</div>
				</div>
			</div>
		</div>
	);
}
