import request from 'supertest';
import { app } from '../../app';

describe("Post", () => {
    it("should record schedule to use in restaurant", async() => {
        const response = await request(app)
        .post('/schedule')
        .send({
            idRestaurant: 1,
            idSale: null,
            dayWeek: "Quarta",
            initialTime: "10:00",
            endTime: "18:00"
        })
        expect(response.status).toBe(200);
    })
})

describe("Post", () => {
    it("should record schedule to use in sale", async() => {
        const response = await request(app)
        .post('/schedule')
        .send({
            idRestaurant: null,
            idSale: 1,
            dayWeek: "Quinta",
            initialTime: "10:00",
            endTime: "18:00"
        })
        expect(response.status).toBe(200);
    })
})

describe("Update", () => {
    it("should update restaurant in db", async() => {
        const response = await request(app)
        .put('/schedule/1')
        .send({
            idRestaurant: 1,
            idSale: null,
            dayWeek: "Sexta",
            initialTime: "09:00",
            endTime: "18:30"
        })
        expect(response.status).toBe(200);
    })
})

describe("Index", () => {
    it("should bring all schedules to db", async() => {
        const response = await request(app).get('/schedule');
        expect(response.status).toBe(200);
    })
})

describe("Show", () => {
    it("should bring one schedule to db", async() => {
        const response = await request(app).get('/schedule/1');
        expect(response.status).toBe(200);
    })
})

describe("Post", () => {
    it("should record schedule to delete test", async() => {
        const response = await request(app)
        .post('/schedule')
        .send({
            idRestaurant: 1,
            idSale: null,
            dayWeek: "Quarta",
            initialTime: "10:00",
            endTime: "18:00"
        })
        expect(response.status).toBe(200);
    })
})

describe("Delete", () => {
    it("should delete a schedule to db", async() => {
        const response = await request(app).delete('/schedule/3');
        expect(response.status).toBe(200);
    })
})