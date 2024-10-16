import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

interface Props {
	currency: string;
	size?: number;
}

export default function TokenLogo({ currency, size = 36 }: Props) {
	const [isError, setError] = useState<boolean>(false);

	return isError ? (
		<FontAwesomeIcon icon={faCircleQuestion} className={`w-${size} h-${size}`} />
	) : (
		<picture>
			<Image
				className="rounded-xl"
				src={`/coins/${currency.toLowerCase()}.svg`}
				alt="Logo"
				width={size}
				height={size}
				onError={() => setError(true)}
			/>
		</picture>
	);
}
