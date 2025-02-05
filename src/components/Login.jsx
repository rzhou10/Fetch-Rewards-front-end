import axios from 'axios';
import { useState } from 'react';
import { Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap';


export default function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const login = () => {
    axios.post('https://frontend-take-home-service.fetch.com/auth/login', {
      name: name,
      email: email
    }).then((response) => {
      console.log(response)
      if (response.data === "OK") {
        // window.location.href = "/home";
      }
    })
  }

  return (
    <>
      <h1>Welcome! Please log in to select a dog breed.</h1>
      <div>
        <FormGroup >
          <FormLabel>Name: &nbsp;</FormLabel>
          <FormControl value={name} onChange={(e) => {
            setName(e.target.value)
          }} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Enail: &nbsp;</FormLabel>
          <FormControl value={email} onChange={(e) => {
            setEmail(e.target.value)
          }} />
        </FormGroup>
      </div>
      <Button onClick={(e) => {
        e.preventDefault();
        login()
      }}>Login</Button>
    </>
  )
}