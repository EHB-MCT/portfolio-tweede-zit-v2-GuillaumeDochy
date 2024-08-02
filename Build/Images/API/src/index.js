const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const {checkEventName, checkEventDescription, checkEventStartDate, checkEventEndDate} = require('./helpers/endpointHelpers.js')

app.use(bodyParser.json());
app.use(
  cors()
);

const mongoURL =
  "mongodb+srv://admin:admin@cluster0.0ml8z.mongodb.net/Dev5?retryWrites=true&w=majority";

const client = new MongoClient(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongoDB();

const eventCollection = client.db("Dev5").collection("Event");

app.listen(4000, (err) => {
  if (!err) {
    console.log("Running on port " + 4000);
  } else {
    console.error(err);
  }
});

/**
 * Adds an event to the database
 * 
 * @body start - Date - start date and time of the event
 * @body end - Date - end date and time of the event
 * @body title - String - title of reservation (photoshoot etc.)
 * @body description - String - description of the event
 * @body priority - String - priority of the event
 * @returns confirmation message of posting
 */
app.post("/api/events", async (req, res) => {
  try {
    const { title, description, start, end, priority } = req.body;

    if (!title || !description || !start || !end || !priority) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const event = {
      title,
      description,
      start,
      end,
      priority,
    };

    if(checkEventName(event.title) || checkEventDescription(event.description) || checkEventStartDate(event.start) || checkEventEndDate(end)){
      const result = await eventCollection.insertOne(event);
      res.json(result.ops[0]);
    }else{
      res.status(401).send({message: "event not formatted correctly"})
    }
  } catch (error) {
    res.status(500).json({ error: "Error creating event" });
  }
});

/**
 * Gets all the reservations
 * 
 * @returns array of events
 */
app.get("/api/events", async (req, res) => {
  try {
    const events = await eventCollection.find().toArray();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Error fetching events" });
  }
});

/**
 * Gets all the high priority reservations
 * 
 * @returns array of events
 */
app.get("/api/events/high", async (req, res) => {
  try {
    const importantEvents = await eventCollection.find({ priority: "high" }).toArray();
    res.json(importantEvents);
  } catch (error) {
    res.status(500).json({ error: "Error fetching important events" });
  }
});

/**
 * Gets all the medium priority reservations
 * 
 * @returns array of events
 */
app.get("/api/events/medium", async (req, res) => {
  try {
    const mediumEvents = await eventCollection.find({ priority: "medium" }).toArray();
    res.json(mediumEvents);
  } catch (error) {
    res.status(500).json({ error: "Error fetching medium important events" });
  }
});

/**
 * Gets all the low priority reservations
 * 
 * @returns array of events
 */
app.get("/api/events/low", async (req, res) => {
  try {
    const unimportantEvents = await eventCollection.find({ priority: "low" }).toArray();
    res.json(unimportantEvents);
  } catch (error) {
    res.status(500).json({ error: "Error fetching unimportant events" });
  }
});

/**
 * Adds an event to the database
 * 
 * @param id - id of the requested event
 * @body start - Date - start date and time of the event
 * @body end - Date - end date and time of the event
 * @body title - String - title of reservation (photoshoot etc.)
 * @body description - String - description of the event
 * @body priority - String - priority of the event
 * @returns confirmation message of update
 */
app.put("/api/events/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const { title, description, start, end, priority } = req.body;

    if (!title || !description || !start || !end || !priority) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedEvent = {
      title,
      description,
      start,
      end,
      priority,
    };

    if(checkEventName(event.title) || checkEventDescription(event.description) || checkEventStartDate(event.start) || checkEventEndDate(end)){
      const result = await eventCollection.findOneAndUpdate(
      { _id: new ObjectId(eventId) },
      { $set: updatedEvent },
      { returnOriginal: false }
    );
      if (!result.value) {
      return res.status(404).json({ error: "Event not found" });
    }
    }else{
      res.status(401).send({message: "event not formatted correctly"})
    }

    res.json(result.value);
  } catch (error) {
    res.status(500).json({ error: "Error updating event" });
  }
});

/**
 * deletes an event from the database
 * 
 * @param id - id of the requested event
 * @returns confirmation message of deleted
 */
app.delete("/api/events/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const result = await eventCollection.deleteOne({ _id: new ObjectId(eventId) });
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting event" });
  }
});