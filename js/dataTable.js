/**
 <tr>
                <td><input class="checkbox-button" type="checkbox" name="" id=""></td>
                <td>MV12</td>
                <td>Trần Phương Duy</td>
                <td>Nam</td>
                <td class="date">04/03/2019</td>
                <td>312312413131231231</td>
                <td>Thực tập sinh</td>
                <td>Giải pháp bán lẻ</td>
                <td>2131232131231231</td>
                <td>BIDV</td>
                <td>Cầu Giấy</td>
                <td class="table-function fixed">
                  <div>Sửa</div>
                  <div class="icon-down icon-24"></div>
                  <div class="context-menu" hidden>
                    <div class="context-menu-content">
                      <div class="context-menu-action">Nhân bản</div>
                      <div class="context-menu-action contex-action-delete">Xóa</div>
                      <div class="context-menu-action">Ngưng sử dụng</div>
                    </div>
                  </div>
                </td>
              </tr>
 */
class EmployeeLoader {
  static async loadData() {
    try {
      const response = await fetch('https://apidemo.laptrinhweb.edu.vn/api/v1/Employees');
      const data = await response.json();
      const tableBody = document.querySelector('.table tbody')
      console.log(tableBody);
      console.log(data);
      data.forEach(employee => {
        const rowsToAdd = `
           <tr>
                <td><input class="checkbox-button" type="checkbox" name="" id=""></td>
                <td>${employee.EmployeeCode}</td>
                <td>${employee.FullName}</td>
                <td>${employee.Gender == 2 ? 'Nam' : 'Nữ'}</td>
                <td class="date">${employee.DateOfBirth}</td>
                <td>${employee.IdentityNumber}</td>
                <td>${employee.PositionName}</td>
                <td>${employee.DepartmentName}</td>
                <td>${employee.Salary}</td>
                <td>${employee.Email}</td>
                <td>${employee.MartialStatusName}</td>
                <td class="table-function fixed">
                  <div>Sửa</div>
                  <div class="icon-down icon-24"></div>
                  <div class="context-menu" hidden>
                    <div class="context-menu-content">
                      <div class="context-menu-action">Nhân bản</div>
                      <div class="context-menu-action contex-action-delete">Xóa</div>
                      <div class="context-menu-action">Ngưng sử dụng</div>
                    </div>
                  </div>
                </td>
              </tr>
        `
        tableBody.insertAdjacentHTML('beforeend', rowsToAdd);

      });
      let tableRow = document.querySelectorAll('.table-content table tr')
      btnLast = document.querySelector('#btn-confirm')
      firstInput = document.querySelector('#code')
      let nameInput = document.querySelector('#name')
      tableRow.forEach(row => {
        row.addEventListener('dblclick', () => {
          titleName.innerHTML = 'Sửa thông tin nhân viên'
          openModal(form)
          firstInput.focus()
          const cells = row.querySelectorAll('td');
          let data = []
          cells.forEach(cell => {
            data.push(cell.textContent)
          })
          firstInput.value = data[1]
          nameInput.value = data[2]
          if (nameInput.value) {
            nameInput.classList.add('valid-border')
          }
          console.log(data);
        })
      })


    } catch (error) {
      console.log(error);
    }
  }
}

window.addEventListener('load', () => {
  EmployeeLoader.loadData();
});