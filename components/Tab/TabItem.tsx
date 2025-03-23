import React, { Dispatch, SetStateAction } from 'react';

interface Props {
	label: string;
	tab: string;
	setTab: Dispatch<SetStateAction<string>>;
}

export default function TabItem({ tab, label, setTab }: Props) {
	const isSelected = tab == label;

	return (
		<div
			className={`cursor-pointer rounded-2xl p-2 px-4 min-w-[8rem] md:min-w-[12rem] md:hover:bg-button-hover ${
				isSelected && 'bg-card-content-primary font-semibold'
			}`}
			onClick={() => setTab(label)}
		>
			{label}
		</div>
	);
}
