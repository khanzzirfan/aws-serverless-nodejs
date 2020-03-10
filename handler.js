module.exports.run = async event => {
  console.log("im debugging in serverless handler js file");
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hellow Irfan!"
    })
  };
};
