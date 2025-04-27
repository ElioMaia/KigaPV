export const getYears = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);
};

export const generateMonths = (startYear) => {
  const labels = ['Sep','Okt','Nov','Dez','Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug'];
  return labels.map((m, i) => {
    const monthIndex = (8 + i) % 12;
    const year = monthIndex < 8 ? startYear + 1 : startYear;
    return { label: `${m} ${year}`, date: new Date(year, monthIndex, 1) };
  });
};