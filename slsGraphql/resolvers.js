var AWS = require("aws-sdk");

AWS.config.update({
    region: "eu-west-1",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();
export const resolvers = {
  Query: {
    getUserInfo: (root, args) => getUserInfo(args),
  },
  User: {
    tweets: (obj, args) => getPaginatedTweets(obj.handle, args),
  },
};


function getPaginatedTweets(handle, args) {
    return promisify(callback => {
        const params = {
            TableName: 'Tweets',
            KeyConditionExpression: 'handle = :v1',
            ExpressionAttributeValues: {
                ':v1': handle,
            },
            IndexName: 'tweet-index',
            Limit: args.limit,
            ScanIndexForward: false,
        };

        if (args.nextToken) {
            params.ExclusiveStartKey = {
                tweet_id: args.nextToken.tweet_id,
                created_at: args.nextToken.created_at,
                handle: handle,
            };
        }

        docClient.query(params, callback);
    })
    //then parse the result
}

function getUserInfo(args) {
    return promisify(callback =>
                     docClient.query(
                         {
                             TableName: 'Users',
                             KeyConditionExpression: 'handle = :v1',
                             ExpressionAttributeValues: {
                                 ':v1': args.handle,
                             },
                         },
                         callback
                     )
                    )
    //then parse the result
}

