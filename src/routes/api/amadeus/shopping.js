/*** Amadeus online swagger
 * https://developers.amadeus.com/self-service/category/air
 * More documentations
 * https://amadeus4dev.github.io/amadeus-node/#flightdestinations
 */

var Amadeus = require("amadeus");
var router = require("express").Router();

const { flightOfferMapResponse } = require("./responseMaps/flightOffersMap");

// Epxpecting it to be replaced by environment variables;
// clientId: "REPLACE_BY_YOUR_API_KEY",
// clientSecret: "REPLACE_BY_YOUR_API_SECRET"

let amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

// flight inspiration search
router.get("/flight-destinations", function (req, res) {
  return amadeus.shopping.flightDestinations
    .get({
      origin: "SYD",
    })
    .then(function (response) {
      const { data } = response;
      console.log("received data", data);
      return res.status(200).json(data);
    })
    .catch(function (responseError) {
      console.log(responseError.code);
      throw new Error(responseError.code);
    });
});

// v1/ flight low fare search
router.get("/flight-offers", function (req, res) {
  return amadeus.shopping.flightOffers
    .get({
      origin: "NYC",
      destination: "MAD",
      departureDate: "2020-08-01",
    })
    .then(function (response) {
      const { data } = response;
      console.log("received data", data);
      return res.status(200).json(data);
    })
    .catch(function (responseError) {
      console.log(responseError.code);
      throw new Error(responseError.code);
    });
});

// flight cheapest dates
router.get("/flight-dates", function (req, res) {
  return amadeus.shopping.flightDates
    .get({
      origin: "NYC",
      destination: "MAD",
    })
    .then(function (response) {
      const { data } = response;
      console.log("received data", data);
      return res.status(200).json(data);
    })
    .catch(function (responseError) {
      console.log(responseError.code);
      throw new Error(responseError.code);
    });
});

// flight offer search
router.get("/v2/flight-offers", function (req, res) {
  const {
    query: {
      origin,
      destination,
      departDate,
      returnDate,
      currencyCode,
      adults,
      children,
      infants,
      travelClass = "ECONOMY",
      includedAirlines,
      excludedAirlines,
      nonStop = false,
      maxPrice,
      max = 50,
    },
  } = req;
  return amadeus.shopping.flightOffersSearch
    .get({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: departDate,
      returnDate,
      currencyCode,
      adults,
      children,
      infants,
      travelClass,
      includedAirlines,
      excludedAirlines,
      nonStop,
      maxPrice,
      max,
    })
    .then(function (response) {
      if (!response) {
        return res.status(200).json([]);
      }
      const { data, dictionaries } = response.result;
      console.log(dictionaries);
      const formattedData = flightOfferMapResponse(data);
      const result = {
        ...dictionaries,
        data: formattedData,
      };
      return res.status(200).json(result);
    })
    .catch(function (responseError) {
      console.log(responseError);
      throw new Error(responseError.code);
    });
});

// post flight offers
router.post("/v2/flight-offers", function (req, res) {
  try {
    const { body } = req;
    if (!body) {
      throw new Error(" Not a valid request");
    }

    const {
      origin,
      destination,
      departDate,
      returnDate,
      currencyCode,
      adults,
    } = body || {};

    return amadeus.shopping.flightOffersSearch
      .post(
        JSON.stringify({
          currencyCode: currencyCode,
          originDestinations: [
            {
              id: "1",
              originLocationCode: origin,
              destinationLocationCode: destination,
              departureDateTimeRange: {
                date: departDate,
                time: "10:00:00",
              },
            },
            {
              id: "2",
              originLocationCode: destination,
              destinationLocationCode: origin,
              departureDateTimeRange: {
                date: returnDate,
                time: "17:00:00",
              },
            },
          ],
          travelers: [
            {
              id: "1",
              travelerType: "ADULT",
              fareOptions: ["STANDARD"],
            },
            {
              id: "2",
              travelerType: "CHILD",
              fareOptions: ["STANDARD"],
            },
          ],
          sources: ["GDS"],
          searchCriteria: {
            maxFlightOffers: 50,
            flightFilters: {
              cabinRestrictions: [
                {
                  cabin: "BUSINESS",
                  coverage: "MOST_SEGMENTS",
                  originDestinationIds: ["1"],
                },
              ],
              carrierRestrictions: {
                excludedCarrierCodes: ["AA", "TP", "AZ"],
              },
            },
          },
        })
      )
      .then(function (response) {
        const { data } = response;
        return res.status(200).json(data);
      })
      .catch(function (responseError) {
        console.log(responseError);
        throw new Error(responseError.code);
      });
  } catch (err) {
    res.status(500).json({ error: "Internal error." });
  }
});

// flight offer pricing
router.post("/flight-offer-pricing", function (req, res) {
  return amadeus.shopping.flightDestinations
    .get({
      origin: "SYD",
    })
    .then(function (response) {
      const { data } = response;
      return res.status(200).json(data);
    })
    .catch(function (responseError) {
      console.log(responseError);
      throw new Error(responseError.code);
    });
});

// flight seat maps display
router.post("/seatmaps", function (req, res) {
  return amadeus.shopping.flightDestinations
    .get({
      origin: "SYD",
    })
    .then(function (response) {
      const { data } = response;
      return res.status(200).json(data);
    })
    .catch(function (responseError) {
      console.log(responseError);
      throw new Error(responseError.code);
    });
});

// flight seat maps
router.get("/seatmaps", function (req, res) {
  return amadeus.shopping.flightDestinations
    .get({
      origin: "SYD",
    })
    .then(function (response) {
      const { data } = response;
      return res.status(200).json(data);
    })
    .catch(function (responseError) {
      console.log(responseError);
      throw new Error(responseError.code);
    });
});

module.exports = router;
