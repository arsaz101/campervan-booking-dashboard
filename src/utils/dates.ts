// Generate dates for the current month and next month
const getCurrentMonthDates = () => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const dates = [];
  for (let day = 1; day <= daysInMonth; day++) {
    dates.push(new Date(currentYear, currentMonth, day));
  }
  return dates;
};

const getNextMonthDates = () => {
  const now = new Date();
  const nextMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const daysInMonth = new Date(currentYear, nextMonth + 1, 0).getDate();

  const dates = [];
  for (let day = 1; day <= daysInMonth; day++) {
    dates.push(new Date(currentYear, nextMonth, day));
  }
  return dates;
};

export const currentMonthDates = getCurrentMonthDates();
export const nextMonthDates = getNextMonthDates();
