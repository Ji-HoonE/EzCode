export default function ResultStatusIcon({ status }: { status: boolean }) {
  const color = status ? '#037732' : '#EC3030';
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="8.5"
        cy="8.5"
        r="7.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="3 3"
      />
    </svg>
  );
}
