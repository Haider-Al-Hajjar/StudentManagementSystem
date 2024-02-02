const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const cors = require('cors'); // Import the cors middleware
app.use(cors());
// Middleware to parse JSON data in requests
app.use(bodyParser.json());

app.get('/readFromFile', (req, res) => {
    try {
        // Read data from the JSON file
        const data = JSON.parse(fs.readFileSync('data.json'));
        res.json(data);
    } catch (err) {
        console.error('Error reading from file:', err);
        res.status(500).send('Error reading from file');
    }
});

app.post('/writeToFile', (req, res) => {
    const newData = req.body;

    try {
        // Read existing data from the JSON file
        const existingData = JSON.parse(fs.readFileSync('data.json', 'utf8'));

        // Take the value associated with input and push it into existingData.ids
        existingData.students.push(newData.input)
        console.log("newData", newData)
        console.log(existingData.ids)
        // Write the updated data back to the file
        fs.writeFileSync('data.json', JSON.stringify(existingData, null, 4));

        res.status(200).send('Data has been written to file');
    } catch (err) {
        console.error('Error writing to file:', err);
        res.status(500).send('Error writing to file');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});