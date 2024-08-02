const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const mongoURL = "mongodb+srv://admin:admin@cluster0.0ml8z.mongodb.net/Dev5?retryWrites=true&w=majority";

const client = new MongoClient(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const eventCollection = client.db("Dev5").collection("Event");

app.post("/api/events", async (req, res) => {
  const { title, description, start, end, priority } = req.body;
  if (!title || !description || !start || !end || !priority) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const event = { title, description, start, end, priority };
  const result = await eventCollection.insertOne(event);
  res.json(result.ops[0]);
});

app.get("/api/events", async (req, res) => {
  const events = await eventCollection.find().toArray();
  res.json(events);
});

app.put("/api/events/:id", async (req, res) => {
  const eventId = req.params.id;
  const { title, description, start, end, priority } = req.body;
  if (!title || !description || !start || !end || !priority) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const updatedEvent = { title, description, start, end, priority };
  const result = await eventCollection.findOneAndUpdate(
    { _id: new ObjectId(eventId) },
    { $set: updatedEvent },
    { returnOriginal: false }
  );
  if (!result.value) {
    return res.status(404).json({ error: "Event not found" });
  }
  res.json(result.value);
});

app.delete("/api/events/:id", async (req, res) => {
  const eventId = req.params.id;
  await eventCollection.deleteOne({ _id: new ObjectId(eventId) });
  res.json({ message: "Event deleted" });
});

let server;

beforeAll(async () => {
  await client.connect();
  server = app.listen(4000);
});

afterAll(async () => {
  await client.close();
  await server.close();
});

describe('Event API', () => {
  let eventId;

  it('should create an event', async () => {
    const response = await request(server)
      .post('/api/events')
      .send({
        title: 'Test Event',
        description: 'Test Description',
        start: new Date(),
        end: new Date(),
        priority: 'high'
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    eventId = response.body._id;
  });

  it('should retrieve all events', async () => {
    const response = await request(server).get('/api/events');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should update an event', async () => {
    const response = await request(server)
      .put(`/api/events/${eventId}`)
      .send({
        title: 'Updated Test Event',
        description: 'Updated Test Description',
        start: new Date(),
        end: new Date(),
        priority: 'medium'
      });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Test Event');
  });

  it('should delete an event', async () => {
    const response = await request(server).delete(`/api/events/${eventId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Event deleted');
  });
});