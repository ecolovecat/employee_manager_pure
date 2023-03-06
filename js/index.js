let btnLast
let firstInput 

function debounce(callback, time) {
  let timeID;
  time = time || 0
  return () => {
    if (timeID) {
      clearTimeout(timeID)
      timeID = null;
    }
    else {

      timeID = setTimeout(callback(), time)
    }
  }
}

class Comboboxx extends HTMLElement {
  index = -1;
  input;
  eventinput;
  inside;
  data;
  list;
  value;

  constructor() {
    super();
    this.init()
  }
  async init() {
    this.input = this.querySelector('input');
    this.inside = this.querySelector('#combobox-result-inside');
    this.eventinput = this.input.addEventListener('input', e => {
      let fn = (e) => this.handledebouce(e.target.value)
      debounce(fn(e), 400)
    }
    )

    this.querySelector('.combobox__display-icon').addEventListener('click', () => {
      document.querySelector('.combobox__result ').classList.toggle('active');
    })
    this.input.addEventListener('focus', () => {
      document.querySelector('.combobox__result ').classList.add('active');
    })
    this.input.addEventListener('blur', () => {
      document.querySelector('.combobox__result ').classList.remove('active');
    })
    this.input.addEventListener('keydown', (e) => {
      document.querySelector('.combobox__result ').classList.add('active')
      if (e.key == 'ArrowDown' || e.key == 'Tab') {
        this.index++;
        this.list = document.querySelectorAll('.combobox__result-inside-item');
        let el = this.list[this.index];
        if (this.index == this.list.length) {
          this.index = 0;
          let lastindex = this.list.length - 1
          this.list[lastindex].classList.remove('active')
          this.list[0].classList.add('active')
        }
        else {
          if (this.index != 0 && this.index != this.list.length) {
            el.previousElementSibling?.classList.remove('active')
          }
          el.classList.add('active')
        }
      } else {
        if (e.key == 'Enter') {
          this.input.value = this.list[this.index]?.textContent.trim();
          this.value = this.list[this.index].getAttribute('data')
          this.setAttribute('value', this.value)
          document.querySelector('.combobox__result ').classList.remove('active')
        }
        if (e.key == 'ArrowUp') {
          this.list = document.querySelectorAll('.combobox__result-inside-item');
          if (this.index == -1) {
            this.index = this.list.length
          }
          this.index--;
          let el = this.list[this.index];
          if (this.index == -1) {
            this.index = this.list.length - 1;
            this.list[0].classList.remove('active')
            this.list[this.list.length - 1].classList.add('active')
          }
          else {
            if (this.list.length - 1 != this.index) {
              el.nextElementSibling.classList.remove('active')
            }
            el.classList.add('active')

          }
        }
      }

    })
    this.data = await this.callAPI("https://apidemo.laptrinhweb.edu.vn/api/v1/Departments")
  }
  async callAPI(url) {
    return (async () => await (await fetch(url, { method: 'get' })).json())()
  }
  async handledebouce(e) {
    try {

      let key = e
      let html = ""
      const row = 5;
      let count = 0;
      this.data.forEach(item => {
        if (item.DepartmentName.toLowerCase().indexOf(key.toLowerCase()) != -1) {
          if (count == 5) return false;
          count++;
          html += `<div data="${item.DepartmentCode}" class="combobox__result-inside-item">
                            ${item.DepartmentName}
                        </div>`
        }
      })
      this.inside.innerHTML = html;
    }
    catch (e) {
      console.log(e)
    }

  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      const event = new Event('change');
      this.dispatchEvent(event);
    }
  }

  static get observedAttributes() {
    return ['value'];
  }

}

customElements.define('combo-box-custom', Comboboxx)