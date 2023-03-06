let deleteBtn = document.querySelectorAll('.contex-action-delete')
let deletePopup = document.querySelector('#deletePopup')
let overlayy = deletePopup.querySelector('.overlay')
let buttonPopup = deletePopup.querySelectorAll('button')

deleteBtn.forEach(btn => {
  btn.addEventListener('click', function() {
    deletePopup.classList.add('visible')
  })
})

overlayy.addEventListener('click', function() {
  deletePopup.classList.remove('visible')
})

buttonPopup.forEach(button => {
  button.addEventListener('click', function() {
    deletePopup.classList.remove('visible')
  })
})