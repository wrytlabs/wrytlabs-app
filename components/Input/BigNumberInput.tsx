import * as React from 'react';
import { formatUnits, parseUnits } from 'viem';

export type BigNumberInputProps = {
	inputRefChild?: React.RefObject<HTMLInputElement>;
	decimals?: number;
	value: string;
	onChange?: (value: string) => void;
	autoFocus?: boolean;
	placeholder?: string;
	max?: string;
	min?: string;
	className?: string;
	disabled?: boolean;
};

export function BigNumberInput({
	inputRefChild,
	decimals = 18,
	value,
	onChange,
	autoFocus,
	placeholder = '0.00',
	max,
	min,
	className,
	disabled,
}: BigNumberInputProps) {
	const inputRefFallback = React.useRef<HTMLInputElement>(null);
	const inputRef = inputRefChild || inputRefFallback;

	const [inputValue, setInputvalue] = React.useState('0');

	// update current value
	React.useEffect(() => {
		// If external value is empty, reset local input
		if (value.length === 0) {
			setInputvalue('0.00');
			return;
		}

		try {
			// Format external value
			const formatted = formatUnits(BigInt(value), decimals);

			// Only update if formatted value is not equal to user input
			// BUT allow intermediate states like "0.", "0.0", etc.
			// So skip update if user input starts with the same value
			if (parseUnits(inputValue || '0', decimals).toString() !== value && !inputValue.startsWith(formatted)) {
				setInputvalue(formatted);
			}
		} catch (e) {
			// silently ignore parse errors
		}
	}, [value, decimals, inputValue]);

	React.useEffect(() => {
		if (autoFocus && inputRef) {
			const node = inputRef.current as HTMLInputElement;
			node.focus();
		}
	}, [autoFocus, inputRef]);

	const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = event.currentTarget.value.trim();

		// Always update the input state
		setInputvalue(rawValue);

		// Don't try to parse unless it's a valid decimal number
		if (!/^\d*\.?\d*$/.test(rawValue)) {
			return;
		}

		// Don't parse empty or just a decimal point
		if (rawValue === '' || rawValue === '.' || rawValue === '0.') {
			onChange?.('0'); // Optional: send '0' or undefined or skip calling onChange
			return;
		}

		try {
			const newValue = parseUnits(rawValue, decimals);
			const isInvalid = (min && newValue < BigInt(min)) || (max && newValue > BigInt(max));
			if (!isInvalid) {
				onChange?.(newValue.toString());
			}
		} catch (e) {
			// Ignore parse errors for partial inputs
		}
	};

	const inputProps = {
		placeholder,
		onChange: updateValue,
		type: 'text',
		value: inputValue,
		className: 'truncate ' + className,
		autoFocus,
		disabled,
	};

	return (
		<div className="">
			<input {...inputProps} ref={inputRef} />
		</div>
	);
}
