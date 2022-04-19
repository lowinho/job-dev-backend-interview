import request from 'supertest';
import { app } from '../../app';
import path from 'path';

describe("Post", () => {
    it("should record photo product in db", async() => {
        const image = path.resolve(__dirname, `../assets/produto.jpg`);
        const response = await request(app)
        .post('/photo-product/1')
        .set('content-type', 'application/octet-stream')
        .attach('file', image)
        expect(response.status).toBe(200);
    })
})

describe("Show", () => {
    it("should bring one photo product to db", async() => {
        const response = await request(app).get('/photo-product/1');
        expect(response.status).toBe(200);
    })
})

describe("getByProduct", () => {
    it("should bring photo with id_product to db", async() => {
        const response = await request(app).get('/photo-product/1');
        expect(response.status).toBe(200);
    })
})

describe("Delete", () => {
    it("should delete a photo product to db", async() => {
        const response = await request(app).delete('/photo-product/1');
        expect(response.status).toBe(200);
    })
})