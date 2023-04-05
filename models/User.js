'use strict'
class User {
  constructor(firstName, lastName, userName, password) {
    this.firstName = firstName,
      this.lastName = lastName,
      this.userName = userName,
      this.password = password
  }
}
const dataNewsDefault = {
  category: "business",
  pageSize: 5,
}
// tạo data mặc định để gọi api khi vào trang web
async function getData(pageCount) {
  const dataNews = JSON.parse(localStorage.getItem("dataNews")) ?? dataNewsDefault
  try {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${dataNews.category}&pageSize=${+dataNews.pageSize}&page=${pageCount}&apiKey=7594d5d584834ad5bf2b3bdbdd3ec2bc`);
    const data = await res.json()
    saveToStorage("dataNews", JSON.stringify(dataNews))
    return data
  }
  catch (error) {
    console.log(res.error)
  }
}
// tạo hàm get data thưc hiện lần lượt các hành động, lấy data từ api, lưu datanews xuống storage và trả về data