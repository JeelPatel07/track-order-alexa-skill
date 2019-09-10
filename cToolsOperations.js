const axios = require("axios");
module.exports = function commerceToolsOperations(
  clientId,
  clientSecret,
  ctoolsProject,
  ctoolsScope
) {
  var ctoolsToken = (function generateCtoolsToken() {
    try {
      return axios({
        method: "post",
        url:
          "https://auth.sphere.io/oauth/token?grant_type=client_credentials&scope=" +
          ctoolsScope,
        auth: {
          username: clientId,
          password: clientSecret
        }
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  })();

  async function getLineItemsForCustomer(customerId) {
    let myLineItems = [];
    try {
      const response = await getByCustomerIdInDesc(customerId);
      for (var i = 0; i < response.data.results.length; i++) {
        for (var j = 0; j < response.data.results[i].lineItems.length; j++) {
          let struct = {
            name: response.data.results[i].lineItems[
              j
            ].custom.fields.mcpPrductName.toUpperCase(),
            arrivalDate:
              response.data.results[i].lineItems[j].custom.fields
                .promisedArrivalDate,
            shipmentState:
              response.data.results[i].lineItems[j].state[0].state.obj.key,
            lineItemNumber:
              response.data.results[i].lineItems[j].custom.fields
                .lineItemNumber,
            orderNumber: response.data.results[i].orderNumber,
            orderState: response.data.results[i].orderState
          };
          myLineItems.push(struct);
        }
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
    return myLineItems;
  }

  async function getByCustomerIdInDesc(customerId) {
    try {
      return axios({
        method: "get",
        url: " ##### API ##### " + ctoolsProject + "/orders",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await ctoolsToken).data.access_token
        },
        params: {
          where: `customerId="${customerId}"`,
          limit: 100,
          sort: "createdAt desc",
          expand: "lineItems[*].state[*].state"
        }
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  return {
    getLineItemsForCustomer: getLineItemsForCustomer
  };
};
