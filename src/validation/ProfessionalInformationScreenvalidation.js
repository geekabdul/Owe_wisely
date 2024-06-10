export const validateValues = fields => {
    let isValid = {};
  
    if (!fields.CompanyName) {
      isValid.CompanyName = 'Company Name is a required field';
    }
  
    if (!fields.Industrytype) {
      isValid.Industrytype = 'Industry Type is a required field';
    }
  
    if (!fields.Purposeofloan) {
      isValid.Purposeofloan = 'Purpose of Loan is a required field';
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
  
    return isValid;
  };
  