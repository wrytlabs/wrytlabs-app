'use client';

import * as fs from 'fs';
import * as path from 'path';

import AppPage from '@components/AppPage';
import AppTitle from '@components/AppTitle';
import AppCard from '@components/AppCard';
import MarkdownContent from '@components/MarkdownContent';

interface DocsMarkdownFileProps {
	fileExists: boolean;
	fileName: string;
	fileContent: string | null;
}

export default function DocsMarkdownFilePage({ fileExists, fileName, fileContent }: DocsMarkdownFileProps) {
	return (
		<AppPage>
			<AppTitle title="Load File from Docs">
				<div className="text-text-secondary">
					Confirm markdown file key: <a className="font-semibold">{fileName}</a>
				</div>
				<div className="text-text-secondary">
					Confirm markdown file exists: <a className="font-semibold">{fileExists ? 'true' : 'false'}</a>
				</div>
			</AppTitle>

			<AppCard>
				{fileExists ? (
					<MarkdownContent content={fileContent} />
				) : (
					<div className="text-text-secondary">
						File with key: <a className="font-semibold">{fileName}</a> does not exist in the docs directory.
					</div>
				)}
			</AppCard>
		</AppPage>
	);
}

export async function getServerSideProps(context: { query: { [key: string]: string } }) {
	const props: DocsMarkdownFileProps = {
		fileExists: false,
		fileName: context.query?.filename || '',
		fileContent: null,
	};

	const filePath = path.join(process.cwd(), 'docs', props.fileName + '.md');

	try {
		if (fs.existsSync(filePath)) {
			props.fileExists = true;
			props.fileContent = fs.readFileSync(filePath, 'utf-8') || '';
		}
	} catch (error) {
		return {
			error,
		};
	}

	return { props };
}
