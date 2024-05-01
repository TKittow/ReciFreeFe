import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const userRef = useRef()
    const emailRef = useRef()
    const pwdRef = useRef()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();
        const user = {
          username: userRef.current.value,
          email: emailRef.current.value,
          password: pwdRef.current.value,
        };
    
        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/signup/`,
          user,
          {
            headers: { "Content-Type": "application/json" },
          },
          {
            withCredentials: true,
          }
        );
        console.log(data)
        navigate('/login')
      }
      async function handleLoginChange(e) {
        e.preventDefault();
        navigate('/login')
      }

  return (
    <>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" ref={userRef} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" ref={emailRef} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" ref={pwdRef} required />
      </Form.Group>
      <div className="mt-2">
        <Button type="submit" variant="primary">
          Sign Up
        </Button>
      </div>
    </Form>
    <Form onSubmit={handleLoginChange} className="loginChanger">
      <Form.Label>Already Have an account?</Form.Label>
      <br />
      <Button type="submit" variant="secondary">Move To Login</Button>
    </Form>
    </>
  )
}