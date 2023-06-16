import { differenceInMonths, format, parseISO } from "date-fns";

export const calculateTimeDifference = (startDate: string, endDate: string | null) => {
  if (!endDate) {
    endDate = format(new Date(), "yyyy-MM-dd");
  }

  const months = differenceInMonths(parseISO(endDate), parseISO(startDate));

  if (months > 11) {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (remainingMonths > 0) {
      const yearText = years === 1 ? "year" : "years";
      const monthText = remainingMonths === 1 ? "month" : "months";
      return `${years} ${yearText}, ${remainingMonths} ${monthText}`;
    } else {
      const yearText = years === 1 ? "year" : "years";
      return `${years} ${yearText}`;
    }
  } else {
    const monthText = months === 1 ? "month" : "months";
    return `${months} ${monthText}`;
  }
};
