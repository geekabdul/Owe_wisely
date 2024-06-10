export const validateValues = fields => {
  let isValid = {};
  // if (!fields.email) {
  //   isValid.email = 'Email Address is a required field';
  // } else {
  //   const emailIsValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
  //     fields.email,
  //   );
  //   if (!emailIsValid) {
  //     isValid.email = 'Please enter a valid email address';
  //   }
  // }

  if (!fields.phone || !/^\d{10}$/.test(fields.phone)) {
    if (!fields.phone) {
      isValid.phone = 'Mobile Number is a required field';
    } else {
      isValid.phone = 'Mobile number should be 10 digits';
    }
  }

  return isValid;
};

