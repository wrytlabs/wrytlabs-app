interface Props {
	children?: React.ReactNode;
	className?: string;
}

export default function AppBox({ children, className }: Props) {
	return <section className={`bg-card-content-primary rounded-xl ${className ?? 'px-6 py-4'}`}>{children}</section>;
}
