const requiredFields = document.querySelectorAll('.required')
const emailInput = document.querySelector('#email-input')
const phoneInput = document.querySelector('#phone-input')
const birthInput = document.querySelector('#birth-picker')
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneVnRegex = /^(?:(\+84)|0)(?:\d){8,9}$/

const infoError = {
  required: {
    message: 'Trường này không được bỏ trống.'
  },
  email: {
    message: 'Email không hợp lệ.'
  },
  phone: {
    message: 'Số điện thoại không hợp lệ.'
  },
  birth: {
    message: 'Ngày sinh không hợp lệ.'
  }
}

console.log(111, birthInput.value);
/**
 * Check birthday validate
 * @param {date} dateOfBirth 
 * @returns 
 * Author: Trần Phương Duy
 */
function birthValidate(dateOfBirth) {
  try {
    if (isNaN(Date.parse(dateOfBirth))) {
      return false;
    }

    const dobComponents = dateOfBirth.split('-')
    const year = parseInt(dobComponents[0])
    const month = parseInt(dobComponents[1])
    const day = parseInt(dobComponents[2])

    const dob = new Date(dateOfBirth)

    const now = new Date()
    console.log(now);
    const age = now.getFullYear() - year - ((now.getMonth() < month || (now.getMonth() === month && now.getDate() < day)) ? 1 : 0)
    return age > 0
  } catch (error) {

  }
}

/**
 * check required validate
 * @param {*} input 
 * Author: Trần Phương Duy
 */

// label.required + input
function checkRequired(input) {
  console.log(111, birthInput.value);
  // const error = input.parentNode.querySelector('span.error-message')
  try {
    if (!input.value.trim()) {
      input.classList.remove('valid-border')
      // error.textContent = infoError.required.message
      input.title = infoError.required.message
      // add error color border
      input.classList.add('error-border')
    } else {
      input.classList.remove('error-border')
      input.classList.add('valid-border')
      input.title = ''
    }
  } catch (e) {
    console.log(e);
  }
}

/**
 * Check email validate
 * Author: Trần Phương Duy
 */

function checkEmail() {
  try {
    const error = emailInput.parentNode.querySelector('span.error-message')

    if (!emailInput.value.trim()) {
      emailInput.classList.remove('error-border')
      emailInput.title = ''
    }

    if (!emailRegex.test(emailInput.value.trim())) {
      emailInput.classList.remove('valid-border')
      emailInput.title = infoError.email.message

      // add error color border
      emailInput.classList.add('error-border')
    } else {
      emailInput.classList.remove('error-border')
      emailInput.classList.add('valid-border')
      emailInput.title = ''
    }
  } catch (e) {
    console.log(e);
  }
}

/**
 * Check Phone validate
 * Author: Trần Phương Duy
 */
function checkPhone() {
  try {
    const error = phoneInput.parentNode.querySelector('span.error-message')

    if (!phoneInput.value.trim()) {
      phoneInput.classList.remove('error-border')
      phoneInput.title = ''
    }

    if (!phoneVnRegex.test(phoneInput.value.trim())) {
      phoneInput.classList.remove('valid-border')
      phoneInput.title = infoError.phone.message

      // add error color border
      this.classList.add('error-border')
    } else {
      phoneInput.classList.remove('error-border')
      phoneInput.classList.add('valid-border')
      phoneInput.title = ''
    }
  } catch (e) {
    console.log(e);
  }
}

emailInput.addEventListener('blur', checkEmail)
phoneInput.addEventListener('blur', checkPhone)

/**
 * Check bir
 */
birthInput.addEventListener('blur', function (event) {
  const dateOfBirth = event.target.value

  if (!birthInput.value) {
    birthInput.classList.remove('error-border')
    birthInput.title = ''
  }

  if (!birthValidate(dateOfBirth)) {
    // If the date is invalid, show an error message
    birthInput.classList.remove('valid-border')
    birthInput.title = infoError.birth.message

    // add error color border
    this.classList.add('error-border')
  } else {
    birthInput.classList.remove('error-border')
    birthInput.classList.add('valid-border')
    birthInput.title = ''
  }
})

requiredFields.forEach(field => {
  // div.input > label > span
  let input = field.parentElement.nextElementSibling
  input.addEventListener('blur', () => checkRequired(input));
})

function clearValidate() {
  try {
    const errorBorder = document.querySelectorAll('.error-border')
    const validBorder = document.querySelectorAll('.valid-border')
    const inputValue = document.querySelectorAll('.dialog input')

    errorBorder.forEach(feild => {
      feild.classList.remove('error-border')
    })
    validBorder.forEach(feild => {
      feild.classList.remove('valid-border')
    })
    inputValue.forEach(input => {
      input.title = ''
      input.value = ''
    })
  } catch (error) {

  }

}


