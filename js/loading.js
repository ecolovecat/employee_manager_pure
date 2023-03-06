const refreshBtn = document.querySelector('.refresh')
const loading = document.querySelector('.loading')
refreshBtn.addEventListener('click', function() {
  loading.classList.add('visible')
  setTimeout(() => {
    loading.classList.remove('visible')
  }, 2000);
})