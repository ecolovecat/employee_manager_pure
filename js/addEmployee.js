const addBtn = document.getElementById('btn-add');
const form = document.getElementById('form');
const overlay = document.querySelectorAll('.overlay');
const cancleButtons = document.querySelectorAll('.exit');
const btnCancle = document.getElementById('btn-cancle')
const btnConfirm = document.getElementById('btn-confirm')
const btnCut = document.querySelector('#btn-cut')
const toast = document.getElementById('toast-success')
const notiPopup = document.querySelector('.noti-save')
const notiBtnCancle = document.querySelector('#noti-save-cancle')
const notiBtnDecline = document.querySelector('#noti-save-decline')
const notiBtnConfirm = document.querySelector('#noti-save-confirm')
const validateErrorPopup = document.querySelector('.validate-error')
const closeValidatePopup = document.querySelector('#close-validate-popup')
const titleName = document.querySelector('.info-name')


function openModal(element) {
  element.classList.remove('hidden');
  element.classList.add('visible');
}

function closeModal(element) {
  titleName.innerHTML = ''
  element.classList.remove('visible');
  element.classList.add('hidden');
}

addBtn.addEventListener('click', function () {
  console.log(firstInput);
  titleName.innerHTML = 'Thêm mới nhân viên'
  openModal(form)
  firstInput.focus()
});

function closeModalOnClick() {
  try {
    if (form.classList.contains('visible')) {
      closeModal(form)
      notiPopup.classList.add('visible')
      notiBtnCancle.addEventListener('click', function () {
        closeModal(notiPopup)
        openModal(form)
      })
      notiBtnDecline.addEventListener('click', function () {
        clearValidate()
        closeModal(notiPopup)
      })
      notiBtnConfirm.addEventListener('click', function () {
        clearValidate()
        closeModal(notiPopup)
      })
    }
    if (toast) {
      closeModal(toast)
    }
  } catch (error) {
    console.log(error);
  }
}

cancleButtons.forEach(c => {
  c.addEventListener('click', closeModalOnClick);
})

overlay.forEach(o => {
  o.addEventListener('click', closeModalOnClick);
})

btnCancle.addEventListener('click', function () {
  closeModal(form)
});

function checkValidate() {
  try {
    const error = document.querySelectorAll('.error-border')
    const errorArray = []
    error.forEach(err => {
      if (err.parentNode.querySelector('.required')) {
        errorArray.push('Một số trường không được bỏ trống.')
      } else {
        errorArray.push(err.title)
      }
    })
    return errorArray
  } catch (error) {
    console.log(error);
  }
}

btnConfirm.addEventListener('click', function () {
  try {
    let error = checkValidate()
    error = [...new Set(error)]
    if (checkValidate().length != 0) {
      const popup = document.querySelector('.popup-content-validate')
      const errorField = popup.querySelector('ul')
      console.log(errorField);
      error.forEach((err, index) => {
        const li = document.createElement('li')
        li.textContent = (error.length == 1 ? '' : index + 1 + '. ') + err

        errorField.appendChild(li)
      })
      validateErrorPopup.classList.add('visible')
    } else {
      closeModal(form)
      openModal(toast)
      setTimeout(() => {
        closeModal(toast)
      }, 5000);
    }
  } catch (error) {
    console.log(error);
  }
})

btnCut.addEventListener('click', function () {

})

closeValidatePopup.addEventListener('click', function () {
  try {
    const popup = document.querySelector('.popup-content-validate')
    const errorField = popup.querySelector('ul')
    errorField.innerHTML = ''
    validateErrorPopup.classList.remove('visible')
  } catch (error) {
    console.log(error);
  }
})