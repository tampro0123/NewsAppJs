'use strict'
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const containerNew = $('#news-container')
const prevBtn = $('#btn-prev')
const nextBtn = $('#btn-next')
const pageNum = $('#page-num')
let pageCount = 1
let pageTotal

const dataNews = JSON.parse(localStorage.getItem("dataNews"))


let newsarr
// lấy mảng các tin tức từ localStorage
// lấy thông tin về category và pageSize người dùng muốn hiển thị
const loadNews = () => {
  getData(pageCount).then((data) => {
    saveToStorage("news", JSON.stringify(data.articles))

    newsarr = JSON.parse(getFromStorage('news'))
    renderNews(newsarr)
    if (dataNews && dataNews.pageSize) {
      pageTotal = Math.ceil(data.totalResults / dataNews.pageSize)
    } else {
      pageTotal = Math.ceil(data.totalResults / data.articles.length)
    }

    removeBtn()
  }).catch(err => {
    console.log(err)
  })
}
const renderNews = (news) => {
  containerNew.innerHTML = news.map((newItem) => {
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

// render mảng newsarr lấy được trước đó ra giao diện người dùng
loadNews()


// hàm điều chỉnh pageCount cho api, mỗi khi thay đổi pageCount sẽ thay đổi api để gọi 1 data news mới, sau đó lưu nó lên local
// sau khi lưu lên local gọi lại nó trở về để lấy mảng vừa đưa lên và chạy hàm renderNews để render ra giao diện,
// chạy hàm removeBtn được định nghĩa ở dưới
const loadPageNum = () => {
  pageNum.innerHTML = `${pageCount}`
}
// dựa trên pageCount từ api được lấy hiển thị ra giao diện
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
// Ẩn hiện các nút khi hoạt động và khôn hoạt động
nextBtn.addEventListener('click', () => {
  if (pageCount < pageTotal) {
    pageCount += 1
    loadPageNum()
    loadNews()
  }
})
// chuyển trang dựa theo pageCount
prevBtn.addEventListener('click', () => {
  if (pageCount > 1) {
    prevBtn.style.opacity = 1
    pageCount -= 1
    loadPageNum()
    loadNews()
  }
})