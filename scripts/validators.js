// validators.js - form validation and regex helpers
export const reDescription = /^\S(?:.*\S)?$/;
export const reAmount = /^(0|[1-9]\d*)(\.\d{1,2})?$/;
export const reDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
export const reCategory = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

// Advanced example: duplicate word back-reference
export const reDuplicateWord = /\b(\w+)\s+\1\b/;

export function validateRecord({ description, amount, date, category }) {
  const errors = [];
  if (!reDescription.test(description)) errors.push('Invalid description');
  if (!reAmount.test(String(amount))) errors.push('Invalid amount');
  if (!reDate.test(date)) errors.push('Invalid date');
  if (!reCategory.test(category)) errors.push('Invalid category');
  return errors;
}
