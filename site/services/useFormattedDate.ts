import { useEffect, useState } from "react";
import { formatDate } from "./DateTimeFormatter";

export const useFormattedDate = (date: string): string => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated ? formatDate(date) : "";
};
