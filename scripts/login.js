'use strict'
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const userName = $('#input-username')
const password = $('#input-password')
const submitBtn = $('#btn-submit')


let validate = false
const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || []
// lấy tất cả user đã đăng ký, nếu không trả về mảng rỗng
const validateInput = (data) => {
  if (data.userName === "" || data.password === "") {
    alert("Vui lòng nhập đầy đủ tất cả các trường")
    return validate = false

  } else if (data.password.length < 8) {
    alert("Password phải có ít nhất 8 ký tự")
    return validate = false

  } else {
    return validate = true
  }
}
// hàm kiểm tra input
submitBtn.addEventListener('click', () => {
  const data = {
    userName: userName.value,
    password: password.value,
  }
  validateInput(data)
  if (validate === true) {
    const currentUser = userArr.filter(user => {
      return user.userName === userName.value
    })
    if (currentUser.length == 0) {
      alert("Tài khoản này chưa được đăng ký")

    } else if (currentUser[0].password !== password.value) {
      alert("Tài khoản hoặc mật khẩu không đúng")
    } else {
      saveToStorage("currentUser", JSON.stringify(currentUser))
      window.location.href = "../index.html";
    }
  }
})

// kiểm tra input nếu các trường đều nhập đúng , ta lấy ra currentUser có user name được nhập và kiểm tra
// nếu không có user name nào có trong mảng userArr, chứng tỏ người dùng chưa đăng ký tài khoản này,
// nếu có kiểm tra password có đúng hay chưa, nếu chưa đưa ra cảnh báo. nếu cả 2 đều đúng ta lưu user đã đăng nhập vào local và chuyển đến trang index
