import request from 'supertest';
import { app } from '../../app';


describe('create cart', () => {
    test('should create a cart successfully', async () => {
        const product = await global.generateProduct();
        const response = await request(app)
        .post('/api/cart/')
        .set('Cookie', global.signup())
        .send({
            "item": {
                "product":product.id,
                "quantity":"2",
                "unitPrice":product.price
              }
            
        })
    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.totalPrice).toBe(40);
    });
    
    test('should throw error with 400', async () => {
        const product = await global.generateProduct();
        const response = await request(app)
        .post('/api/cart/')
        .set('Cookie', global.signup())
        .send({
            "item": {
                "product":product.id,
                "quantity":"200",
                "unitPrice":product.price
              }
        })
    expect(response.status).toBe(400);
    });
});

describe('get cart', () => {
    test('should get cart of a user', async () => {
        const cookie = global.signup();
        const product = await global.generateProduct();
        const response = await request(app)
        .post('/api/cart/')
        .set('Cookie', cookie)
        .send({
            "item": {
                "product":product.id,
                "quantity":"2",
                "unitPrice":product.price
              }

        }); 
    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.totalPrice).toBe(40);

    const userCart = await request(app)
    .get('/api/cart/')
    .set('Cookie', cookie)
    .send()
    expect(userCart.status).toBe(200);
    expect(userCart.body.id).toBeDefined();
    expect(userCart.body.totalPrice).toBe(40);
    expect(userCart.body.items.length).toBe(1);
    expect(userCart.body.items[0].product).toBe(product.id);
    expect(userCart.body.items[0].quantity).toBe(2);
    });

    test('should throw error with 404', async () => {
        const cookie = global.signup();
        const product = await global.generateProduct();
        const response = await request(app)
        .post('/api/cart/')
        .set('Cookie', global.signup())
        .send({
            "item": {
                "product":product.id,
                "quantity":"2",
                "unitPrice":product.price
              }
        })
        .expect(201)
        const userCart = await request(app)
    .get('/api/cart/')
    .set('Cookie', global.signup())
    .send()
    expect(userCart.status).toBe(404);
    });

    test('should get cart by id', async () => {
        const cookie = global.signup();
        const product = await global.generateProduct();
        const response = await request(app)
        .post('/api/cart/')
        .set('Cookie', cookie)
        .send({
            "item": {
                "product":product.id,
                "quantity":"2",
                "unitPrice":product.price
              }
        });
    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.totalPrice).toBe(40);
        const userCart = await request(app)
            .get(`/api/cart/${response.body.id}`)
            .set('Cookie', cookie)
            .send()
    expect(userCart.status).toBe(200);
    expect(userCart.body.id).toBe(response.body.id);
    expect(userCart.body.totalPrice).toBe(40);
    });
    test('should throw error with 400', async () => {
        const cookie = global.signup();
        const product = await global.generateProduct();
        const userCart = await request(app)
            .get(`/api/cart/3645454`)
            .set('Cookie', global.signup())
            .send()
    expect(userCart.status).toBe(400);
    });
});

describe('update cart status', () => {
    test('should update cart status', async () => {
        const cookie = global.signup();
        const product = await global.generateProduct();
        const response = await request(app)
        .post('/api/cart/')
        .set('Cookie', cookie)
        .send({
            "item": {
                "product":product.id,
                "quantity":"2",
                "unitPrice":product.price
              }
        });
    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.totalPrice).toBe(40);
        const userCart = await request(app)
            .patch(`/api/cart/${response.body.id}`)
            .set('Cookie', cookie)
            .send({
                "status": "Abandoned"
            })
    expect(userCart.status).toBe(200);
    expect(userCart.body.id).toBe(response.body.id);
    expect(userCart.body.status).toBe('Abandoned');
    });

    test('should throw error with 400', async () => {
        const cookie = global.signup();
        const product = await global.generateProduct();
        const response = await request(app)
        .post('/api/cart/')
        .set('Cookie', cookie)
        .send({
            "item": {
                "product":product.id,
                "quantity":"2",
                "unitPrice":product.price
              }
        });
    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.totalPrice).toBe(40);
        const userCart = await request(app)
            .patch(`/api/cart/${response.body.id}`)
            .set('Cookie', cookie)
            .send({
                "status": "test"
            })
    expect(userCart.status).toBe(400);
    });
})