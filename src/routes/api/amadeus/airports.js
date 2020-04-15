/*** Amadeus online swagger
 * https://developers.amadeus.com/self-service/category/air
 * More documentations
 * https://amadeus4dev.github.io/amadeus-node/#flightdestinations
 */

var Amadeus = require("amadeus");
var router = require("express").Router();
var isEmpty = require("lodash/isEmpty");

// Epxpecting it to be replaced by environment variables;
// clientId: "REPLACE_BY_YOUR_API_KEY",
// clientSecret: "REPLACE_BY_YOUR_API_SECRET"

let amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

// flight inspiration search
router.get("/locations", function (req, res) {
  const {
    query: { keyword, pageLimit, pageOffset },
  } = req;

  let resultData = [];
  return amadeus.referenceData.locations
    .get({
      keyword: keyword,
      subType: Amadeus.location.any,
      "page[limit]": pageLimit || 10,
      "page[offset]": pageOffset || 0,
    })
    .then((response) => {
      const { data } = response;
      resultData.concat(data);
      console.log("received data", data);
      return amadeus.next(response);
    })
    .then((nextResponse) => {
      const { data } = nextResponse;
      resultData.concat(data);
      console.log("received next data", data);
      return res.status(200).json(resultData);
    })
    .catch(function (responseError) {
      console.log(responseError);
      throw new Error(responseError.code);
    });
});

module.exports = router;
