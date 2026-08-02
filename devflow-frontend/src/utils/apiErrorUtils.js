/**
 * Extract a user-facing message from API error responses.
 * Handles validation errors (400) with errors[] array per details.md.
 */
export function getApiErrorMessage(err, fallback = "Something went wrong.") {
  if (!err) return fallback;

  const data = err.response?.data ?? err;
  const message = data?.message;

  if (Array.isArray(data?.errors) && data.errors.length > 0) {
    return data.errors.join(" ");
  }

  if (typeof message === "string" && message.trim()) {
    return message;
  }

  if (typeof err.message === "string" && err.message.trim()) {
    return err.message;
  }

  return fallback;
}
