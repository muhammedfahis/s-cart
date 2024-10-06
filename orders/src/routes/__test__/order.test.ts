import request from 'supertest';
import { app } from '../../app';





describe('create order', () => {
    test('should create order with 201', async () => {
        const response = await request(app)
            .post('/api/orders/')
            .set('Cookie', global.signup())
            .send({
                "items": [
                    {
                        "product_id": "asgsfag",
                        "unit_price": 20,
                        "quantity": 2
                    },
                    {
                        "product_id": "asgsasdfas",
                        "unit_price": 40,
                        "quantity": 2
                    }
                ]
            })
        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
        expect(response.body.total_price).toBe(120);
    });

    test('should throw error with 400', async () => {
        const response = await request(app)
            .post('/api/orders/')
            .set('Cookie', global.signup())
            .send({
                "items": [
                    {
                        "product_id": "asgsfag",
                        "unit_price": 20,
                        "quantity": 2
                    },
                    {
                        "product_id": "asgsasdfas",
                        "unit_price": 40
                    }
                ]
            })
        expect(response.status).toBe(400);
    });
});

describe('get order', () => {
    test('should get orders with 200', async () => {
        await request(app)
            .post('/api/orders/')
            .set('Cookie', global.signup())
            .send({
                "items": [
                    {
                        "product_id": "asgsfag",
                        "unit_price": 20,
                        "quantity": 2
                    },
                    {
                        "product_id": "asgsasdfas",
                        "unit_price": 40,
                        "quantity": 2
                    }
                ]
            })
            .expect(201)
        const response = await request(app)
            .get('/api/orders/')
            .set('Cookie', global.signup())
            .send()
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].id).toBeDefined();
        expect(response.body[0].total_price).toBe(120);
        expect(response.body[0].orderItems.length).toBe(2);
    });

    test('should return a single order item with 200', async () => {
        const newOrder = await request(app)
            .post('/api/orders/')
            .set('Cookie', global.signup())
            .send({
                "items": [
                    {
                        "product_id": "asgsfag",
                        "unit_price": 20,
                        "quantity": 2
                    },
                    {
                        "product_id": "asgsasdfas",
                        "unit_price": 40,
                        "quantity": 2
                    }
                ]
            })
            .expect(201)
        const order = await request(app)
            .get('/api/orders/' + newOrder.body.id)
            .set('Cookie', global.signup())
            .send()

        expect(order.status).toBe(200);
        expect(order.body.id).toBe(newOrder.body.id);
        expect(order.body.total_price).toBe(120);
        expect(order.body.orderItems.length).toBe(2);
    });

    test('should throw error with invalid id', async () => {
        await request(app)
            .get('/api/orders/1234')
            .set('Cookie', global.signup())
            .send()
            .expect(400);
    })
});

describe('update order', () => {
    test('should update order with 200', async () => {
        const newOrder = await request(app)
            .post('/api/orders/')
            .set('Cookie', global.signup())
            .send({
                "items": [
                    {
                        "product_id": "asgsfag",
                        "unit_price": 20,
                        "quantity": 2
                    },
                    {
                        "product_id": "asgsasdfas",
                        "unit_price": 40,
                        "quantity": 2
                    }
                ]
            })
            .expect(201)
        const order = await request(app)
            .patch('/api/orders/' + newOrder.body.id)
            .set('Cookie', global.signup())
            .send({
                "status": "cancelled"
            })
            .expect(200);
        expect(order.body.id).toBe(newOrder.body.id);
        expect(order.body.status).toBe('cancelled');
    });
    test('should throw error with invalid id', async () => {
        await request(app)
            .patch('/api/orders/1234')
            .set('Cookie', global.signup())
            .send({
                "status": "cancelled"
            })
            .expect(400);
    });

    test('should throw error with invalid status', async () => {
        const newOrder = await request(app)
            .post('/api/orders/')
            .set('Cookie', global.signup())
            .send({
                "items": [
                    {
                        "product_id": "asgsfag",
                        "unit_price": 20,
                        "quantity": 2
                    },
                    {
                        "product_id": "asgsasdfas",
                        "unit_price": 40,
                        "quantity": 2
                    }
                ]
            })
            .expect(201)
        await request(app)
            .patch('/api/orders/' + newOrder.body.id)
            .set('Cookie', global.signup())
            .send({
                "status": "invalid"
            })
            .expect(400);
    });
});


