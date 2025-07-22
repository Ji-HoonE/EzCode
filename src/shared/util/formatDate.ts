export const formatDate = (date: string): string => {
  const newDate = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'Asia/Seoul',
  };

  const formatter = new Intl.DateTimeFormat('ko-KR', options);
  return formatter.format(newDate); // 예: "오후 4:58"
};
