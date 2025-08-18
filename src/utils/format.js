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

export const getYearBalance = (billList, year) => {
  // 筛选指定年份账单
  const currentYearBill = billList.filter(
    (item) => dayjs(item.date).year() === year
  );

  // 累加收入和支出
  const { income, pay } = currentYearBill.reduce(
    (acc, cur) => {
      if (cur.type === 'income') acc.income += cur.money;
      if (cur.type === 'pay') acc.pay -= cur.money;
      return acc;
    },
    { income: 0, pay: 0 }
  );

  // 结余 = 收入 - 支出
  const balance = income - pay;

  return { income, pay, balance };
};

export const getMonthlyBalance = (year, billList) => {
  // 筛选出指定年份的账单
  const currentYearBill = billList.filter(
    (item) => dayjs(item.date).year() === year
  );

  const months = getAllMonthList(year); // 1-12 或已过月份
  const monthlyData = months.map((month) => {
    // 筛选该月份的账单
    const monthBill = currentYearBill.filter(
      (item) => dayjs(item.date).month() === month - 1
    );

    // 计算收支
    const monthIncome = monthBill.reduce(
      (acc, cur) => (cur.type === 'income' ? acc + cur.money : acc),
      0
    );
    const monthPay = monthBill.reduce(
      (acc, cur) => (cur.type === 'pay' ? acc - cur.money : acc),
      0
    );

    const monthBalance = monthIncome - monthPay;

    return {
      month,
      income: monthIncome,
      pay: monthPay,
      balance: monthBalance
    };
  });

  return monthlyData;
};
