import request from 'supertest';
import { app } from '../../app';





describe('user signup',() => {
    test('should signup successfully',async() => {
        const requestBody = {
            email: 'test@test.com',
            password: 'test123',
            firstName: 'Test',
            lastName: 'User'
        }
        const response = await request(app)
            .post('/api/users/create')
            .send(requestBody)
        expect(response.statusCode).toEqual(201);
        expect(response.body).toMatchObject({
            ...requestBody,
            id: expect.any(String),
            password: expect.any(String), 
            status: expect.any(Boolean)  
        })
    });

    test('should throw error for invalid params',async() => {
        const requestBody = {
            email: 'testest.com',
            password: 'test123',
            firstName: 'Test',
            lastName: 'User'
        }
        const response = await request(app)
            .post('/api/users/create')
            .send(requestBody)
        expect(response.statusCode).toEqual(400);
    });

    test('should throw error for existing user',async() => {
        const user = await global.createUser();
        const response = await request(app)
            .post('/api/users/create')
            .send(user)
        expect(response.statusCode).toEqual(400);
    });
});


describe('user login',() => {
    test('should login successfully',async() => {
        const user = await global.createUser(); 
        const response = await request(app)
           .post('/api/users/login')
           .send({ email: user.email, password: user.password })
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('email');
        expect(response.body).toHaveProperty('firstName');
        expect(response.body).toHaveProperty('lastName');
        expect(response.body).toHaveProperty('status');
    });

    test('should throw error for invalid credentials',async() => {
        const response = await request(app)
           .post('/api/users/login')
           .send({ email: 'test@test.com', password: 'wrong' })
        expect(response.statusCode).toEqual(400);
    });
});

describe('user logout',() => {
    test('should logout successfully',async() => {
        const token =  global.signup();
        const response = await request(app)
           .post('/api/users/logout')
           .set('Cookie', token)
        expect(response.statusCode).toEqual(200);
        expect(response.body).toMatchObject({
            message: 'Logged out successfully'
        });
    });
});

describe('block user',() => {
    test('should block user successfully',async() => {
        const user = await global.createUser();
        const loginResponse = await request(app)
            .post('/api/users/login')
            .send({ email: user.email, password: user.password });   
        const cookie = loginResponse.headers['set-cookie'];
        const response = await request(app)
           .post('/api/users/block/'+ user.id)
           .set('Cookie', cookie)
           .send()
        expect(response.statusCode).toEqual(200);
        expect(response.body).toMatchObject({
            message: 'User blocked successfully'
        });
    });
});

describe('unblock user',() => {
    test('should unblock user successfully',async() => {
        const user = await global.createUser();
        const loginResponse = await request(app)
            .post('/api/users/login')
            .send({ email: user.email, password: user.password });   
        const cookie = loginResponse.headers['set-cookie'];
        const response = await request(app)
           .post('/api/users/unblock/'+ user.id)
           .set('Cookie', cookie)
           .send()
        expect(response.statusCode).toEqual(200);
        expect(response.body).toMatchObject({
            message: 'User unblocked successfully'
        });
    });
})