const { expect } = require('chai');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let app;
let mongod;

describe('API tests for /api/todos', function() {
  this.timeout(10000);

  before(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    // require app after mongoose is connected
    app = require('../server').app;
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
  });

  let createdId;

  it('POST /api/todos should create a todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ title: 'Test todo', description: 'Testing' })
      .expect(201);

    expect(res.body).to.have.property('_id');
    expect(res.body.title).to.equal('Test todo');
    createdId = res.body._id;
  });

  it('GET /api/todos should return list with created item', async () => {
    const res = await request(app).get('/api/todos').expect(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.greaterThan(0);
  });

  it('PUT /api/todos/:id should update completed flag', async () => {
    const res = await request(app)
      .put(`/api/todos/${createdId}`)
      .send({ completed: true, title: 'Test todo', description: 'Testing' })
      .expect(200);

    expect(res.body.completed).to.equal(true);
  });

  it('DELETE /api/todos/:id should delete the todo', async () => {
    await request(app).delete(`/api/todos/${createdId}`).expect(200);
    const res = await request(app).get('/api/todos').expect(200);
    const found = res.body.find(t => t._id === createdId);
    expect(found).to.be.undefined;
  });

  it('POST /api/todos without title should return 400', async () => {
    await request(app).post('/api/todos').send({ description: 'no title' }).expect(400);
  });
});
