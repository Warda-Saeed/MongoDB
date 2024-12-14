const apiURL = "http://localhost:5000/eventmanagement";

// Function to fetch and display events
function fetchEvents() {
    $.ajax({
        url: apiURL,
        type: "GET",
        success: function (events) {
            let eventCards = "";
            events.forEach(event => {
                eventCards += `
                    <div class="event-card" data-id="${event._id}">
                        <h3>${event.Date}</h3>
                        <p><strong>Menu:</strong> ${event.Menu}</p>
                        <p><strong>Venue:</strong> ${event.Venue}</p>
                        <div class="btn-group">
                            <button class="btn edit" onclick="editEvent('${event._id}')">Edit</button>
                            <button class="btn delete" onclick="deleteEvent('${event._id}')">Delete</button>
                        </div>
                    </div>
                `;
            });
            $("#event-cards").html(eventCards);
        },
        error: function () {
            alert("Failed to retrieve events.");
        }
    });
}

// Function to add or update an event
function addEvent() {
    const newEvent = {
        Date: $("#event-date").val(),
        Menu: $("#event-menu").val(),
        Venue: $("#event-venue").val()
    };

    // Check if it's an update or add action
    const eventId = $("#event-id").val();
    const method = eventId ? 'PUT' : 'POST';
    const url = eventId ? `${apiURL}/${eventId}` : apiURL;

    $.ajax({
        url: url,
        type: method,
        contentType: "application/json",
        data: JSON.stringify(newEvent),
        success: function () {
            fetchEvents();
            resetForm();
        },
        error: function () {
            alert("Failed to save event.");
        }
    });
}

// Function to edit an event
function editEvent(id) {
    $.ajax({
        url: `${apiURL}/${id}`,
        type: "GET",
        success: function (event) {
            $("#event-id").val(event._id);
            $("#event-date").val(event.Date);
            $("#event-menu").val(event.Menu);
            $("#event-venue").val(event.Venue);
            $("#add-update-btn").text("Update Event");
        },
        error: function () {
            alert("Failed to fetch event details.");
        }
    });
}

// Function to delete an event
function deleteEvent(id) {
    if (confirm("Are you sure you want to delete this event?")) {
        $.ajax({
            url: `${apiURL}/${id}`,
            type: "DELETE",
            success: function () {
                fetchEvents();
            },
            error: function () {
                alert("Failed to delete event.");
            }
        });
    }
}

// Reset form
function resetForm() {
    $("#event-id").val('');
    $("#event-date").val('');
    $("#event-menu").val('');
    $("#event-venue").val('');
    $("#add-update-btn").text("Add Event");
}

// Fetch events on page load
$(document).ready(function () {
    fetchEvents();

    // Add or Update event
    $("#add-update-btn").click(function () {
        addEvent();
    });
});
