'use strict'
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const inputTask = $('#input-task')
const listTodo = $('#todo-list')
const addTodoBtn = $('#btn-add')

class Todo {
  constructor(task, owner, isDone) {
    this.task = task,
      this.owner = owner,
      this.isDone = isDone
  }
}
// cấu trúc đối tượng Todo
const todoArr = JSON.parse(getFromStorage('todoList')) ?? []
const currentUser = JSON.parse(getFromStorage('currentUser'))
const renderTodoList = (arrs) => {
  const totoCurrent = arrs.filter((arr) => {
    return arr.owner === currentUser[0].userName
  }
  )
  const html = totoCurrent.map((todo, index) => {
    return `<li class= ${todo.isDone === true ? "checked" : null}>
    <p class="todo-task">${todo.task}</p>
    <span class="close">×</span>
					</li>`
  })
  return listTodo.innerHTML = html.join('')
}
// render TodoList của người dùng đã đăng nhập ra giao diện 
renderTodoList(todoArr)
addTodoBtn.addEventListener('click', () => {
  const hadTodo = todoArr.some((todo) => todo.task === inputTask.value)
  if (!currentUser) {
    window.location.href = "./login.html";
  } else if (inputTask.value.trim() === "") {
    alert("Vui lòng không để trống todo")
  } else if (hadTodo) {
    alert("Công việc này đã có trong danh sách")
  } else {
    const newTodo = new Todo(inputTask.value, currentUser[0].userName, false)
    inputTask.value = ""
    // reset input
    inputTask.focus()
    // focus vào input
    todoArr.push(newTodo)
    // thêm todo mới vào mảng todo
    saveToStorage('todoList', JSON.stringify(todoArr))
    // lưu xuống local
    renderTodoList(todoArr)
    // render ra giao diện
  }
})
// thêm todo vào danh sách, nếu các todo trùng nhau sẽ cảnh báo ,
listTodo.addEventListener('click', (event) => {
  const todoItem = event.target.closest('.todo-task')
  const deleteBtn = event.target.closest('.close')
  if (todoItem) {
    const todoIndex = todoArr.findIndex((todo) => todo.task === todoItem.textContent.trim())
    todoArr[todoIndex].isDone = !todoArr[todoIndex].isDone
    saveToStorage('todoList', JSON.stringify(todoArr))
    renderTodoList(todoArr)
  }
  if (deleteBtn) {
    const todoIndex = todoArr.findIndex((todo) => todo.task === deleteBtn.previousSibling.previousSibling.textContent.trim())
    if (todoIndex !== -1) {
      todoArr.splice(todoIndex, 1)
      saveToStorage('todoList', JSON.stringify(todoArr))
      renderTodoList(todoArr)
    }
  }
})
// click vào todo để đổi trạng thái của isdone và render ra giao diện,
// click vào nút xoá sẽ xoá khỏi todoArr và cập nhật xuống local.
// ở đoạn 68, ví khi click vào deleteBtn ta muốn đọc được todo của item được click nên phải dùng 2 lần prevSib, để có thể đọc đến thẻ chứa đoạn text cần tìm.
