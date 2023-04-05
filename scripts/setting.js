'use strict'
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const category = $('#input-category')
const inputPageSize = $('#input-page-size')
const submitBtn = $('#btn-submit')

const dataNews = {
  category: "business",
  pageSize: 5,
}
// thông tin mặc định
const dataNewsCurrent = JSON.parse(getFromStorage("dataNews"))
const renderDataNewsCurrent = () => {
  category.value = dataNewsCurrent.category
  inputPageSize.value = dataNewsCurrent.pageSize
}
setTimeout(() => {
  renderDataNewsCurrent()
}, 1000)

// hiển thị ra thông tin trên form khi người dùng đã chọn trước đó
submitBtn.addEventListener('click', () => {
  if (+inputPageSize.value < 1) {
    alert("Vui lòng chọn số trang hiển thị lớn hơn 0")
  } else {
    dataNews.category = category.value,
      dataNews.pageSize = inputPageSize.value
    saveToStorage("dataNews", JSON.stringify(dataNews))
  }
})

