import React, { useState, useRef } from 'react'
import SimpleReactValidator from 'simple-react-validator';
import Cookies from 'universal-cookie';
import { Link, useNavigate } from "react-router-dom";
import TextField from 'components/TextField'
import { useSelector } from 'react-redux'

export default function Login() {
    const cookies = new Cookies();
    let navigate = useNavigate();
    const [userdata, setUserdata] = useState ({email:'',password:'', fname:'Pratik', lname:'dungarani'})
    const simpleValidator = useRef(new SimpleReactValidator())
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    let users = useSelector((state) => state?.rootReducer?.udata);
    const [error, setError] = useState(false)
    const LoginSubmit = (e) => {
        e.preventDefault()
        if (simpleValidator.current.allValid()){
           let getuser = users.find((user) => user?.email === userdata?.email)
            if( users.find((user) => user?.email === userdata?.email ) ) {
                cookies.set('userdata', getuser, { path: '/' });
                navigate('dashboard')
            }else{
                setError(true)
            }
        }else{
            setError(false)
            simpleValidator.current.showMessages();
            forceUpdate()
        }
    }
    const handleChange = (e) => {
        const {name, value} = e?.target
        setUserdata({...userdata,[name]:value})
    }
  return (
      <>
            <h1 className='text_center login_header'> Login </h1>
            <div className='login_box bglight'>
                <div>
                    <form onSubmit={(e) => LoginSubmit(e)}>
                        {error && <p className='srv-validation-message'>User Does not exist</p>}
                        <TextField name="email" label="Email" handleChange={handleChange} userdata={userdata}  error = {simpleValidator.current.message('email', userdata?.email, 'required|email')} />
                        <div className='field_row'>
                            <label>Password</label>
                            <div>
                                <input type="text" name="password" value={userdata?.password} placeholder="*****" onChange={handleChange} />
                            </div>
                            {simpleValidator.current.message('password', userdata?.password, 'required')} 
                        </div>
                        <div className='text_right'>
                            <Link className='link' to="/signup">Sign up here</Link>
                        </div>
                        <button>Sign in</button>
                    </form>
                </div>
            </div>
      </>
  )
}
