

import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

describe('create product', () => {
    test('should create product', async () => {
        const response = await request(app)
            .post('/api/products/')
            .set('Cookie', global.signup())
            .send({
                name: 'product 1',
                price: 100,
                quantity: 10,
                category: 'category 1',
                description: 'product 1 description'
            })
            .expect(201);
        expect(response.body.name).toEqual('product 1');
        expect(response.body.price).toEqual(100);
        expect(response.body.quantity).toEqual(10);
        expect(response.body.category).toEqual('category 1');
        expect(response.body.description).toEqual('product 1 description');
        expect(response.body.id).toBeDefined();
    });

    test('should throw error product already exists', async () => {
        const product1 = await request(app)
            .post('/api/products/')
            .set('Cookie', global.signup())
            .send({
                name: 'product 1',
                price: 100,
                quantity: 10,
                category: 'category 1',
                description: 'product 1 description'
            })
            .expect(201);
        const product2 = await request(app)
            .post('/api/products/')
            .set('Cookie', global.signup())
            .send({
                name: 'product 1',
                price: 100,
                quantity: 10,
                category: 'category 1',
                description: 'product 1 description'
            })
        expect(product2.status).toBe(400);
    });

});

describe('update Product', () => {
    test('should update product', async () => {
        const product = await request(app)
            .post('/api/products/')
            .set('Cookie', global.signup())
            .send({
                name: 'product 1',
                price: 100,
                quantity: 10,
                category: 'category 1',
                description: 'product 1 description'
            })
            .expect(201);

        const updatedResponse = await request(app)
            .put(`/api/products/${product.body.id}`)
            .set('Cookie', global.signup())
            .send({
                name: 'updated product 1',
                price: 200,
                quantity: 20,
                category: 'updated category 1',
                description: 'updated product 1 description'
            })
            .expect(200);

        expect(updatedResponse.body.name).toEqual('updated product 1');
    });

    test('should throw error product not found', async () => {
        const randomId = new mongoose.Types.ObjectId().toHexString();
        const product = await request(app)
            .put('/api/products/' + randomId)
            .set('Cookie', global.signup())
            .send({
                name: 'product 1',
                price: 100,
                quantity: 10,
                category: 'category 1',
                description: 'product 1 description'
            })
            .expect(400);
    })

})

describe('delete product', () => {
    test('should delete product', async () => {
        const product = await request(app)
            .post('/api/products/')
            .set('Cookie', global.signup())
            .send({
                name: 'product 1',
                price: 100,
                quantity: 10,
                category: 'category 1',
                description: 'product 1 description'
            })
            .expect(201);
        const deleteResponse = await request(app)
            .delete(`/api/products/${product.body.id}`)
            .set('Cookie', global.signup())
            .send()
            .expect(204);

    })
})

describe('should get All Products', () => {
    test('should get all products', async () => {
        await request(app)
           .post('/api/products/')
           .set('Cookie', global.signup())
           .send({
                name: 'product 1',
                price: 100,
                quantity: 10,
                category: 'category 1',
                description: 'product 1 description'
            })
           .expect(201);

        const response = await request(app)
           .get('/api/products/')
           .set('Cookie', global.signup())
           .send()
           .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    })
});

describe('get a single product', () => {
    test('get a single product', async() => {
        const product = await request(app)
           .post('/api/products/')
           .set('Cookie', global.signup())
           .send({
                name: 'product 1',
                price: 100,
                quantity: 10,
                category: 'category 1',
                description: 'product 1 description'
            })
           .expect(201);

        const response = await request(app)
           .get(`/api/products/${product.body.id}`)
           .set('Cookie', global.signup())
           .send()
           .expect(200);

        expect(response.body.id).toEqual(product.body.id);
    })
})



