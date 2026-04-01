type TodayInfo = {
  date: string;
  weekday: string;
};

export const getTodayInfo = (date = new Date()): TodayInfo => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const weekday = date.toLocaleDateString("pt-BR", { weekday: "long" });

  return {
    date: `${day}/${month}/${year}`,
    weekday,
  };
};

export const formatDateWithWeekday = (value: string): string => {
  const [day, month, year] = value.split("/");

  if (!day || !month || !year) {
    return value;
  }

  const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  const weekday = parsedDate.toLocaleDateString("pt-BR", { weekday: "long" });

  return `${weekday}, ${value}`;
};
