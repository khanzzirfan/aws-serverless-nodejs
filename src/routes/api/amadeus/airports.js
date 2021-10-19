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

const mapResponseResult = (response) => {
  if (!isEmpty(response)) {
    const { data } = response;
    return data;
  }
  return null;
};

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
      const data = mapResponseResult(response);
      if (!data) {
        return res.status(200).json([]);
      }
      resultData = resultData.concat(data);
      return amadeus.next(response);
    })
    .then((nextResponse) => {
      const data = mapResponseResult(nextResponse);
      if (!data) {
        return res.status(200).json(resultData);
      }
      resultData = resultData.concat(data);
      return res.status(200).json(resultData);
    })
    .catch(function (responseError) {
      console.log(responseError);
      // throw new Error(responseError.code);
      res.status(500).json("Internal server error");
    });
});

module.exports = router;
