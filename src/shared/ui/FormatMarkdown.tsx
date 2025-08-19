'use client';

export default function FormatMarkdown({ markdown }: { markdown: string }) {
  const splitMarkdown = markdown.split('\n');

  return splitMarkdown.map((line, idx) => {
    const trimmed = line.trim();

    switch (true) {
      case trimmed.startsWith('**'):
        return (
          <h4 key={idx} className="text-secondary mt-1">
            <strong>{trimmed.replace(/\*\*/g, '')}</strong>
          </h4>
        );
      case trimmed.startsWith('##'): // DetailProblem.tsx의 문제설명
        return (
          <h2 key={idx} className="text-lg font-semibold mt-3 text-secondary">
            {trimmed.replace(/^#+\s*/, '')}
          </h2>
        );
      default:
        return <p key={idx}>{trimmed}</p>;
    }
  });
}
