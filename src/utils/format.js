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

export const getYearListColums = (currentYear) => {
  const getYearList = Array.from({ length: 20 }, (_, i) => currentYear - i);
  const monthList = getAllMonthList(currentYear);
  return [
    getYearList.map((item) => ({
      label: String(item),
      value: item
    })),
    monthList.map((item) => ({
      label: String(item),
      value: item
    }))
  ];
};

export const getAllMonthListColumn = (currentYear) => {
  const monthList = getAllMonthList(currentYear);
  return monthList.map((item) => ({
    label: String(item),
    value: item
  }));
};

export const getMonthBalance = (billList, year, month) => {
  // 筛选指定年份账单
  const currentYearBill = billList.filter(
    (item) => dayjs(item.date).year() === year
  );
  const currentMonthBill = currentYearBill.filter(
    (item) => dayjs(item.date).month() === month - 1
  );

  const income = currentMonthBill.reduce(
    (acc, cur) => (cur.type === 'income' ? acc + Number(cur.money) : acc),
    0
  );

  const pay = currentMonthBill.reduce(
    (acc, cur) =>
      cur.type === 'pay' ? acc + Math.abs(Number(cur.money)) : acc,
    0
  );

  // 结余 = 收入 - 支出
  const balance = income - pay;

  return { income, pay, balance };
};

// 对每个月详情列表处理
export const filterByYearMonth = (list, year, month) => {
  // month 补零（保证 "04" 这种格式）
  const monthStr = String(month).padStart(2, '0');

  //  过滤符合年份和月份的数据
  const filtered = list.filter((item) => {
    const d = new Date(item.date);
    return d.getFullYear() === year && d.getMonth() + 1 === month;
  });

  //  按天分组
  const grouped = {};
  filtered.forEach((item) => {
    const d = new Date(item.date);
    const dayStr = String(d.getDate()).padStart(2, '0');
    const key = `${monthStr}-${dayStr}`;

    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(item);
  });

  /**转换为目标格式
   * {
   * date:04-03,
   * details:[{
   * "type": "pay",
   * "money": -10,
   * "date": "2023-04-03T11:14:56.036Z",
   * "useFor": "food",
   * "id": 19 }]
   * } */
  let result = Object.keys(grouped).map((date) => {
    const details = grouped[date].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    const income = details
      .filter((item) => item.type === 'income')
      .reduce((sum, item) => sum + item.money, 0);

    const pay = details
      .filter((item) => item.type === 'pay')
      .reduce((sum, item) => sum + Math.abs(item.money), 0);
    return {
      date,
      income,
      pay,
      balance: income - pay,
      details
    };
  });

  //  按日期倒序排序
  result.sort(
    (a, b) => new Date(b.details[0].date) - new Date(a.details[0].date)
  );

  return result;
};
