'use client';

import * as fs from 'fs';
import * as path from 'path';

import AppPage from '@components/AppPage';
import AppTitle from '@components/AppTitle';
import { useRouter as useNavigation } from 'next/navigation';
import { useRouter } from 'next/router';
import AppCard from '@components/AppCard';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface MarkdownDocsProps {
	fileExists: boolean;
	fileName: string;
	fileContent: string | null;
}

export default function MarkdownDocsPage({ fileExists, fileName, fileContent }: MarkdownDocsProps) {
	const router = useRouter();
	const navigate = useNavigation();

	return (
		<AppPage>
			<AppTitle title="Load Markdown File">
				<div className="text-text-secondary">
					Confirm markdown file exists: <a className="font-semibold">{fileExists ? 'true' : 'false'}</a>
				</div>

				<div className="text-text-secondary">
					Confirm markdown file key: <a className="font-semibold">{fileName}</a>
				</div>
			</AppTitle>

			<AppCard>
				{fileExists ? (
					<ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
						{fileContent}
					</ReactMarkdown>
				) : (
					<div className="text-text-secondary">
						File with key: <a className="font-semibold">{fileName}</a> does not exist.
					</div>
				)}
			</AppCard>
		</AppPage>
	);
}

export async function getServerSideProps(context: { query: { [key: string]: string } }) {
	const props: MarkdownDocsProps = {
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
