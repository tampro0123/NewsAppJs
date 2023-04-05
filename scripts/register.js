'use strict'
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


const firstName = $('#input-firstname')
const lastName = $('#input-lastname')
const userName = $('#input-username')
const password = $('#input-password')
const confirmPassword = $('#input-password-confirm')
const submitBtn = $('#btn-submit')

let validate = false
const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || []
// lấy tất cả người dùng đang lưu ở localstorage
function parseUser(data) {
  const user = new User(data.firstName, data.lastName, data.userName, data.password)

  return user
}
// tạo một User mới từ data
const validateInput = (data) => {
  if (data.firstName === "" || data.lastName === "" || data.userName === "" || data.password === "" || data.confirmPassword === "" || data.confirmPassword === "") {
    alert("Vui lòng nhập đầy đủ tất cả các trường")
    return validate = false

  } else if (userArr.some(e => e.userName === data.userName)) {
    alert("Tài khoản này đã tồn tại")
    return validate = false
  } else if (data.password.length < 9) {
    alert("Password ít nhất 9 ký tự")
    return validate = false

  } else if (data.password !== data.confirmPassword) {
    alert("Confirm password chưa đúng, vui lòng kiểm tra lại !")
    return validate = false

  } else {
    return validate = true
  }
}
// validate input
submitBtn.addEventListener('click', () => {
  const data = {
    firstName: firstName.value,
    lastName: lastName.value,
    userName: userName.value,
    password: password.value,
    confirmPassword: confirmPassword.value
  }
  validateInput(data)
  if (validate === true) {
    const newUser = parseUser(data)
    userArr.push(newUser)
    saveToStorage(KEY, JSON.stringify(userArr))
    window.location.href = "./login.html";
  }
})
// validate input thành công, tạo newUser từ hàm parseUser sau đó đưa vào userArr và đưa mảng này xuống localStorage , và chuyển trang