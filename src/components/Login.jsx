import axios from 'axios';
import { useState } from 'react';
import { Button, FormControl, FormGroup, FormLabel, Row, Col } from 'react-bootstrap';


export default function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const login = () => {
    axios.post('https://frontend-take-home-service.fetch.com/auth/login', {
      name: name,
      email: email
    }, {withCredentials: true}).then((response) => {
      if (response.data === "OK") {
        window.location.href = "/home";
      }
    }).catch(e =>
      console.log('Error with logging in: ', e.message)
    )
  }

  return (
    <div style={{ width: '60%', margin: 'auto' }}>
      <h1 className='mb-5'>Welcome! Please log in to select a dog breed.</h1>
      <div >
        <FormGroup >

          <Row className={'mb-4'}>
            <Col md={4} className='form-text-label'>
              <FormLabel>Name: &nbsp;</FormLabel>
            </Col>
            <Col md={8}>
              <FormControl value={name} onChange={(e) => {
                setName(e.target.value)
              }} />
            </Col>
          </Row>

          <Row className={'mb-4'}>
            <Col md={4} className='form-text-label'>
              <FormLabel>Email: &nbsp;</FormLabel>
            </Col>
            <Col md={8}>
              <FormControl value={email} onChange={(e) => {
                setEmail(e.target.value)
              }} />
            </Col>
          </Row>

        </FormGroup>
      </div>
      <Button onClick={(e) => {
        e.preventDefault();
        login();
      }}>Login</Button>
    </div>
  )
}