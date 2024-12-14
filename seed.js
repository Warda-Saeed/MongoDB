const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/eventManagement', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define Event Schema
const eventSchema = new mongoose.Schema({
    date: { type: String, required: true },
    menu: { type: String, required: true },
    venue: { type: String, required: true },
});

// Create Event Model
const Event = mongoose.model('Event', eventSchema);

// Sample event data for seeding
const seedEvents = [
    { date: "2024-12-01", menu: "Buffet Dinner", venue: "Banquet Hall 1" },
    { date: "2024-12-05", menu: "Cocktail Party", venue: "Garden Lounge" },
    { date: "2024-12-10", menu: "Gala Dinner", venue: "Grand Ballroom" },
    { date: "2024-12-15", menu: "Wedding Reception", venue: "Oceanview Terrace" },
    { date: "2024-12-20", menu: "Conference Lunch", venue: "Meeting Room A" },
    { date: "2024-12-25", menu: "Christmas Dinner", venue: "Main Restaurant" },
    { date: "2024-12-30", menu: "New Year’s Eve Party", venue: "Skyline Lounge" },
];

// Clear existing events and insert seed data
Event.deleteMany({}).then(() => {
    Event.insertMany(seedEvents)
        .then(() => {
            console.log('Events seeded successfully');
            mongoose.connection.close();
        })
        .catch(err => {
            console.error('Error seeding events:', err);
            mongoose.connection.close();
        });
});
