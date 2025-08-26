export const formatDate = (date: string): string => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + 9);

  const formatter = new Intl.DateTimeFormat('ko-KR', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'Asia/Seoul',
  });
  return formatter.format(newDate);
};
