import dayjs from 'dayjs';

export const formatNumber = (number: number): string => {
   return number.toLocaleString();
};
export const formatDate = (date: string, format?: string) => {
   if (!date) return '';
   return dayjs(date).format(format ? format : 'YYYY년MM월DD일');
};
