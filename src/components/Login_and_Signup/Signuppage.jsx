import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { emailvalidator, passwordvalidator, usernamevalidator } from './Regexvalidator';
import '../../assets/css/Login_and_Signup/Signuppage.css';

const Signuppage = () => {
  const navigate = useNavigate();

  const [inputt, setInputt] = useState({ username: '', email: '', password: '' });
  const [errmsg, setErrmsg] = useState('');

  const changeHandlerr = (e) => {
    setInputt({ ...inputt, [e.target.name]: e.target.value });
  }

  const onClickeventt = async (e) => {
    e.preventDefault();
    if (!emailvalidator(inputt.email)) {
      setErrmsg("Enter a valid email id");
    } else if (!usernamevalidator(inputt.username)) {
      setErrmsg("Enter a valid username");
    } else if (!passwordvalidator(inputt.password)) {
      setErrmsg("Password must have length of 8");
    } else {
      try {
        const response = await fetch('http://localhost:5001/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputt),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          navigate('/login');
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error("There was an error registering!", error);
      }
    }
  }
  return (
    <div className='container'>
      <h1 className='ltext'>Create a new account</h1><br></br><br></br>
      {errmsg.length>0 &&(<div style={{color:'red',backgroundColor:'black'}}>{errmsg}</div>)}
      <div className="inputdiv">
      <input className='inputl' type='text' placeholder='Enter username' name='username' onChange={changeHandlerr}/>
      <input className='inputl' type='email' placeholder='Enter email' name='email' onChange={changeHandlerr}/>
      <input className='inputl' type='password' placeholder='Enter password' name='password' onChange={changeHandlerr}/>
      </div>
      <hr></hr>
      <div className="buttonouter">
      <div className="buttondiv">
      <button className='loginbutton' onClick={onClickeventt}>Sign Up</button>
      <button className='loginbutton' onClick={()=>navigate('/login')}>Sign In?</button>
      </div>
      </div>
    </div>
  )
}

export default Signuppage


