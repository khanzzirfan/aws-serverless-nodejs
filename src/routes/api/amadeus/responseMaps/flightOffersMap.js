const shortid = require("shortid");
shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
);
const flightOfferMapResponse = (data) => {
  if (Array.isArray(data)) {
    const result = data.map((d) => {
      const flightOfferId = shortid.generate();
      const itineraries = d.itineraries.map((i) => {
        return {
          ...i,
          itineraryId: shortid.generate(),
        };
      });
      const travelerPricings = d.travelerPricings.map((t) => {
        return {
          ...t,
          travelerPricingId: shortid.generate(),
        };
      });
      return {
        ...d,
        itineraries: itineraries,
        travelerPricings: travelerPricings,
        flightOfferId,
      };
    });
    return result;
  }
};

module.exports = { flightOfferMapResponse };
