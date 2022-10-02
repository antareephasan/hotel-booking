const User = require("../models/User");
const bcrypt = require("bcrypt");
const CryptoJS = require('crypto-js');
const axios = require('axios')



//Register
exports.hotels = async (req, res) => {
    // configuring booking api
    let date = Math.floor(Date.now() / 1000);
    let input = process.env.API_KEY + process.env.API_SECRET + date;
    var hash = CryptoJS.SHA256(input);

    const client = axios.create({
        baseURL: "https://api.test.hotelbeds.com",
        headers: {
            'Api-key': `${process.env.API_KEY}`,
            'X-Signature': `${hash}`,
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip'
        }
    })

    try {
        const response = await client.get("/hotel-content-api/1.0/hotels?fields=all&language=ENG&");
        return res.status(200).json(response.data);
    } catch (error) {
        // console.log(error);
        return res.status(400).json("Something went wrong");
    }

}

exports.countriesList = async (req, res) => {
    // configuring booking api
    let date = Math.floor(Date.now() / 1000);
    let input = process.env.API_KEY + process.env.API_SECRET + date;
    var hash = CryptoJS.SHA256(input);

    const client = axios.create({
        baseURL: "https://api.test.hotelbeds.com",
        headers: {
            'Api-key': `${process.env.API_KEY}`,
            'X-Signature': `${hash}`,
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip'
        }
    })

    try {
        const response = await client.get("/hotel-content-api/1.0/locations/countries?fields=all&language=ENG&from=1&to=203");
        return res.status(200).json(response.data);
    } catch (error) {
        // console.log(error);
        return res.status(400).json("Something went wrong");
    }

}


exports.hotelDetails = async (req, res) => {
    // configuring booking api
    let date = Math.floor(Date.now() / 1000);
    let input = process.env.API_KEY + process.env.API_SECRET + date;
    var hash = CryptoJS.SHA256(input);

    const client = axios.create({
        baseURL: "https://api.test.hotelbeds.com",
        headers: {
            'Api-key': `${process.env.API_KEY}`,
            'X-Signature': `${hash}`,
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip'
        }
    })

    try {
        const hotelCode = req.headers.hotelcode;
        const response = await client.get(`/hotel-content-api/1.0/hotels/${hotelCode}/details?language=ENG&useSecondaryLanguage=False`);
        return res.status(200).json(response.data);
    } catch (error) {
        // console.log(error);
        return res.status(400).json("Something went wrong");
    }

}
