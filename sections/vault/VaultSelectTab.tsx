import TabBody from '@components/Tab/TabBody';
import TabItem from '@components/Tab/TabItem';
import TabRow from '@components/Tab/TabRow';
import { Dispatch, SetStateAction } from 'react';

export interface Props {
	title: string;

	actionTab: string;
	actionTabs: string[];
	setAction: Dispatch<SetStateAction<string>>;

	currencyTab: string;
	currencyTabs: string[];
	setCurrency: Dispatch<SetStateAction<string>>;
}

export default function VaultSelectTab({ title, actionTab, actionTabs, setAction, currencyTab, currencyTabs, setCurrency }: Props) {
	return (
		<TabBody title={title}>
			<TabRow>
				{actionTabs.length == 0 ? (
					<></>
				) : (
					actionTabs.map((t, idx) => <TabItem key={`VaultSelectTab_${t}_${idx}`} label={t} tab={actionTab} setTab={setAction} />)
				)}
			</TabRow>

			<TabRow>
				{currencyTabs.length == 0 ? (
					<></>
				) : (
					currencyTabs.map((i, idx) => (
						<TabItem key={`VaultSelectTab_${i}_${idx}`} label={i} tab={currencyTab} setTab={setCurrency} />
					))
				)}
			</TabRow>
		</TabBody>
	);
}
