// const { io } = require("socket.io-client")

import {io} from 'socket.io-client/dist/socket.io.js'
// const io=require('socket.io-client')
const joinRoomButton=document.getElementById('room-button')
const roomInput=document.getElementById('room-input')
const messageInput=document.getElementById('message-input')

const form=document.getElementById('form')
const socket=io('https://socket-io-ashy.vercel.app/');
socket.on('connect',()=>{
  displayMessage("you connected with id"+socket.id)
})

socket.on('receive-message',message=>{
  displayReceivedMessage(message)
})
form.addEventListener('submit',e=>{
  e.preventDefault();
  const message=messageInput.value;
  const room=roomInput.value;

  if(message!=='') displayMessage(message)
    socket.emit('send_message',message,room)
  messageInput.value=''
})

joinRoomButton.addEventListener('click',()=>{
  const room=roomInput.value;
  socket.emit('join-room',room,(message)=>{
    displayMessage(message)
  })
})

function displayMessage(message){
  const div=document.createElement('div')
  div.style.width='96vw'
  const p=document.createElement('p')
  div.appendChild(p)
  p.textContent=message
  p.style.width='50vw'
  p.style.padding='0px'
  p.style.whiteSpace = 'normal';
p.style.wordWrap = 'break-word';
  document.getElementById('message-container').append(div);
 
}

function displayReceivedMessage(message){
  const div=document.createElement('div')
  div.style.width='96vw'
  const p=document.createElement('p')
  p.textContent=message
  div.appendChild(p)
  p.style.backgroundColor='#02F9C9';
  p.style.width='50vw'
  p.style.padding='10px'
  p.style.marginLeft='0vw'
  p.style.whiteSpace = 'normal';
p.style.wordWrap = 'break-word';
  
  document.getElementById('message-container').append(div);

}
