import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Image from 'next/image';

interface MarkdownProps {
	content?: string | null;
}

export default function MarkdownContent({ content }: MarkdownProps) {
	return (
		<ReactMarkdown
			className={`lg:p-4`}
			remarkPlugins={[remarkGfm]}
			rehypePlugins={[rehypeHighlight]}
			components={{
				h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-4" {...props} />,
				h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mb-3" {...props} />,
				h3: ({ node, ...props }) => <h3 className="text-xl font-bold mb-2" {...props} />,
				h4: ({ node, ...props }) => <h4 className="text-lg font-bold mb-2" {...props} />,
				p: ({ node, ...props }) => <p className="mb-4" {...props} />,
				ul: ({ node, ...props }) => <ul className="list-disc ml-6 mb-4" {...props} />,
				ol: ({ node, ...props }) => <ol className="list-decimal ml-6 mb-4" {...props} />,
				li: ({ node, ...props }) => <li className="mb-1" {...props} />,
				code: ({ node, ...props }) => <code className="bg-cyan-100 rounded px-1" {...props} />,
				pre: ({ node, ...props }) => <pre className="bg-cyan-100 p-4 rounded-xl mb-4 overflow-x-auto" {...props} />,
				img: ({ node, ...props }) => (
					<div className="flex justify-center w-full max-md:my-2 md:my-8">
						<Image
							src={props?.src?.split('../public').join('') || ''}
							alt={props.alt || ''}
							width={1920}
							height={1080}
							className="rounded-xl w-full"
						/>
					</div>
				),
			}}
		>
			{content ?? ''}
		</ReactMarkdown>
	);
}
