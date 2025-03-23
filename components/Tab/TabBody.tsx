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
			{isTitle ? (
				<AppTitle title={title} className="pt-0">
					{childrenAppTitle}
				</AppTitle>
			) : null}
			{children}
		</AppCard>
	);
}
