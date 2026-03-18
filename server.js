require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const Pokemon = mongoose.model('pokemon', new mongoose.Schema({
    name: String,
    type: String,
    level: Number,
    nature: String
}));

app.get('/api/pokemon', async (req, res) => {
    try {
        const pokemons = await Pokemon.find(); 
        res.json(pokemons);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.post('/api/pokemon', async (req, res) => {
    try {
        const pokemon = new Pokemon(req.body);
        await pokemon.save();
        res.json(pokemon);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.listen(3000, () => {
    console.log('API running on http://localhost:3000');
});