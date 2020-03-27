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

    describe("GET BY ID /api/users/:id", function() {
        it("should return something OK", async function() {
          const res = await request(server).get("/api/users/2");
          expect(res.status).toBe(200);
        });
        it("should return JSON", async function() {
          const res = await request(server).get("/api/users/2");
          expect(res.type).toMatch(/json/i);
        });
      });
      describe("DELETE /api/users/:id", function() {
        it("should return 404 NOT OK", async function() {
          const res = await request(server).delete("/api/users/0");
          expect(res.status).toBe(404);
        });
        it("should return 204 OK", async function() {
          const res = await request(server).delete("/api/users/1");
          expect(res.status).toBe(204);
        });
      });
})