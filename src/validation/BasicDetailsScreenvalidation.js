export const validateValues = (fields, tempData) => {
  // console.log(fields, tempData, 'validateeeeeeeessssssss');
  let isValid = {};

  if (!fields.loadValue) {
    isValid.loadValue = 'Loan value type is a required field';
  }
  if (!fields.Purposeofloan) {
    isValid.Purposeofloan = 'Purpose of loan is a required field';
  }
  if (!fields.Industrytype) {
    isValid.Industrytype = 'Industry type is a required field';
  }
  if (!fields.Educationqualification) {
    isValid.Educationqualification =
      'Education qualification is a required field';
  }
  if (!fields.CompanyName) {
    isValid.CompanyName = 'Company name is a required field';
  }
  if (!fields.Languagepreference_Calling) {
    isValid.Languagepreference_Calling =
      'Language preference is a required field';
  }
  if (!fields.FatherName) {
    isValid.FatherName = "Father's name is a required field";
  } else if (!/^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/.test(fields.FatherName)) {
    isValid.FatherName =
      "Father's full name should contain only letters and space";
  }

  if (!fields.StayIn) {
    isValid.StayIn = 'StayIn is a required field';
  }
  if (!fields.MotherName) {
    isValid.MotherName = "Mother's name is a required field";
  } else if (!/^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/.test(fields.MotherName)) {
    isValid.MotherName =
      "Mother's full name should contain only letters and space";
  }

  if (!fields.MaritalStatus) {
    isValid.MaritalStatus = 'Marital status is a required field';
  }
  if (!fields.Currentaddress) {
    isValid.Currentaddress = 'Current address is a required field';
  } else {
    isValid.Currentaddress = '';
  }
  if (!fields.Companyaddress) {
    isValid.Companyaddress = 'Company address is a required field';
  } else {
    isValid.Companyaddress = '';
  }
  if (!fields.Gender) {
    isValid.Gender = 'Gender is a required field';
  }
  if (!fields.Fullname) {
    isValid.fullname = 'Full name is a required field';
  } else if (!/^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/.test(fields.Fullname)) {
    isValid.fullname =
      'Full name as per Govt Identity card (PAN, voter id, DL)';
  }

  if (!fields.first_name) {
    isValid.first_name = 'First Name is a required field';
  } else if (!/^[A-Za-z]+$/.test(fields.first_name)) {
    isValid.first_name = 'First Name should contain only letters';
  }

  if (!fields.last_name) {
    isValid.last_name = 'Last Name is a required field';
  } else if (!/^[A-Za-z]+$/.test(fields.last_name)) {
    isValid.last_name = 'Last Name should contain only letters';
  }

  if (!fields.MonthlyIncome) {
    isValid.MonthlyIncome = 'Monthly Income is a required field';
  } else if (!/^[0-9,]+$/.test(parseInt(fields.MonthlyIncome))) {
    isValid.MonthlyIncome = 'Monthly Income should contain only numbers';
  } else if (fields.MonthlyIncome.length <= 3) {
    isValid.MonthlyIncome = 'Monthly Income should be in thousand';
  } else {
    isValid.MonthlyIncome = '';
  }

  if (!fields.Dateofbirth) {
    console.log('fields.Dateofbirtttttttttttth', fields.Dateofbirth);
    isValid.Dateofbirth = 'Date of Birth is a required field';
  } else {
    isValid.Dateofbirth = '';
  }
  if (!fields.Email) {
    isValid.Email = 'Email Address is a required field';
  } else if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(fields.Email)
  ) {
    isValid.Email = 'Enter a valid email address';
  }
  if (!fields.Pincode && tempData?.length) {
    isValid.Pincode = 'Pincode is a required field';
  } else if (tempData?.length == 0 && fields.Pincode) {
    isValid.Pincode = 'Enter a Valid Pincode';
  } else if (tempData?.length && fields.Pincode) {
    isValid.Pincode = '';
  } else if (
    typeof fields.Pincode == 'string' &&
    !/^\d{6}$/.test(fields.Pincode)
  ) {
    isValid.Pincode = 'Pincode should be 6 digits long';
  } else if (
    typeof fields.Pincode == 'object' &&
    !/^\d{6}$/.test(fields.Pincode.pincode)
  ) {
    isValid.Pincode = 'Pincode should be 6 digits long';
  }

  if (!fields.FamilyFullname) {
    isValid.FamilyFullname = 'Family Full name is a required field';
  } else if (
    !/^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/.test(fields.FamilyFullname)
  ) {
    isValid.FamilyFullname =
      'Family full should contain only letters and space';
  }

  if (!fields.FriendFullname) {
    isValid.FriendFullname = 'Friend Full name is a required field';
  } else if (
    !/^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/.test(fields.FriendFullname)
  ) {
    isValid.FriendFullname =
      'Friend full should contain only letters and space';
  }

  if (!fields.FriendNumber) {
    isValid.FriendNumber = 'Friend Number is a required field';
  } else if (!/^\d{10}$/.test(fields.FriendNumber)) {
    isValid.FriendNumber = 'Friend Number numbers';
  }

  if (!fields.FamilyNumber) {
    isValid.FamilyNumber = 'Family Number is a required field';
  } else if (!/^\d{10}$/.test(fields.FamilyNumber)) {
    isValid.FamilyNumber = 'Family Number numbers';
  }

  return isValid;
};

export const validateFields = fields => {
  let isValid = {};

  if (!fields.Fullname) {
    isValid.Fullname = 'Name is a required field';
  } else if (!/^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/.test(fields.Fullname)) {
    isValid.Fullname = 'Name should contain only letters and space';
  }

  if (!fields.pan_card_no) {
    isValid.pan_card_no = 'PAN Card Number is a required field';
  } else if (!/^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/.test(fields.pan_card_no)) {
    isValid.pan_card_no =
      'Invalid PAN Card Number format. Should be ABCDE1234F';
  }

  // if (!fields.pinCode) {
  //   isValid.pinCode = 'Pin Code is a required field';
  // } else if (fields.pinCode.length !== 6) {
  //   isValid.pinCode = 'Pin Code should contain exactly 6 characters';
  // }

  // Add additional validation rules for pinCode or other fields if needed

  return isValid;
};

export const validateDate = date => {
  console.log('date :>> ', date);
  let isValid = {};

  if (!date) {
    isValid.date = 'Date of Birth is a required field';
  } else {
    // Assuming the "dob" field is in the format "DD-MM-YYYY"
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
      isValid.date = 'Invalid Date of Birth format, please use DD/MM/YY';
    }
  }

  return isValid;
};

export const validateemploymentTypeList = employment_type => {
  let isValid = {};

  if (!employment_type) {
    isValid.employment_type = 'EmploymentType is a required field';
  }

  return isValid;
};

export const validatesalaryReceipt = salaryReceipt => {
  let isValid = {};

  if (!salaryReceipt) {
    isValid.salaryReceipt = 'salaryReceipt is a required field';
  }

  return isValid;
};

export const validategender = gender => {
  let isValid = {};

  if (!gender) {
    isValid.gender = 'gender is a required field';
  }

  return isValid;
};
