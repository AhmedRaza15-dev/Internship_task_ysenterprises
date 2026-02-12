export const validatePollForm = (values, options) => {
  const errors = {};

  if (!values.question.trim()) {
    errors.question = 'Question is required';
  } else if (values.question.length < 5) {
    errors.question = 'Question must be at least 5 characters';
  }

  const validOptions = options.filter(opt => opt.trim() !== '');
  if (validOptions.length < 2) {
    errors.options = 'At least 2 options are required';
  }

  if (!values.expiresAt) {
    errors.expiresAt = 'Expiration date is required';
  } else if (new Date(values.expiresAt) <= new Date()) {
    errors.expiresAt = 'Expiration date must be in the future';
  }

  return errors;
};