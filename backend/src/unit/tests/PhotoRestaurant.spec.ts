import request from 'supertest';
import { app } from '../../app';
import path from 'path';

describe("Post", () => {
    it("should record photo restaurant in db", async() => {
        const image = path.resolve(__dirname, `../assets/restaurante.jpg`);
        const response = await request(app)
        .post('/photo-restaurant/1')
        .set('content-type', 'multipart/form-data')
        .attach('file', image)
        expect(response.status).toBe(200);
    })
})

describe("Show", () => {
    it("should bring one photo restaurant to db", async() => {
        const response = await request(app).get('/photo-restaurant/1');
        expect(response.status).toBe(200);
    })
})

describe("getByRestaurant", () => {
    it("should bring photo with id_restaurant to db", async() => {
        const response = await request(app).get('/photo-restaurant/1');
        expect(response.status).toBe(200);
    })
})

describe("Delete", () => {
    it("should delete a photo restaurant to db", async() => {
        const response = await request(app).delete('/photo-restaurant/2');
        expect(response.status).toBe(200);
    })
})