import {extend} from "vee-validate";
import {required, alpha, regex, alpha_num, email} from "vee-validate/dist/rules";
import {setInteractionMode} from 'vee-validate';

extend("required", {
    ...required,
    message: "This field is required"
});

extend('email', {
    ...email,
    message: 'Email is not valid',
});

extend("alpha", {
    ...alpha,
    message: "This field must only contain alphabetic characters"
});

extend('alpha_num', {
    ...alpha_num,
    message: 'Field must be contain alphabet or numbers'
});

extend("regex", {
    ...regex,
    message: "Invalid"
});

//phone validator


extend('phone', (value) => {

    if (!value.length) {
        return true
    }
    const regex = /(^([+]8{2}|0088)?(01)[3-9]\d{8})$/
    return regex.test(String(value)) || 'Please provide a valid Bangladeshi number';

})

extend('code', (value) => {
  if (!value || value.length === 4) {
    return true;
  }
  return "Verification code must be exactly 4 character long"
})

setInteractionMode('eager');
