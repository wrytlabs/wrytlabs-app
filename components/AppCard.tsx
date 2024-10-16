interface Props {
	children?: React.ReactNode;
	className?: string;
}

export default function AppCard({ className, children }: Props) {
	return (
		<section className={`bg-card-body-primary shadow-lg rounded-xl ${className ?? 'flex flex-col p-6 gap-y-6'}`}>{children}</section>
	);
}
