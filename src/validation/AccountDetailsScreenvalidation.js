export const validateValues = fields => {
  let isValid = {};

  if (!fields.BankName) {
    isValid.BankName = 'Bank Name is a required field';
  }

  if (!fields.Accountnumber) {
    isValid.Accountnumber = 'Account Number is a required field';
  } else if (!/^\d{9,18}$/.test(fields.Accountnumber)) {
    isValid.Accountnumber = 'Account Number should be 9 to 18 digits long';
  }

  if (!fields.ConfirmAccountnumber) {
    isValid.ConfirmAccountnumber = 'Confirm Account Number is a required field';
  } else if (fields.ConfirmAccountnumber !== fields.Accountnumber) {
    isValid.ConfirmAccountnumber = 'Account Numbers do not match';
  }

  if (!fields.IFSCCode) {
    isValid.IFSCCode = 'IFSC Code is a required field';
  } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(fields.IFSCCode)) {
    isValid.IFSCCode = 'Invalid IFSC Code format';
  }

  return isValid;
};

export const ConfirmationvalidateValues = fields => {
  let isValid = {};

  if (!fields.Accountnumber) {
    isValid.Accountnumber = 'Account Number is a required field';
  } else if (!/^\d{9,18}$/.test(fields.Accountnumber)) {
    isValid.Accountnumber = 'Account Number should be 9 to 18 digits long';
  }

  if (!fields.ConfirmAccountnumber) {
    isValid.ConfirmAccountnumber = 'Confirm Account Number is a required field';
  } else if (fields.ConfirmAccountnumber !== fields.Accountnumber) {
    isValid.ConfirmAccountnumber = 'Account Numbers do not match';
  }

  if (!fields.IFSCCode) {
    isValid.IFSCCode = 'IFSC Code is a required field';
  } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(fields.IFSCCode)) {
    isValid.IFSCCode = 'Invalid IFSC Code format';
  }

  return isValid;
};
