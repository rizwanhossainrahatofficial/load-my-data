import { StrictMode, useEffect, useRef, useState } from 'react';
import './App.css';


function App() {
  const [users,setUsers]=useState([])
  const nameRef=useRef()
  const emailRef=useRef()
 
  

  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res=>res.json())
    .then(data=>setUsers(data))
  },[])

  const handleAddUser=e=>{
   const name=nameRef.current.value;
    const email=emailRef.current.value;
    const newUser={name:name,email:email}

  //  send data the server
  fetch('http://localhost:5000/users',{
    method:'post',
    headers:{
      'content-type':'application/json',
    },
    body:JSON.stringify(newUser)
  })
  .then(res=>res.json())
  .then(data=>{
    console.log(data)
    const addedUser=data;
     const newUser=[...users,addedUser];
    setUsers(newUser);
  });
  nameRef.current.value='';
  emailRef.current.value='';
    e.preventDefault();
  }
 
  
  return (
    <div className="App">
    {users.length}

    <form onSubmit={handleAddUser}>
      <input type="text" ref={nameRef} placeholder='name' />
      <input type="email" ref={emailRef} name="" id="" placeholder='email' />
      <input type="submit" value="submit" />
    </form>

    {
      users.map(user=><li key={user.id}>id:{user.id} {user.name}  email:{user.email}</li>)
    }



    </div>
  );
}

export default App;
