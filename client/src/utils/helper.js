export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  // Password must be at least 8 characters long, contain at least one uppercase letter,
  // one lowercase letter, one number, and one special character.
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};


export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initial = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initial += words[i][0];
  }
  return initial.toUpperCase();
};
