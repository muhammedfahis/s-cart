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
            .post('/trpc/user.create')
            .send(requestBody)
        expect(response.statusCode).toEqual(200);      
        expect(response.body.result.data).toMatchObject({
            ...requestBody,
            id: expect.any(String),
            password: expect.any(String),
            status: expect.any(Boolean),
            created_at: expect.any(String),
            updated_at: expect.any(String)
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
            .post('/trpc/user.create')
            .send(requestBody)
        expect(response.statusCode).toEqual(400);
    });

    test('should throw error for existing user',async() => {
        const user = await global.createUser();
        const response = await request(app)
            .post('/trpc/user.create')
            .send(user)
        expect(response.statusCode).toEqual(400);
    });
});


describe('user login',() => {
    test('should login successfully',async() => {
        const user = await global.createUser(); 
        const response = await request(app)
           .post('/trpc/user.login')
           .send({ email: user.email, password: user.password })
        expect(response.statusCode).toEqual(200);
        expect(response.body.result.data).toHaveProperty('id');
        expect(response.body.result.data).toHaveProperty('email');
        expect(response.body.result.data).toHaveProperty('firstName');
        expect(response.body.result.data).toHaveProperty('lastName');
        expect(response.body.result.data).toHaveProperty('status');
    });

    test('should throw error for invalid credentials',async() => {
        const response = await request(app)
           .post('/trpc/user.login')
           .send({ email: 'test@test.com', password: 'wrong' })
        expect(response.statusCode).toEqual(500);
    });
});

describe('user logout',() => {
    test('should logout successfully',async() => {
        const token =  global.signup();
        const response = await request(app)
           .post('/trpc/user.logout')
           .set('Cookie', token)
           console.log(response.body);
           
        expect(response.statusCode).toEqual(200);
        expect(response.body.result.data).toMatchObject({
            success:true
        });
    });
});

describe('block user',() => {
    test('should block user successfully',async() => {
        const user = await global.createUser();
        const loginResponse = await request(app)
            .post('/trpc/user.login')
            .send({ email: user.email, password: user.password });   
        const cookie = loginResponse.headers['set-cookie'];
        const response = await request(app)
           .post('/trpc/user.block')
           .set('Cookie', cookie)
           .send({
            id: user.id
           })     
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toMatchObject({
            data: 'Blocked User Successfully.'
        });
    });
});

describe('unblock user',() => {
    test('should unblock user successfully',async() => {
        const user = await global.createUser();
        const loginResponse = await request(app)
            .post('/trpc/user.login')
            .send({ email: user.email, password: user.password });   
        const cookie = loginResponse.headers['set-cookie'];
        const response = await request(app)
           .post('/trpc/user.unblock')
           .set('Cookie', cookie)
           .send({
            id: user.id
           })
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toMatchObject({
            data: 'Unblocked User Successfully.'
        });
    });
})