'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = { source: string };

export default function MarkdownRenderer({ source }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ node, ...props }) => (
          <h2 className="text-xl font-semibold mt-3 text-secondary" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-md font-semibold text-secondary mt-3" {...props} />
        ),
        strong: ({ node, ...props }) => <strong className="font-bold text-md" {...props} />,
        li: ({ node, ...props }) => (
          <li className="ml-3" style={{ listStyleType: 'disc' }} {...props} />
        ),
      }}
    >
      {source}
    </ReactMarkdown>
  );
}
