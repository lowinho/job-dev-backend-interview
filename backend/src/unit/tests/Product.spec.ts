import request from 'supertest';
import { app } from '../../app';

describe("Post", () => {
    it("should record product on db", async() => {
        const response = await request(app)
        .post('/product')
        .send({
            idRestaurant: 1,
            name: "Produto 1",
            price: 30,
            category: "Categoria 1",
            isSale: false
        })
        expect(response.status).toBe(200);
    })
})

describe("Update", () => {
    it("should update product on db", async() => {
        const response = await request(app)
        .put('/product/1')
        .send({
            idRestaurant: 1,
            name: "Produto 1 updated",
            price: 31,
            category: "Categoria 1 updated",
            isSale: true
        })
        expect(response.status).toBe(200);
    })
})

describe("Index", () => {
    it("should bring all product to db", async() => {
        const response = await request(app).get('/product');
        expect(response.status).toBe(200);
    })
})

describe("Show", () => {
    it("should bring one product to db", async() => {
        const response = await request(app).get('/product/1');
        expect(response.status).toBe(200);
    })
})

describe("Post", () => {
    it("should record product to delete test", async() => {
        const response = await request(app)
        .post('/product')
        .send({
            idRestaurant: 1,
            name: "Produto 2",
            price: 30,
            category: "Categoria 1",
            isSale: false
        })
        expect(response.status).toBe(200);
    })
})

describe("Delete", () => {
    it("should delete a product to db", async() => {
        const response = await request(app).delete('/product/2');
        expect(response.status).toBe(200);
    })
})
