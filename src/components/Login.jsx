import React, { useState, useContext } from 'react';
import { Container, Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// internal imports
import UserContext from '../context/UserContext';

function Login() {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });
    const { setUser } = useContext(UserContext); 
    const navigate = useNavigate(); 

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginData({ ...loginData, [name]: value });
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });
            const data = await response.json();
            console.log('Login successful:', data);
    
            const { username } = data;
            sessionStorage.setItem('user', JSON.stringify({ name: username, isLoggedIn: true }));
            setUser({ name: username, isLoggedIn: true });
            navigate('/');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <Container fluid className='vh-100 p-0'>
            <Row className='h-50 my-auto w-100 justify-content-center'>
                <Col xs={9} sm={6} className=''>
                    <Form onSubmit={handleSubmit} className='w-100 p-4 border rounded mt-5'>
                        <FloatingLabel controlId="userName" label="User Name">
                            <Form.Control 
                                type="text" 
                                name="username" 
                                placeholder="User Name" 
                                value={loginData.username} 
                                onChange={handleChange} />
                        </FloatingLabel>
                        <FloatingLabel controlId="password" label="Password">
                            <Form.Control 
                                type="password" 
                                name="password" 
                                placeholder="Password" 
                                value={loginData.password} 
                                onChange={handleChange} />
                        </FloatingLabel>
                        <Button variant='outline-info' type='submit' className='mt-4'>Login</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default React.memo(Login);