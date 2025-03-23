import TabBody from '@components/Tab/TabBody';
import TabItem from '@components/Tab/TabItem';
import React, { Dispatch, SetStateAction } from 'react';

interface Props {
	tabs: string[];
	tab: string;
	setTab: Dispatch<SetStateAction<string>>;
	title?: string;
	childrenAppTitle?: React.ReactElement[] | React.ReactElement;
}

export default function SelectTabs({ tabs, tab, setTab, title, childrenAppTitle }: Props) {
	return (
		<TabBody title={title} childrenAppTitle={childrenAppTitle}>
			{tabs.length == 0 ? <></> : tabs.map((t) => <TabItem key={`${t}_select_tabs`} label={t} tab={tab} setTab={setTab} />)}
		</TabBody>
	);
}
