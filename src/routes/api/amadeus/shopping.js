/*** Amadeus online swagger
 * https://developers.amadeus.com/self-service/category/air
 * More documentations
 * https://amadeus4dev.github.io/amadeus-node/#flightdestinations
 */

var Amadeus = require("amadeus");
var router = require("express").Router();

// Epxpecting it to be replaced by environment variables;
// clientId: "REPLACE_BY_YOUR_API_KEY",
// clientSecret: "REPLACE_BY_YOUR_API_SECRET"

let amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET
});

// flight inspiration search
router.get("/flight-destinations", function(req, res, next) {
  return amadeus.shopping.flightDestinations
    .get({
      origin: "SYD"
    })
    .then(function(response) {
      const { data } = response;
      console.log("received data", data);
      const firstSet = data[0];
      return res.status(200).json(firstSet);
    })
    .catch(function(responseError) {
      console.log(responseError.code);
      throw new Error(responseError.code);
    });
});

// v1/ flight low fare search
router.get("/flight-offers", function(req, res, next) {
  return amadeus.shopping.flightOffers
    .get({
      origin: "NYC",
      destination: "MAD",
      departureDate: "2020-08-01"
    })
    .then(function(response) {
      const { data } = response;
      console.log("received data", data);
      const firstSet = data[0];
      return res.status(200).json(firstSet);
    })
    .catch(function(responseError) {
      console.log(responseError.code);
      throw new Error(responseError.code);
    });
});

// flight cheapest dates
router.get("/flight-dates", function(req, res, next) {
  return amadeus.shopping.flightDates
    .get({
      origin: "NYC",
      destination: "MAD"
    })
    .then(function(response) {
      const { data } = response;
      console.log("received data", data);
      const firstSet = data[0];
      return res.status(200).json(firstSet);
    })
    .catch(function(responseError) {
      console.log(responseError.code);
      throw new Error(responseError.code);
    });
});

// flight offer search
router.get("/v2/flight-offers", function(req, res, next) {
  return amadeus.shopping.flightOffersSearch
    .get({
      originLocationCode: "SYD",
      destinationLocationCode: "BKK",
      departureDate: "2020-08-01",
      adults: "2"
    })
    .then(function(response) {
      const { data } = response;
      console.log("received data", data);
      const firstSet = data[0];
      return res.status(200).json(firstSet);
    })
    .catch(function(responseError) {
      console.log(responseError.code);
      throw new Error(responseError.code);
    });
});

router.post("/flight-offers", function(req, res, next) {
  return amadeus.shopping.flightOffersSearch
    .get(
      JSON.stringify({
        currencyCode: "USD",
        originDestinations: [
          {
            id: "1",
            originLocationCode: "RIO",
            destinationLocationCode: "MAD",
            departureDateTimeRange: {
              date: "2020-03-01",
              time: "10:00:00"
            }
          },
          {
            id: "2",
            originLocationCode: "MAD",
            destinationLocationCode: "RIO",
            departureDateTimeRange: {
              date: "2020-03-05",
              time: "17:00:00"
            }
          }
        ],
        travelers: [
          {
            id: "1",
            travelerType: "ADULT",
            fareOptions: ["STANDARD"]
          },
          {
            id: "2",
            travelerType: "CHILD",
            fareOptions: ["STANDARD"]
          }
        ],
        sources: ["GDS"],
        searchCriteria: {
          maxFlightOffers: 50,
          flightFilters: {
            cabinRestrictions: [
              {
                cabin: "BUSINESS",
                coverage: "MOST_SEGMENTS",
                originDestinationIds: ["1"]
              }
            ],
            carrierRestrictions: {
              excludedCarrierCodes: ["AA", "TP", "AZ"]
            }
          }
        }
      })
    )
    .then(function(response) {
      const { data } = response;
      console.log("received data", data);
      const firstSet = data[0];
      return res.status(200).json(firstSet);
    })
    .catch(function(responseError) {
      console.log(responseError.code);
      throw new Error(responseError.code);
    });
});

// flight offer pricing
router.post("/flight-offer-pricing", function(req, res, next) {
  return amadeus.shopping.flightDestinations
    .get({
      origin: "SYD"
    })
    .then(function(response) {
      const { data } = response;
      console.log("received data", data);
      const firstSet = data[0];
      return res.status(200).json(firstSet);
    })
    .catch(function(responseError) {
      console.log(responseError.code);
      throw new Error(responseError.code);
    });
});

// flight seat maps display
router.post("/seatmaps", function(req, res, next) {
  return amadeus.shopping.flightDestinations
    .get({
      origin: "SYD"
    })
    .then(function(response) {
      const { data } = response;
      console.log("received data", data);
      const firstSet = data[0];
      return res.status(200).json(firstSet);
    })
    .catch(function(responseError) {
      console.log(responseError.code);
      throw new Error(responseError.code);
    });
});

// flight seat maps
router.get("/seatmaps", function(req, res, next) {
  return amadeus.shopping.flightDestinations
    .get({
      origin: "SYD"
    })
    .then(function(response) {
      const { data } = response;
      console.log("received data", data);
      const firstSet = data[0];
      return res.status(200).json(firstSet);
    })
    .catch(function(responseError) {
      console.log(responseError.code);
      throw new Error(responseError.code);
    });
});

module.exports = router;
