// frontend javascript
const socket = io('http://localhost:3000')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('message-container')



socket.on('chat-message',data=>{
    appendMessage(`${data.name}:${data.message}`)
})
socket.on('user-connected',name=>{
    appendMessage(`${name}:connected`)
})
messageForm.addEventListener('submit',e=>{
    e.preventDefault()
    const message = messageInput.value
    socket.emit('send-chat-message',message)
    messageInput.value = ""
})

const appendMessage = (message)=>{
    messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}

const name = prompt("what is your name")
appendMessage('you joined')
socket.emit('new-user',name)