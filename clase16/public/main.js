const socket = io.connect()
// PRODUCTOS
const productForm = document.getElementById('productForm')
const tbodyProducts = document.getElementById('tbodyProducts')
const productFormError = document.getElementById('productFormError')

// CHAT
const messageList = document.getElementById('messageList')
const chatForm = document.getElementById('chatForm')
const chatFormError = document.getElementById('chatFormError')

// KEYS and API URL
const keys = {
  PRODUCTS: 'PRODUCTS',
  ADD_PRODUCT: 'ADD_PRODUCT',
  CHAT_MESSAGES: 'CHAT_MESSAGES',
  CHAT_ADD_MESSAGE: 'CHAT_ADD_MESSAGE',
}

const API = 'http://localhost:8080'

socket.on(keys.PRODUCTS, renderProductList)
socket.on(keys.CHAT_MESSAGES, renderChatMessages)

productForm.addEventListener('submit', handleSubmit_productForm)
chatForm.addEventListener('submit', handleSubmit_chatForm)

// HANDLE EVENTS

function handleSubmit_productForm(event) {
  event.preventDefault()
  const { title, price, thumbnail } = event.target
  addProduct({
    title: title.value,
    price: price.value,
    thumbnail: thumbnail.value,
  })
}

function handleSubmit_chatForm(event) {
  event.preventDefault()
  const { email, message } = event.target
  addMessage({ email: email.value, message: message.value })
}

// API SERVICE

function addProduct({ title, price, thumbnail }) {
  const newProduct = { title, price, thumbnail }

  fetch(`${API}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProduct),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) return renderProductError(res.error)
      socket.emit(keys.ADD_PRODUCT)
      productFormError.innerHTML = ''
      productForm.reset()
    })
    .catch((error) => console.error(error))
}

function addMessage({ email, message }) {
  const newMessage = { email, message, date: Date.now() }

  fetch(`${API}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newMessage),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) return renderChatError(res.error)
      socket.emit(keys.CHAT_ADD_MESSAGE)
      chatFormError.innerHTML = ''
      chatForm.message.value = ''
    })
    .catch((error) => console.error(error))
}

// RENDER

function renderProductList(data) {
  if (data.length === 0)
    return (tbodyProducts.innerHTML =
      '<div class="alert alert-danger mt-4">No hay productos</div>')

  const htmlProductList = data
    .map((product) => {
      return `
      <tr>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td width="150px">
          <img src="${product.thumbnail}" alt="${product.thumbnail}" width="125px"/>
        </td>
      </tr>
    `
    })
    .join('')

  tbodyProducts.innerHTML = htmlProductList
}

function renderChatMessages(data) {
  const htmlMessageList = data
    .map((message) => {
      return `
      <p>
        <span class="fw-bold text-danger">${message.email}</span>
        <span class="fw-bold text-success">(${new Date(
          message.date
        ).toLocaleString()}): </span>
        <span>${message.message}</span>
      </p>
    `
    })
    .join('')

  messageList.innerHTML = htmlMessageList
}

function renderProductError(message) {
  productFormError.innerHTML = `
  <div class="alert alert-danger">
    ${message}
  </div>
  `
}

function renderChatError(error) {
  chatFormError.innerHTML = `
      <div class="text-danger mt-1">
        ${error}
      </div>
      `
}