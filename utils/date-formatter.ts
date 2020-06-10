export const getFormattedDate = (date: string): string => {
  const formattedDate = new Date(date);
  const options = { year: '2-digit', month: '2-digit', day: '2-digit' };

  return formattedDate.toLocaleString('default', options);
};
