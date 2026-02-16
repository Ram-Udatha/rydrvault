// Validation utilities
export const validatePhoneNumber = (phoneNumber) => {
  const cleaned = phoneNumber.replace(/\D/g, '');
  return cleaned.length === 10;
};

export const validateOtp = (otp) => {
  const cleaned = otp.replace(/\D/g, '');
  return cleaned.length === 6;
};

export const formatPhoneNumber = (phoneNumber) => {
  const cleaned = phoneNumber.replace(/\D/g, '');
  if (cleaned.length <= 5) {
    return cleaned;
  } else if (cleaned.length <= 8) {
    return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  } else {
    return `${cleaned.slice(0, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8, 10)}`;
  }
};
