import React, { useState, useRef } from 'react'
import SimpleReactValidator from 'simple-react-validator';
import Cookies from 'universal-cookie';
import { Link, useNavigate } from "react-router-dom";
import TextField from 'components/TextField'
function Signup() {
    const cookies = new Cookies();
    let navigate = useNavigate();
    const [userdata, setUserdata] = useState ({email:'', username: '', password:'', fname:'Pratik', lname:'dungarani'})
    const simpleValidator = useRef(new SimpleReactValidator())
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);


    const LoginSubmit = (e) => {
        e.preventDefault()
        if (simpleValidator.current.allValid()){
            cookies.set('userdata', userdata, { path: '/' });
            navigate('dashboard')
        }else{
            simpleValidator.current.showMessages();
            forceUpdate()
        }
    }
    const handleChange = (e) => {
        const {name, value} = e?.target
        setUserdata({...userdata,[name]:value})
    }
  return (
    <div className='login_box bglight'>
        <form onSubmit={(e) => LoginSubmit(e)}>
            <TextField name="username" label="Username" handleChange={handleChange} userdata={userdata} error = {simpleValidator.current.message('username', userdata?.username, 'required')} />

            <TextField name="email" label="Email" handleChange={handleChange} userdata={userdata} error = {simpleValidator.current.message('email', userdata?.email, 'required|email')} />
            <div className='field_row'>
                <label>Password</label>
                <div>
                    <input type="text" name="password" value={userdata?.password} placeholder="*****" onChange={handleChange} />
                </div>
                {simpleValidator.current.message('password', userdata?.password, 'required')} 
            </div>
            <div className='text_right'>
                <Link className='link' to="/">Sign In</Link>
            </div>
            <button>Sign Up</button>
        </form>
    </div>
  )
}

export default Signup