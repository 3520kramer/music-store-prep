import {
  INVOICES_ENDPOINT,
  HEADERS,
  CUSTOMER_ENDPOINT,
  CUSTOMER_SESSION_ROUTE,
  CART_SESSION_ROUTE,
  CHECKOUT_DONE_ROUTE,
} from "../../../js/constants.js";
import {
  globalJquery,
  reduceFormValues,
  displaySnackbar,
} from "../../../js/common.js";

$(document).ready(async function () {
  globalJquery();
  let customerId;

  $("#checkout-section .button").click(async function (e) {
    customerId = await fetch(CUSTOMER_SESSION_ROUTE, {
      headers: HEADERS,
    }).then((res) => res.text());

    console.log(customerId);

    $.ajax({
      url: `${CUSTOMER_ENDPOINT}/${customerId}`,
      type: "GET",
      headers: HEADERS,
      success: function (res) {
        console.log(res);
        const form = $("#checkout-form");
        form.find("input[name=address]").val(res["Address"]);
        form.find("input[name=city]").val(res["City"]);
        form.find("input[name=state]").val(res["State"]);
        form.find("input[name=country]").val(res["Country"]);
        form.find("input[name=postalCode]").val(res["PostalCode"]);
      },
      error: function (error) {
        console.log(error.responseText);
      },
    });
  });
  /* 
    Once:
    CustomerId, db adress or from form?, total,

    Multiple:
    trackid, price, quantity(1)
    */
  $("#checkout-form").submit(async function (e) {
    e.preventDefault();

    const addressInformation = reduceFormValues($(this));

    const trackIds = await fetch(CART_SESSION_ROUTE).then((res) => res.json());

    const dto = {
      customerId: customerId,
      address: addressInformation["address"],
      city: addressInformation["city"],
      postalCode: addressInformation["postalCode"],
      state: addressInformation["state"],
      country: addressInformation["country"],
      trackIds: trackIds,
    };

    console.log("dto", dto);

    $.ajax({
      url: INVOICES_ENDPOINT,
      type: "POST",
      headers: HEADERS,
      data: dto,
      success: async function (response) {
        await fetch(CART_SESSION_ROUTE, { method: "DELETE" });
        displaySnackbar(
          "Successfully created order",
          "success",
          () =>
            (window.location.href = `${CHECKOUT_DONE_ROUTE}${response["invoice_id"]}`),
          1500
        );
      },
      error: function (error) {
        displaySnackbar("Error creating order", "error");
      },
    });
  });
});
