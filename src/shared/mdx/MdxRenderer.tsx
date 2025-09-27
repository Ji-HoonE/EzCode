'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = { source: string };

export default function MarkdownRenderer({ source }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ ...props }) => (
          <h2 className="text-xl font-semibold mt-3 text-secondary" {...props} />
        ),
        h3: ({ ...props }) => (
          <h3 className="text-md font-semibold text-secondary mt-3" {...props} />
        ),
        strong: ({ ...props }) => <strong className="font-bold text-md" {...props} />,
        li: ({ ...props }) => (
          <li style={{ listStyleType: 'disc', listStylePosition: 'inside' }} {...props} />
        ),
      }}
    >
      {source}
    </ReactMarkdown>
  );
}
