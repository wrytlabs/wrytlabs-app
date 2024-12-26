interface Props {
	children?: React.ReactNode;
	className?: string;
}

export default function AppBox({ children, className }: Props) {
	return <section className={`bg-card-content-primary rounded-xl px-6 py-4 ${className ?? ''}`}>{children}</section>;
}
