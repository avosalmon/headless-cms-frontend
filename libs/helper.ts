import { format } from "date-fns";

/**
 * e.g. Oct 01, 2021
 */
export function formatDate(value: string): string {
  return format(new Date(value), "PP");
}
