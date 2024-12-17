const express = require("express");
const app = express();
const port = 9000;

const receivedEvents = new Map();

app.use(express.json());

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

app.post("/webhook", (req, res) => {
	const event = req.body;
	const { event: eventType } = event;
	const timesReceived = receivedEvents.get(eventType) || 0;
	receivedEvents.set(eventType, timesReceived + 1);
	console.table(receivedEvents, ["Event", "TimesReceived"]);
	res.status(200).end();
});

app.listen(port, () => {
	console.log(`Test page: http://localhost:${port}`);
	console.log(`Receive emails: http://localhost:5000`);
});
