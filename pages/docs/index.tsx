'use client';

import * as fs from 'fs';
import * as path from 'path';

import AppPage from '@components/AppPage';
import AppTitle from '@components/AppTitle';
import { useRouter as useNavigation } from 'next/navigation';
import { useRouter } from 'next/router';
import AppCard from '@components/AppCard';
import AppBox from '@components/AppBox';

interface DocsPageProps {
	dirExists: boolean;
	dirContent: string[];
}

export default function DocsPage({ dirExists, dirContent }: DocsPageProps) {
	return (
		<AppPage>
			<AppTitle title="Select a Docs Document">
				<div className="text-text-secondary">
					This page shows available documentation files in the `docs` directory. Choose any markdown file to view its formatted
					contents in read-only mode.
				</div>
			</AppTitle>

			{dirExists && dirContent ? (
				dirContent.map((file) => <DocsFile key={file} filename={file} />)
			) : (
				<AppCard>
					<div className="text-text-secondary">Directory for `docs` does not exist.</div>
				</AppCard>
			)}
		</AppPage>
	);
}

interface DocsFileProps {
	filename: string;
}

export function DocsFile({ filename }: DocsFileProps) {
	const router = useRouter();
	const navigate = useNavigation();

	return (
		<div onClick={() => navigate.push('/docs/' + filename)}>
			<AppBox className="cursor-pointer hover:bg-button-hover">{filename.split('_').join(' ')}</AppBox>
		</div>
	);
}

export async function getServerSideProps(context: { query: { [key: string]: string } }) {
	const props: DocsPageProps = {
		dirExists: false,
		dirContent: [],
	};

	const docsPath = path.join(process.cwd(), 'docs');

	try {
		if (fs.existsSync(docsPath)) {
			props.dirExists = true;

			const list = fs.readdirSync(docsPath, { recursive: false, withFileTypes: true });
			props.dirContent = list.filter((d) => d.isFile() && d.name.slice(-2) == 'md').map((d) => d.name.slice(0, -3));
		}
	} catch (error) {
		return {
			error,
		};
	}

	return { props };
}
