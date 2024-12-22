interface Props {
	children?: React.ReactNode;
	className?: string;
}

export default function AppCard({ className, children }: Props) {
	return (
		<section className={`bg-card-body-primary shadow-lg rounded-xl flex flex-col p-6 gap-y-6 ${className ?? ''}`}>{children}</section>
	);
}
