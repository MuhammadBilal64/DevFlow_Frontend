/** Build an ISO timestamp from a YYYY-MM-DD input using local date parts (avoids UTC shift). */
export function localDateStringToISO(dateStr) {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toISOString();
}

/** Format an ISO/Date value for <input type="date"> in local timezone. */
export function formatDateForInput(value) {
  if (!value) return "";
  const d = new Date(value);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Format a date for display in local timezone. */
export function formatDateForDisplay(value) {
  if (!value) return "No due date";
  const d = new Date(value);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
