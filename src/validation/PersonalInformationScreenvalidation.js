export const validateValues = fields => {
  let isValid = {};

  if (!fields.FatherName) {
    isValid.FatherName = 'Father Name is a required field';
  } else if (!/^[A-Za-z]+$/.test(fields.FatherName)) {
    isValid.FatherName = 'Father Name should contain only letters';
  }

  if (!fields.MotherName) {
    isValid.MotherName = 'Mother Name is a required field';
  } else if (!/^[A-Za-z]+$/.test(fields.MotherName)) {
    isValid.MotherName = 'Mother Name should contain only letters';
  }

  if (!fields.MaritalStatus) {
    isValid.MaritalStatus = 'Marital Status is a required field';
  }

  if (!fields.Pincode) {
    isValid.Pincode = 'Pincode is a required field';
  } else if (!/^\d+$/.test(fields.Pincode)) {
    isValid.Pincode = 'Pincode should contain only numbers';
  }

  if (!fields.State) {
    isValid.State = 'State is a required field';
  }

  if (!fields.City) {
    isValid.City = 'City is a required field';
  }

  if (!fields.Currentaddress) {
    isValid.Currentaddress = 'Current Address is a required field';
  }

  if (!fields.Educationqualification) {
    isValid.Educationqualification =
      'Education Qualification is a required field';
  }

  if (!fields.Languagepreference_Calling) {
    isValid.Languagepreference_Calling =
      'Language Preference for Calling is a required field';
  }

  return isValid;
};

export const stayValidateValues = stay => {
  let isValid = {};

  if (!stay) {
    isValid.stay = 'stay is a required field';
  }

  return isValid;
};
