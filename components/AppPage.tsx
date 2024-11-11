interface Props {
	children?: React.ReactNode;
	className?: string;
}

export default function AppPage({ className, children }: Props) {
	return <div className={className ?? 'grid gap-5 max-md:gap-8'}>{children}</div>;
}
