'use strict'
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const inputQuery = $('#input-query')
const submitBtn = $("#btn-submit")
const newsContainer = $('#news-container')
const prevBtn = $("#btn-prev")
const pageNum = $('#page-num')
const nextBtn = $("#btn-next")
let pageCount = 1;
let pageTotal = 1
const newsData = JSON.parse(getFromStorage("dataNews"))
// lấy thông tin về News người dùng muốn hiên thị
const renderNewsArr = (newsArr) => {
  newsContainer.innerHTML = newsArr.map((newItem) => {
    return `<div class="card flex-row flex-wrap">
					<div class="card mb-3" style="">
						<div class="row no-gutters">
							<div class="col-md-4">
								<img src="${newItem.urlToImage}"
									class="card-img"
									alt="${newItem.title}">
							</div>
							<div class="col-md-8">
								<div class="card-body">
									<h5 class="card-title">${newItem.title}</h5>
									<p class="card-text">${newItem.content}</p>
									<a href="${newItem.url}"
										class="btn btn-primary">View</a>
								</div>
							</div>
						</div>
					</div>
				</div>`
  })
}
// hiển thị ra giao diện dựa theo newsArr
const fetchData = async () => {
  const query = inputQuery.value
  const url = `https://newsapi.org/v2/top-headlines?q=${query}&country=us&category=${newsData.category}&pageSize=${+newsData.pageSize}&page=${pageCount}&apiKey=7594d5d584834ad5bf2b3bdbdd3ec2bc`

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (data && data.articles) {
      pageTotal = Math.ceil(data.totalResults / newsData.pageSize)
      renderNewsArr(data.articles)
      removeBtn()
    }
  } catch (error) {
    console.error(error)
  }
}
// hàm ferchData nhận thông tin từ người dùng setting và từ khoá được search để gọi API , sau khi gọi xong sẽ tính toán
// pageTotal để thực hiện chức năng chuyển trang, đồng thời render ra giao diện dựa theo thông tin cung cấp
submitBtn.addEventListener('click', () => {
  if (inputQuery.value === "") {
    alert("Vui lòng nhập từ khoá cần tìm kiếm !")
  } else {
    pageCount = 1
    loadPageNum()
    removeBtn()
    fetchData()
  }

})
// submit input để gửi dữ liệu search dến fetchData
const loadPageNum = () => {
  pageNum.innerHTML = `${pageCount}`
}
// hiển thị pageCout của trang đang render
const removeBtn = () => {
  if (pageCount === 1) {
    prevBtn.style.opacity = 0.2
  } else if (pageCount >= pageTotal) {
    nextBtn.style.opacity = 0.2
  } else {
    prevBtn.style.opacity = 1
    nextBtn.style.opacity = 1
  }
}
// điểu chỉnh hiển thị của các nút dựa theo trạng thái của trang
nextBtn.addEventListener('click', () => {
  if (pageCount < pageTotal) {
    pageCount += 1
    loadPageNum()
    fetchData()
    removeBtn()
  }
})
prevBtn.addEventListener('click', () => {
  if (pageCount > 1) {
    prevBtn.style.opacity = 1
    pageCount -= 1
    loadPageNum()
    fetchData()
    removeBtn()
  }
})
// các nút thực hiện chức năng chuyển trang