/**
 * Formatting helpers local to the /testing prototype.
 */

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

/**
 * Render an ISO `YYYY-MM-DD` date as readable text without timezone drift.
 *
 * @param {string} isoDate
 * @returns {string}
 */
export const formatDate = (isoDate) => {
  const parsed = new Date(`${isoDate}T00:00:00Z`);
  return Number.isNaN(parsed.getTime())
    ? isoDate
    : dateFormatter.format(parsed);
};
