import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface MarkdownProps {
	content?: string | null;
}

export default function MarkdownContent({ content }: MarkdownProps) {
	return (
		<ReactMarkdown
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
				code: ({ node, ...props }) => <code className="bg-gray-100 rounded px-1" {...props} />,
				pre: ({ node, ...props }) => <pre className="bg-gray-100 p-4 rounded mb-4 overflow-x-auto" {...props} />,
			}}
		>
			{content ?? ''}
		</ReactMarkdown>
	);
}
