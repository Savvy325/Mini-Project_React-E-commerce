import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap';

function UserManagement() {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        event.preventDefault();
        let { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form submitted with data:', userData);
        try {
            const createUserResponse = await fetch('https://dummyjson.com/users/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: userData.username,
                    email: userData.email,
                    password: userData.password
                })
            });
            const createdUserData = await createUserResponse.json();
            console.log('User created successfully:', createdUserData);

            setUserData({
                username: '',
                email: '',
                password: ''
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleUpdateUser = async () => {
        try {
            const response = await axios.put('https://dummyjson.com/users/1', userData);
            console.log('User updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
    const handleDeleteUser = async () => {
        try {
            const response = await axios.delete('https://dummyjson.com/users/1');
            console.log('User deleted successfully:', response.data);
        } catch (error) {
            console.error('Error deleting user:', error);
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
                                value={userData.username}
                                onChange={handleChange} />
                        </FloatingLabel>
                        <FloatingLabel controlId="email" label="Email">
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={userData.email}
                                onChange={handleChange} />
                        </FloatingLabel>
                        <FloatingLabel controlId="password" label="Password">
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={userData.password}
                                onChange={handleChange} />
                        </FloatingLabel>
                        <Button variant='outline-info' type='submit' className='mt-4'>Create User</Button>
                        <Button variant='outline-primary' onClick={handleUpdateUser} className='mt-3'>Update User</Button>
                        <Button variant='outline-danger' onClick={handleDeleteUser} className='mt-3'>Delete User</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default UserManagement;