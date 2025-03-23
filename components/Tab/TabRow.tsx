import React from 'react';

interface Props {
	children: React.ReactElement | React.ReactElement[];
}

export default function TabRow({ children }: Props) {
	return <div className={`flex flex-row text-center justify-between gap-4 overflow-x-scroll`}>{children}</div>;
}
