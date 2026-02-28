// Email validation
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Password validation
export const validatePassword = (password) => {
  // At least 6 characters
  return password.length >= 6;
};

// Name validation
export const validateName = (name) => {
  // At least 2 characters, only letters and spaces
  return name.length >= 2 && /^[a-zA-Z\s]+$/.test(name);
};

// Form validation helper
export const getFieldError = (field, value) => {
  if (!value || value.trim() === '') {
    return `${field} is required`;
  }

  if (field === 'Email' && !validateEmail(value)) {
    return 'Please enter a valid email address';
  }

  if (field === 'Password' && !validatePassword(value)) {
    return 'Password must be at least 6 characters';
  }

  if (field === 'Name' && !validateName(value)) {
    return 'Name must be at least 2 characters and contain only letters';
  }

  return '';
};