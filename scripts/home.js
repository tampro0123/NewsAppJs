'use strict'
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
// Định nghĩa hàm trả về phần tử phù hợp với một bộ chọn CSS đã cho trong trang
const loginModal = $('#login-modal')
const welcomMess = $('#welcome-message')
const logOutBtn = $('#btn-logout')
const mainContent = $('#main-content')
let currentUser = JSON.parse(getFromStorage("currentUser")) ?? []
// lấy currentUser để kiểm tra đã đăng nhập hay chưa 
const homeRender = () => {
  if (currentUser.length > 0) {
    loginModal.style.display = "none"
    mainContent.style.display = "block"
    welcomMess.innerText = `Welcome ${currentUser[0].firstName}`
  } else {
    mainContent.style.display = "none"
    loginModal.style.display = 'block'
    welcomMess.innerText = ""
  }
}
// Dựa theo trạng thái đăng nhập render ra giao diện phù hợp
homeRender()

logOutBtn.addEventListener('click', () => {
  const logoutConfirm = confirm('Bạn chắc chắn muốn đăng xuất ?')
  if (logoutConfirm) {
    localStorage.removeItem('currentUser')
    currentUser = []
    homeRender()
    window.location.href = "../pages/login.html";
  }

})
// đăng xuất khi người dùng đã đăng nhập, sau đó chuyển đến trang đăng nhập



