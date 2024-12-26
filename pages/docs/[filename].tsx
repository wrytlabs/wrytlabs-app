'use client';

import * as fs from 'fs';
import * as path from 'path';

import AppPage from '@components/AppPage';
import AppTitle from '@components/AppTitle';
import AppCard from '@components/AppCard';
import MarkdownContent from '@components/MarkdownContent';
import { useRouter as useNavigation } from 'next/navigation';
import AppButton from '@components/AppButton';
import Link from 'next/link';
import { SOCIAL } from '@utils';

interface DocsMarkdownFileProps {
	fileExists: boolean;
	fileName: string;
	fileContent: string | null;
}

export default function DocsMarkdownFilePage({ fileExists, fileName, fileContent }: DocsMarkdownFileProps) {
	const navigate = useNavigation();

	return (
		<AppPage>
			<AppTitle title="Documentation Viewer">
				<div className="grid md:grid-cols-2">
					<div>
						<div className="text-text-secondary">
							Current document: <a className="font-semibold">{fileName}</a>
						</div>
						<div className="text-text-secondary">
							Document status: <a className="font-semibold">{fileExists ? 'Ready' : 'Not found'}</a>
						</div>
					</div>

					<div className="flex flex-row gap-4 h-10 max-md:mt-4">
						<AppButton onClick={() => navigate.push('/docs')}>Browse Documents</AppButton>
						<AppButton>
							<Link href={SOCIAL.Github_app + `/tree/main/docs/${fileName}.md`} target="_blank">
								View Source
							</Link>
						</AppButton>
					</div>
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
