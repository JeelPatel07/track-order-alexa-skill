## Track Your  Products using Alexa 


Demo for tracking Products via Custom Alexa Skills.

## What You Will Need

- [Amazon Developer Account](https://developer.amazon.com/en-US/alexa)
- [Amazon Web Service Account](https://aws.amazon.com/)
- [AWS Command Line Interface (CLI)](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
- [Alexa Skills Kit Command Line Interface (ASK CLI)](https://developer.amazon.com/en-US/docs/alexa/smapi/quick-start-alexa-skills-kit-command-line-interface.html)
- [Node.JS](https://nodejs.org/en/)
- [Cimpress Docs](https://docs.commercetools.com/)


## API Endpoints

### 1. Endpoint: GET /api/{cToolsProject}/{orders}

Get the Information about the products 

#### Response

- `Status : 200`
- `Content-Type: "application/json"`
```json
[
 {
  "orderNumber" : "A2YQ2S2TQ2Z",
  "orderState"  : "Confirmed"
 }
]
```

 ### 2. Endpoint: GET /api/{cToolsProject}/{carts}
 
 Get  Information about the LineItems details
 
 #### Response

- `Status : 200`
- `Content-Type: "application/json"`
```json
[
 {
  "lineItemNumber" : "R1YQ23H32Q2Z",
  "shipmentState"  : "WaitingForArtWork",
  "arrivalDate"    : "2020-05-14T11:30:00.000Z"
 }
]
```

# Set Up the Demo

Be sure you have the AWS CLI and ASK CLI setup.

#### AWS setup steps

First, you will set up the AWS Lambda function, which contains the skill service code, as part of a CloudFormation stack called PingMe. The stack also includes the AWS Lambda trigger, IAM role, and a DynamoDB table to track userIds. The IAM role (Identity Access Management) provides the necessary permissions for the Lambda function to read and write from the DyanmoDB table.

- Note: Note: The CloudFormation package should be run from the us-east-1 region, also known as N. Virginia. Verify your default region in the AWS CLI by typing `aws configure` and pressing enter four times.

