import AppCard from '@components/AppCard';
import AppTitle from '@components/AppTitle';
import React from 'react';

interface Props {
	children: React.ReactElement[] | React.ReactElement;
	title?: string;
	childrenAppTitle?: React.ReactElement[] | React.ReactElement;
}

export default function TabBody({ children, title, childrenAppTitle }: Props) {
	const isTitle = title || childrenAppTitle;
	return (
		<AppCard className={`py-0 ${isTitle ? 'pb-4' : ''}`}>
			{isTitle ? <AppTitle title={title}>{childrenAppTitle}</AppTitle> : null}
			<div className={`flex flex-row py-2 text-center justify-between gap-4 overflow-x-scroll`}>{children}</div>
		</AppCard>
	);
}
