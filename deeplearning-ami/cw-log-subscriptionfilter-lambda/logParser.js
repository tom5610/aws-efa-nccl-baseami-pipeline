const zlib = require('zlib');

var AWS = require("aws-sdk");
var region = ???
AWS.config.update({region: region});

console.log("Loading function");

exports.handler = async (event, context) => {
    const payload = Buffer.from(event.awslogs.data, 'base64');
    const parsed = JSON.parse(zlib.gunzipSync(payload).toString('utf8'));
    console.log('Decoded payload:', JSON.stringify(parsed));
    
    var instanceId = parsed.logStream
    var account_id = ???
    var topic_arn = ???
    
    var params = {
        Message: JSON.stringify(parsed), 
        Subject: "GPU Xid Message detected on EC2 Instance - " + instanceId,
        TopicArn: "arn:aws:sns:${region}:${account_id}:${topic_arn}"
    };
    
    var sns = new AWS.SNS({apiVersion: '2010-03-31'})
    let snsResult = await sns.publish(params).promise();
    
    return `Successfully processed ${parsed.logEvents.length} log events.`;
};
