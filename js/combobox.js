const comboBox = document.querySelector('.combo-box')
const input = comboBox.querySelector('.combo-box-input')
const options = comboBox.querySelectorAll('.combo-box-options li')

input.addEventListener('click', function () {
})

options.forEach(function (option) {
  try {
    option.addEventListener('click', function () {
      input.value = this.innerText
      comboBox.querySelector('.combo-box-options').classList.remove('show')
    })
  } catch (error) {

  }
})

document.addEventListener('click', (event) => {
  try {
    (event.target.classList);
    isInsideInput = event.target.classList.contains('combo-box-input') ||
      event.target.classList.contains('combobox-icon')
    if (isInsideInput) {
      input.parentNode.parentNode.querySelector('.combo-box-options').classList.toggle('visible')
    } else {
      input.parentNode.parentNode.querySelector('.combo-box-options').classList.remove('visible')

    }
  } catch (error) {

  }
})