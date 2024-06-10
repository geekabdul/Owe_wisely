export const ConfirmationvalidateValues = fields => {
    let isValid = {};
  
    if (!fields.Votercardnumber) {
      isValid.Votercardnumber = 'Voter Card Number is a required field';
    } else if (!/^[A-Z]{3}[A-Z0-9]{7}$/.test(fields.Votercardnumber)) {
      isValid.Votercardnumber = 'Invalid Voter Card Number format';
    }
  
    if (!fields.Dateofbirth) {
      isValid.Dateofbirth = 'Date of Birth is a required field';
    } // You can add additional validation for Dateofbirth if needed
  
    if (!fields.Pincode) {
      isValid.Pincode = 'Pincode is a required field';
    } else if (!/^\d{6}$/.test(fields.Pincode)) {
      isValid.Pincode = 'Pincode should be 6 digits long';
    }
  
    return isValid;
  };
  
  export const DrivingLicensevalidateValues = fields => {
    let isValid = {};
  
    if (!fields.Drivinglicensenumber) {
      isValid.Drivinglicensenumber = 'Driving License Number is a required field';
    } else if (!/^[A-Z0-9]{15}$/.test(fields.Drivinglicensenumber)) {
      isValid.Drivinglicensenumber = 'Invalid Driving License Number format';
    }
  
    if (!fields.Dateofbirth) {
      isValid.Dateofbirth = 'Date of Birth is a required field';
    } // You can add additional validation for Dateofbirth if needed
  
    if (!fields.Pincode) {
      isValid.Pincode = 'Pincode is a required field';
    } else if (!/^\d{6}$/.test(fields.Pincode)) {
      isValid.Pincode = 'Pincode should be 6 digits long';
    }
  
    return isValid;
  };
  