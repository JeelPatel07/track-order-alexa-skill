const axios = require("axios");

const rp = require("request-promise");

let SKILL_NAME = "tradeprint";

let HELP_MESSAGE =
  "Welcome to TradePrint Business Model . You can ask me things like, What is the  status for product!! What can I help you with?";
let HELP_REPROMPT = "What can I help you with?";

let client_id = "XXXXXXXXXXXXXXXXXX";
let client_secret = "XXXXXXXXXX";
let ctools_customer_id = "XXXXXXXXXXX";
let ctools_project_key = "XXXXXXXX";
let ctools_scope = "XXXXXXXXXXXXXXXXXXXX";

const cToolsOperations = require("./cToolsOperations")(
  client_id,
  client_secret,
  ctools_project_key,
  ctools_scope
);

const weekNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const dateFormatter = inputDate => {
  let date = inputDate;

  let formattedDate;
  if (date.trim().length > 0) {
    let dateObject = new Date(date);
    formattedDate =
      weekNames[dateObject.getDay()] +
      " " +
      dateObject.getDate() +
      " " +
      monthNames[dateObject.getMonth()] +
      " " +
      dateObject.getFullYear();
  } else {
    formattedDate = "Delivery date unavailable";
  }
  return formattedDate;
};
const newdateFormatter = newinputDate => {
  let newdate = newinputDate;

  let newformattedDate;
  if (newdate.trim().length > 0) {
    let newdateObject = new Date(newdate);
    newformattedDate =
      weekNames[newdateObject.getDay() + 1] +
      " " +
      "  " +
      [newdateObject.getDate() + 1] +
      "  " +
      monthNames[newdateObject.getMonth()] +
      " " +
      newdateObject.getFullYear();
  } else {
    newformattedDate = " Reorder Delivery date unavailable";
  }
  return newformattedDate;
};

const mainHandler = {
  LaunchRequest: function() {
    console.log("in main launchrequest");
    this.response.speak(SKILL_NAME);
    this.response.cardRenderer(HELP_MESSAGE);
    this.response.speak(HELP_MESSAGE);
    this.response.listen(HELP_REPROMPT);

    this.emit(":responseReady");
  },

  // Begining of OrderIntent..,
  OrderIntent: async function() {
    console.log(
      "OrderNumber intent=" + JSON.stringify(this.event.request.intent.slots)
    );
    const orderNum = this.event.request.intent.slots.order.value;

    let myOrders = await cToolsOperations.getLineItemsForCustomer(
      ctools_customer_id
    );
    console.log("myjson is=" + JSON.stringify(myOrders));

    let searchedOrders = myOrders.filter(item => {
      console.log(
        `item orderNumber: ${item.orderNumber} ::: orderNum: ${orderNum} `
      );

      return item.orderNumber.toUpperCase() === orderNum.toUpperCase();
    });

    if (searchedOrders.length > 0) {
      console.log("order found");
      let responseObjectOrder = searchedOrders[0];

      let RESPONSE_TEXT =
        "The current status of " +
        responseObjectOrder.orderNumber +
        " is   " +
        responseObjectOrder.orderState +
        " . ";

      this.response.cardRenderer(RESPONSE_TEXT);
      this.response.speak(RESPONSE_TEXT);
      this.response.shouldEndSession(false);
      this.response.listen(HELP_REPROMPT);
      this.emit(":responseReady");
    } else {
      console.log("Sorry Order  not Found...");

      let RESPONSE_TEXT =
        "   Order is not Placed . Can you please say that again?";
      this.response.cardRenderer(RESPONSE_TEXT);
      this.response.speak(RESPONSE_TEXT);
      this.response.shouldEndSession(false);
      this.response.listen(HELP_REPROMPT);
      this.emit(":responseReady");
    } // End of OrderIntent..
  },

  // Begining of LastOrderIntent..
  LastOrderIntent: async function() {
    console.log("in LastOrderIntent");
    let myOrders = await cToolsOperations.getLineItemsForCustomer(
      ctools_customer_id
    );
    if (myOrders.length > 0) {
      let latestOrder = myOrders[0];

      let RESPONSE_TEXT =
        "The current status of latest order with name " +
        latestOrder.name +
        " is  in " +
        " " +
        latestOrder.shipmentState +
        " arrival date  " +
        " " +
        dateFormatter(latestOrder.arrivalDate) +
        "  " +
        " . ";
      this.response.cardRenderer(RESPONSE_TEXT);
      this.response.speak(RESPONSE_TEXT);
      this.response.shouldEndSession(false);
      this.response.listen(HELP_REPROMPT);
      this.emit(":responseReady");
    } else {
      let RESPONSE_TEXT = "No orders found.";
      this.response.cardRenderer(RESPONSE_TEXT);
      this.response.speak(RESPONSE_TEXT);
      this.response.shouldEndSession(false);
      this.response.listen(HELP_REPROMPT);
      this.emit(":responseReady");
    } //  End of LastOrderIntent..
  },

  // Begining  ProductIntent
  ProductIntent: async function() {
    let me = this;

    console.log("this.event" + JSON.stringify(this.event));

    console.log(
      "product intent=" + JSON.stringify(this.event.request.intent.slots)
    );
    const productname = this.event.request.intent.slots.productname.value;

    let myOrders = await cToolsOperations.getLineItemsForCustomer(
      ctools_customer_id
    );

    let searchedOrders = myOrders.filter(item => {
      console.log(
        `item name: ${item.name.toUpperCase()} ::: productname: ${productname.toUpperCase()} `
      );
      return item.name.toUpperCase() === productname.toUpperCase();
    });

    if (searchedOrders.length > 0) {
      console.log("product found");
      let responseObject = searchedOrders[0];

      let RESPONSE_TEXT =
        "The current status of " +
        productname +
        " is  in " +
        " " +
        responseObject.shipmentState +
        " arrival date  " +
        " " +
        dateFormatter(responseObject.arrivalDate) +
        "  " +
        " . ";
      me.response.cardRenderer(RESPONSE_TEXT);
      me.response.speak(RESPONSE_TEXT);
      me.response.shouldEndSession(false);
      me.response.listen(HELP_REPROMPT);
      me.emit(":responseReady");
    } else {
      console.log("Sorry Order  not Found...");

      let RESPONSE_TEXT =
        "   Order is not Placed . Can you please say that again?";
      me.response.speak(RESPONSE_TEXT);
      me.response.shouldEndSession(false);
      me.response.listen(HELP_REPROMPT);
      me.emit(":responseReady");
    } // End of ProductIntent..
  },

  Unhandled: function() {
    this.response.speak(
      "Sorry I didnt understand that. Say help if you need any assistance."
    );
    this.response.listen(HELP_REPROMPT);
    this.emit(":responseReady");
  }
};

module.exports = mainHandler;
