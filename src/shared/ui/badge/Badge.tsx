export const Badge = ({
  color,
  className,
  text,
}: {
  color?: string;
  className?: string;
  text: string;
}) => (
  <div
    className={className}
    style={{
      backgroundColor: color + '20',
      color: color,
      border: `1px solid ${color}40`,
      borderRadius: '9999px',
      padding: '2px 12px',
      fontSize: '12px',
    }}
  >
    {text}
  </div>
);
