import React, { useState,useContext,useEffect } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from "axios"
import {Store} from '../Store.js'
import { toast } from 'react-toastify'; 


const Login = () => {
    const navigate = useNavigate() 

    
    let [email, setEmail] = useState("") 
    let [password, setPassword] = useState("")
    
    const {state, dispatch} = useContext(Store)

    const {userInfo} = state
    // console.log(userInfo);

    let handleSubmit = async (e) =>{ 
        e.preventDefault()
        try{
            const {data} = await axios.post("http://localhost:8000/api/users/signin", {
                email,
                password,
            })
            dispatch({type: "USER_SIGNIN", payload: data})
            localStorage.setItem('userInfo',JSON.stringify(data))
            navigate("/details")
        }catch(err){
            toast.error("Invalid email or password")
        }
    }

    useEffect(() => {
        if(userInfo){
            navigate('/details')
        }
    }, [])
    
    

  return ( 
    <Container className='w-25 border mt-5 p-3' style={{background: "#21B3DC"}}>
        <Alert varriant='primary' className='text-center'>
            <h1 className='loginalert'>Login</h1>
        </Alert>
        <Form>
            <Form.Label htmlFor="inputPassword5" className='login'>
                Email
            </Form.Label>
            <Form.Control
                type="email"
                id="Write Your Email"
                onChange={(e)=> setEmail(e.target.value)}
            />
            <Form.Label htmlFor="inputPassword5" className='login'>
                Password
            </Form.Label>
            <Form.Control
                type="password"
                id="Your Password"
                onChange={(e)=> setPassword(e.target.value)}
            />
        </Form>
        <Button 
            className='mt-3 mb-3 loginbtn'
            variant="primary"
            onClick={handleSubmit}
            >
            Signin
        </Button>
        <br/>
        <Form.Text  id="passwordHelpBlock" muted>
            <span className='login'>Don't Have an Account? {' '}</span>
            <Link to={'/'}>
                <span className='logincreate'>Create Account</span>
            </Link>
        </Form.Text>
    </Container>
  )
}

export default Login



