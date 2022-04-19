import request from 'supertest';
import { app } from '../../app';

describe("Post", () => {
    it("should record a sale in db", async() => {
        const response = await request(app)
        .post('/sale')
        .send({
            idProduct: 1,
            description: "Produto 1",
            price: 20
        })
        expect(response.status).toBe(200);
    })
})

describe("Update", () => {
    it("should update a sale in db", async() => {
        const response = await request(app)
        .put('/sale/1')
        .send({
            idProduct: 1,
            description: "Produto 1 updated",
            price: 21
        })
        expect(response.status).toBe(200);
    })
})

describe("Index", () => {
    it("should bring all sale to db", async() => {
        const response = await request(app).get('/sale');
        expect(response.status).toBe(200);
    })
})

describe("Show", () => {
    it("should bring a sale to db", async() => {
        const response = await request(app).get('/sale/1');
        expect(response.status).toBe(200);
    })
})

describe("Post", () => {
    it("should record a sale to delete test", async() => {
        const response = await request(app)
        .post('/sale')
        .send({
            idProduct: 1,
            description: "Produto 1",
            price: 20
        })
        expect(response.status).toBe(200);
    })
})

describe("Delete", () => {
    it("should delete a sale to db", async() => {
        const response = await request(app).delete('/sale/2');
        expect(response.status).toBe(200);
    })
})