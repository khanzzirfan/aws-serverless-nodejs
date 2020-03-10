const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();

module.exports.run = async event => {
  const params = {
    TableName: "todos",
    ProjectionExpression: "id, #name, checked",
    // KeyConditionExpression: "#a = :b"
    ExpressionAttributeNames: {
      "#name": "text"
    }
    // ExpressionAttributeValues: {
    //   ":b": "*"
    // }
  };
  const result = await client.scan(params).promise();
  if (result.Items) {
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    };
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "item not found" })
    };
  }
};
