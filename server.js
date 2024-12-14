const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/eventManagement', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Event Schema
const eventSchema = new mongoose.Schema({
    Date: { type: String, required: true },
    Menu: { type: String, required: true },
    Venue: { type: String, required: true }
});

const Event = mongoose.model('Event', eventSchema);

// CRUD Routes

// Fetch all events
app.get('/eventmanagement', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch single event by ID
app.get('/eventmanagement/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new event
app.post('/eventmanagement', async (req, res) => {
    try {
        const { Date, Menu, Venue } = req.body;
        const newEvent = new Event({ Date, Menu, Venue });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an existing event
app.put('/eventmanagement/:id', async (req, res) => {
    try {
        const { Date, Menu, Venue } = req.body;
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            { Date, Menu, Venue },
            { new: true }
        );
        if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
        res.json(updatedEvent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an event
app.delete('/eventmanagement/:id', async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
