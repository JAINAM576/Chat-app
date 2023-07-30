import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios';
import signup from '../assets/signup.jpg'
import StarsCanvas from './stars';
import eye from '../assets/eye.png'
import invisible from '../assets/invisible.png'


const initialstate = {
    fullName: "",
    Username: "",
    PhoneNumber: "",
    AvatarURL: "https://www.bing.com/ck/a?!&&p=6a0789bc5ca44558JmltdHM9MTY4ODYwMTYwMCZpZ3VpZD0xNTEyOGZkMy1kMjdlLTZmZDItMTU0NC05ZjkxZDNkMzZlYTMmaW5zaWQ9NTU2OQ&ptn=3&hsh=3&fclid=15128fd3-d27e-6fd2-1544-9f91d3d36ea3&u=a1L2ltYWdlcy9zZWFyY2g_cT11c2VyIGljb24mRk9STT1JUUZSQkEmaWQ9N0E3OEU3ODYxNzE3RkEwNkFCMUEzMEIxQUYwNTU3MUFDQzVCMzg4Mw&ntb=1",
    Password: "",
    ConfirmPassword: "",

}
const cookies = new Cookies();
const Auth = () => {
    const [hide, sethide] = useState(true)
    const show=()=>{

        sethide((prev)=>!prev)
        if(document.getElementById('pass')){
         hide?document.getElementById('pass').type='text':document.getElementById('pass').type='password'
        }
    }

    const [issignup, setissignup] = useState(false)
    const [form, setForm] = useState(initialstate);
    const check = (e) => {

        if ((/[0-9]/).test(e.target.value) || e.target.value === "") {

            return true;
        }


        return false;

    }
    const handlechange = (e) => {
        let checking = true;
        if (e.target.name === 'PhoneNumber') {
            checking = check(e);

        }

        if (checking) {

            setForm({ ...form, [e.target.name]: e.target.value })
        }
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        document.getElementById('btn').innerText="Loading..."
        const { Username, Password, PhoneNumber, AvatarURL,ConfirmPassword } = form;
        const url = 'https://chat-app-server1-6qv5.onrender.com/auth'
        // const url = 'http://localhost:5000/auth'
        if(Password!==ConfirmPassword && issignup){

    if( document.getElementById('error3')){
    document.getElementById('error3').style.display='block'
    setTimeout(() => {
        if( document.getElementById('error3')){

            document.getElementById('error3').style.display='none'
        }
        
    },2000);
}
document.getElementById('btn').innerText='Sign Up'

return ;
} 
  
    
       const { data: { token, userId, haseshpass,message,fullName}  } = await axios.post(`${url}/${issignup ? 'signup' : 'login'}`, {
           fullName:form.fullName, Username, Password, PhoneNumber, AvatarURL,
       })
      
        if(message && message.length){
            
            if(message[1]==='1'){
                if(document.getElementById('error')){
                document.getElementById('error').style.display='block'
                setTimeout(() => {
                    if( document.getElementById('error')){

                        document.getElementById('error').style.display='none'
                    }
                }, 2000);

            }
            
        }
        if(message[1]==='2'){
            if(  document.getElementById('error1')){
                
                document.getElementById('error1').style.display='block'
                    setTimeout(() => {
                        if( document.getElementById('error1')){

                            document.getElementById('error1').style.display='none'
                        }
                    }, 2000);
                }
            }
        if(message[1]==='3'){
            if(  document.getElementById('error5')){
                
                document.getElementById('error5').style.display='block'
                    setTimeout(() => {
                        if( document.getElementById('error5')){

                            document.getElementById('error5').style.display='none'
                        }
                    }, 2000);
                }
             
            }
            document.getElementById('btn').innerText="Sign in"
            return ;
        }
        
  
            
   

        cookies.set('fullName', fullName);
        cookies.set('Username', Username);
        cookies.set('token', token)
        cookies.set('userId', userId)
        if (issignup) {
            cookies.set('PhoneNumber', PhoneNumber)
            cookies.set('AvatarURL', AvatarURL)
            cookies.set('haseshpass', haseshpass)



        }
        window.location.reload();
    }

    const switchmode = () => {
        setissignup((prev) => !prev)
    }
    return (
        
        <div className="auth__form-container" id="colors">
 
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p id='logins'>
                        <p className='logins' id={!issignup?'dim':' '}   onClick={issignup?switchmode:()=>{}}>
                        
                       Sign in
                    
                        </p>
                        <p className='logins' id={issignup?'dim':' '}    onClick={!issignup?switchmode:()=>{}}>
Sign Up
                </p>
                        </p>
                       
                    <form action="" onSubmit={handlesubmit} className="">
                        {
                            issignup && (
                                
                                <div className="names"> 
                                <div className="auth__form-container_fields-content_input">
                                    <label htmlFor="fullName">Full Name</label>
                                    <input name="fullName"
                                        type='text'
                                        onChange={handlechange}
                                        placeholder='Enter Your Name'
                                        required
                                        />
                                </div>
                                <div className="auth__form-container_fields-content_input">
                            <label htmlFor="Username">Username</label>
                            <input name="Username"
                                type='text'
                                onChange={handlechange}
                                placeholder='Username'
                                required
                            />
                         <div className="error" id="error5">
                        Username is alredy exist.Try another..
                            </div>
                        </div>
                                        </div>
                                       
                             
                            )

                        }

                        {!issignup && (<div className="auth__form-container_fields-content_input">
                            <label htmlFor="Username">Username</label>
                            <input name="Username"
                                type='text'
                                onChange={handlechange}
                                placeholder='Username'
                                required
                            />
                                 <div className="error" id="error">
                                User not found.
                            </div>
                        </div>
                        )}
                        
{                            issignup && (
                                <div className="auth__form-container_fields-content_input">
                                    <label htmlFor="PhoneNumber">Phone Number</label>
                                    <input name="PhoneNumber"
                                        type='text'
                                        placeholder='Phone Number'
                                        value={form.PhoneNumber}
                                        onChange={handlechange}
                                        maxLength={10}
                                        id="number"
                                        inputMode='numeric'
                                        required
                                        
                                    />
                                </div>
                            )

                        }
                        {
                            issignup && (
                                <div className="auth__form-container_fields-content_input">
                                    <label htmlFor="AvatarURL">Avatar URL</label>
                                    <input name="AvatarURL"
                                        type='text'
                                        alt=''
                                        onChange={handlechange}
                                        placeholder='Avatar URL'
                                        inputMode='url'
                                    />
                                </div>
                            )

                        }
                        <div className="auth__form-container_fields-content_input " >
                            <label htmlFor="Password">Password</label>
                            <div className="iconp">
                                
                            <input name="Password"
                            id="pass"
                            type="password"
                            alt=''
                                onChange={handlechange}
                                placeholder='Password'
                                required
                            />
                            <img src={hide?eye:invisible} alt=""  onClick={show} />

                            </div>
                            {!issignup?(
<div className="error" id="error1">
Password is incorrect.
</div>
                            ):(<></>)}
                        </div>
                        {issignup && (<div className="auth__form-container_fields-content_input">
                            <label htmlFor="ConfirmPassword">Confirm Password</label>
                            <input name="ConfirmPassword"
                                type="password"
                                alt=''
                                onChange={handlechange}
                                placeholder='Confirm Password'

                                required
                            />
                            <div className="error" id="error3">
Password doesn't match.
                            </div>
                        </div>)
                        }
                        <div className="auth__form-container_fields-content_button">
                            <button id="btn">

                                {issignup ? 'Sign Up' : 'Sign IN'}
                            </button>
                        </div>
                    </form>
              
                </div>
            </div>
      
        </div>
    )
}

export default Auth
