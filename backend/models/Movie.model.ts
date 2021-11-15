const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    release_date: {
        type: Number,
    },
    genres: {
        type: [String]
    },
    overview: {
        type: String
    },
    poster: {
        type: String
    },
    favoritedByUser: {
        type: [String]
    }

})

const Movie = mongoose.model("movie", MovieSchema);
export default Movie;