import React,{useRef, useEffect, useState} from 'react'
import { addDoc, collection, serverTimestamp, orderBy, getDocs, deleteDoc, query, onSnapshot } from "firebase/firestore"; 
import "../Chat/Chat.css"
import {AttachFileOutlined, SentimentSatisfiedOutlined, CameraAlt, Send, AccountCircle, DeleteForever} from '@mui/icons-material';
import {db} from '../../firebase'
import Message from '../Message/Message';

function Chat() {
    const [message, setMessage] = useState([])
    const [input, setInput] = useState("")
    const [username, setUsername] = useState("")
    const chatRef = useRef(null);
    useEffect(() => {
      chatRef.current?.scrollIntoView();
    }, [message]);
    const messagesRef = collection(db, "messages");
    const sortedMessagesRef = query(messagesRef,orderBy("time","asc"))
    useEffect(() => {
        let name = null;
        while(!name || !name.trim()){
            name = prompt("Enter your name")
        }
        setUsername(name.toLowerCase())
        const q = query(sortedMessagesRef)
        const unsubscribe = onSnapshot(q,(snapshot)=>{
        setMessage(snapshot.docs.map((doc) => ({...doc.data(),id: doc.id})))
        });
        return ()=>{
            unsubscribe();
        }
    }, [])

    const sendMessage = (e)=>{
        e.preventDefault()
        setInput("")
        addDoc(messagesRef,{username: username,message: input,time: serverTimestamp()})
    }
    const clearChat = async()=>{
        const data = await getDocs(messagesRef)
        data.docs.map((doc)=>{
            deleteDoc(doc.ref);
        })
    }
  return (
    <div className="chat-ctn">
        <div className='chat-header'>
            <AccountCircle className='avatar-icon'/>
            <h3 className='groupName'>Mowa bro's 🙏</h3>
            <DeleteForever className='trash' onClick={clearChat}/>
        </div>
        <div className='chat-body' >
            {
                message.map((element)=>(
                    <Message key={element.id} text={element.message} username={element.username} currUser={username}/>
                ))
            }
            <div ref={chatRef}/>
        </div>
        <div className='chat-footer'>
            <form>
                <div className='input-feild'>
                    <SentimentSatisfiedOutlined/>
                    <input value={input} type="text" onChange={(e)=>setInput(e.target.value)} />
                    <AttachFileOutlined/>
                    <CameraAlt/>
                </div>
                <button type='submit' onClick={sendMessage} className='send'>
                    <Send/>
                </button>
            </form>
        </div>
    </div>
  )
}

export default Chat