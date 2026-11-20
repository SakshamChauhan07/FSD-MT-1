
const express = require("express");

const app = express();

app.use(express.json());

let registrations = [
    {
        id: 501,
        participantName: "Riya Sharma",
        eventName: "Tech Fest",
        department: "CSE",
        ticketCount: 2,
        paymentStatus: "Paid"
    },
    {
        id: 502,
        participantName: "Arjun Mehta",
        eventName: "Code Sprint",
        department: "IT",
        ticketCount: 1,
        paymentStatus: "Pending"
    },
    {
        id: 503,
        participantName: "Neha Verma",
        eventName: "Tech Fest",
        department: "ECE",
        ticketCount: 3,
        paymentStatus: "Paid"
    }
];

function validateRegistration(data) {
    return (
        typeof data.participantName === "string" &&
        data.participantName.trim() !== "" &&
        typeof data.eventName === "string" &&
        data.eventName.trim() !== "" &&
        typeof data.department === "string" &&
        data.department.trim() !== "" &&
        Number.isInteger(data.ticketCount) &&
        data.ticketCount > 0 &&
        ["Paid", "Pending"].includes(data.paymentStatus)
    );
}

// 1. GET all registrations
app.get("/api/registrations", (req, res) => {
    res.status(200).json(registrations);
});

// 2. POST a new registration
app.post("/api/registrations", (req, res) => {
    const data = req.body;

    if (!validateRegistration(data)) {
        return res.status(400).json({
            message: "Invalid registration data"
        });
    }

    const newRegistration = {
        id: Math.max(...registrations.map(r => r.id), 500) + 1,
        participantName: data.participantName.trim(),
        eventName: data.eventName.trim(),
        department: data.department.trim(),
        ticketCount: data.ticketCount,
        paymentStatus: data.paymentStatus
    };

    registrations.push(newRegistration);

    res.status(201).json(newRegistration);
});

// 6. FILTER registrations by department
app.get("/api/registrations/filter", (req, res) => {
    const department = req.query.department;

    if (!department) {
        return res.status(400).json({
            message: "Department query is required"
        });
    }

    const result = registrations.filter(
        r => r.department.toLowerCase() === department.toLowerCase()
    );

    res.status(200).json(result);
});

// 7. GET pending registrations
app.get("/api/registrations/pending", (req, res) => {
    const result = registrations.filter(
        r => r.paymentStatus === "Pending"
    );

    res.status(200).json(result);
});

// 3. GET registration by ID
app.get("/api/registrations/:id", (req, res) => {
    const id = Number(req.params.id);

    const registration = registrations.find(r => r.id === id);

    if (!registration) {
        return res.status(404).json({
            message: "Registration not found"
        });
    }

    res.status(200).json(registration);
});

// 4. PUT update registration
app.put("/api/registrations/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = registrations.findIndex(r => r.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Registration not found"
        });
    }

    if (!validateRegistration(req.body)) {
        return res.status(400).json({
            message: "Invalid registration data"
        });
    }

    registrations[index] = {
        id: id,
        participantName: req.body.participantName.trim(),
        eventName: req.body.eventName.trim(),
        department: req.body.department.trim(),
        ticketCount: req.body.ticketCount,
        paymentStatus: req.body.paymentStatus
    };

    res.status(200).json(registrations[index]);
});

// 5. DELETE registration
app.delete("/api/registrations/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = registrations.findIndex(r => r.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Registration not found"
        });
    }

    registrations.splice(index, 1);

    res.status(200).json({
        message: "Registration deleted successfully"
    });
});

// Start server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
