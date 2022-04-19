import request from 'supertest';
import { app } from '../../app';

describe("Post", () => {
    it("should record restaurant in db", async() => {
        const response = await request(app)
        .post('/restaurant')
        .send({
            name: "Restaurante Teste",
            street: "Rua teste",
            number: 20,
            district: "Porto",
            city: "Sorocaba",
            state: "SP"
        })
        expect(response.status).toBe(200);
    })
})

describe("Update", () => {
    it("should update restaurant in db", async() => {
        const response = await request(app)
        .put('/restaurant/1')
        .send({
            name: "Restaurante Teste 2 editado",
            street: "Rua teste",
            number: 20,
            district: "Porto",
            city: "Sorocaba",
            state: "SP"
        })
        expect(response.status).toBe(200);
    })
})

describe("Index", () => {
    it("should bring all restaurant to db", async() => {
        const response = await request(app).get('/restaurant');
        expect(response.status).toBe(200);
    })
})

describe("Show", () => {
    it("should bring one restaurant to db", async() => {
        const response = await request(app).get('/restaurant/1');
        expect(response.status).toBe(200);
    })
})

describe("Post", () => {
    it("should record restaurant to delete test in db", async() => {
        const response = await request(app)
        .post('/restaurant')
        .send({
            name: "Restaurante Teste Delete",
            street: "Rua teste",
            number: 20,
            district: "Porto",
            city: "Sorocaba",
            state: "SP"
        })
        expect(response.status).toBe(200);
    })
})

describe("Delete", () => {
    it("should delete a restaurant to db", async() => {
        const response = await request(app).delete('/restaurant/2');
        expect(response.status).toBe(200);
    })
})