const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const db = "mongodb+srv://Woei_Liang:mangodbpw1234@cluster0.4exyzrj.mongodb.net/GlocalSenceDB";

mongoose.connect(db).then(()=> {
console.log("Connected to database");
})

.catch(()=> {
console.log("Can't connect to database");
})

const weatherSchema = new mongoose.Schema({
    current: {
        last_updated_epoch: Number,
        last_updated: String,
        temp_c: Number,
        temp_f: Number,
       
    },
    location: {
        name: String,
        region: String,
        country: String,
    }
    
});

    const weather_dbconnect = mongoose.model('weather', weatherSchema);
    // use POST to save weather data
    app.post('/save-weather', async (req, res) => {
    const weatherData = req.body;

    try {
        const newWeather = new Weather(weatherData);
        await newWeather.save();
        res.status(200).json({ message: 'Weather data saved successfully' });
    } catch (err) {
        console.error('Error saving weather data:', err);
        res.status(500).json({ message: 'Failed to save weather data', error: err.message });
    }
    });

    app.listen(5000, () => {
    console.log('Server is running on port 5000');
    });

    module.exports = weather_dbconnect;