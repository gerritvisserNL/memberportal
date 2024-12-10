export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  const minLength = 8;
  return password.length >= minLength;
};

export const validateRequiredFields = (fields) => {
  return fields.every((field) => field != null && field !== "");
};
