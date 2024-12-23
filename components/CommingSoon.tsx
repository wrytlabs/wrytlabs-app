import AppCard from '@components/AppCard';

interface CommingSoonProps {
	text?: string;
	className?: string;
}

export default function CommingSoon({ text, className }: CommingSoonProps) {
	return (
		<AppCard className={className}>
			<p>{text ?? 'This feature is still in planning or under development.'}</p>
		</AppCard>
	);
}
