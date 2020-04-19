const shortid = require("shortid");
const map = require("lodash/map");
const get = require("lodash/get");
const uniqBy = require("lodash/uniqBy");

shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
);
const flightOfferMapResponse = (data) => {
  if (Array.isArray(data)) {
    const result = data.map((d) => {
      const flightOfferId = shortid.generate();
      let carriers = [];

      // all itineraries
      const itineraries = d.itineraries.map((i) => {
        // segments;
        const allSegments = get(i, "segments", []);
        // all carriers;
        let carier = map(allSegments, (seg) => seg.carrierCode);
        carriers = carriers.concat(carier);

        return {
          ...i,
          itineraryId: shortid.generate(),
        };
      });

      // travelerPricings
      const travelerPricings = d.travelerPricings.map((t) => {
        return {
          ...t,
          travelerPricingId: shortid.generate(),
        };
      });

      return {
        ...d,
        carriers: uniqBy(carriers),
        itineraries: itineraries,
        travelerPricings: travelerPricings,
        flightOfferId,
      };
    });
    return result;
  }
};

module.exports = { flightOfferMapResponse };
