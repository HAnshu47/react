import dayjs from 'dayjs';

export const formatMoney = (value) => {
  if (isNaN(value)) return '0.00';
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

export const getAllMonthList = (year) => {
  const now = dayjs();
  const currentYear = now.year();
  const currentMonth = now.month(); // 0-11

  const months = [];

  if (year < currentYear) {
    // 如果是过去的年份，显示 1-12 月
    for (let i = 0; i < 12; i++) {
      months.push(i + 1);
    }
  } else if (year === currentYear) {
    // 如果是当前年份，只显示已过或正在进行的月份
    for (let i = 0; i <= currentMonth; i++) {
      months.push(i + 1);
    }
  }
  return months.reverse();
};
