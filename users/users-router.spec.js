const request = require('supertest');

const server = require('../api/server.js');

describe('users-router.js', function() {
    describe('GET /api/user', function() {
        it('should return 200 OK', async function() {
            const response = await request(server).get('/api/users');

            expect(response.status).toBe(200);
        })

        it('should return JSON', async function() {
            const response = await request(server).get('/api/users');

            expect(response.type).toMatch(/json/i);
        })

        it('should return an array with length of 3', async function() {
            const response = await request(server).get('/api/users');

            expect(response.body).toHaveLength(3);
        })
    })
})