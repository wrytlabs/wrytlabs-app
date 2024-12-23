import LoadingSpin from './LoadingSpin';

interface Props {
	size?: 'sm' | 'md';
	className?: string;
	isLoading?: boolean;
	disabled?: boolean;
	onClick?: (e: any) => void;
	children?: React.ReactNode;
	error?: string;
	width?: string;
}

export default function Button({ size = 'md', width, className, onClick, isLoading, children, disabled, error }: Props) {
	const sizeClass = size == 'sm' ? 'text-sm px-2 py-1 md:px-3 md:py-1' : 'px-2 py-2';

	return (
		<>
			{error && <div className="mb-2 px-1 text-text-warning text-center">{error}</div>}
			<button
				className={`btn rounded-xl ${className} ${sizeClass} ${
					disabled || isLoading
						? 'cursor-not-allowed bg-button-disabled text-button-textdisabled'
						: 'bg-button-default text-white'
				} ${width ?? 'w-full'} hover:bg-button-hover`}
				onClick={(e) => !disabled && !isLoading && onClick?.(e)}
			>
				{isLoading && (
					<a className="mr-2">
						<LoadingSpin />
					</a>
				)}
				{children}
			</button>
		</>
	);
}
