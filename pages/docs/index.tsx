'use client';

import * as fs from 'fs';
import * as path from 'path';

import AppPage from '@components/AppPage';
import AppTitle from '@components/AppTitle';
import { useRouter as useNavigation } from 'next/navigation';
import AppCard from '@components/AppCard';
import AppBox from '@components/AppBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

interface DocsPageProps {
	dirExists: boolean;
	dirContent: string[];
}

export default function DocsPage({ dirExists, dirContent }: DocsPageProps) {
	return (
		<AppPage>
			<AppTitle title="Documentation Library">
				<div className="text-text-secondary">
					Welcome to our documentation library. Browse through our collection of guides, tutorials, and reference materials.
					Select any document to view its contents.
				</div>
			</AppTitle>

			{dirExists && dirContent ? (
				dirContent.map((file) => <DocsFile key={file} filename={file} />)
			) : (
				<AppCard>
					<div className="text-text-secondary">Documentation library is currently unavailable.</div>
				</AppCard>
			)}
		</AppPage>
	);
}

interface DocsFileProps {
	filename: string;
}

export function DocsFile({ filename }: DocsFileProps) {
	const navigate = useNavigation();
	const name = filename.split('_').slice(1).join(' ');

	return (
		<div onClick={() => navigate.push('/docs/' + filename)}>
			<AppBox className="cursor-pointer hover:bg-button-hover">
				<FontAwesomeIcon icon={faFile} className="mr-4" />
				<a>{name}</a>
			</AppBox>
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
