import {
  INVOICES_ENDPOINT,
  HEADERS,
  CHECKOUT_ROUTE,
  CUSTOMER_ENDPOINT,
  CUSTOMER_SESSION_ROUTE,
  CART_SESSION_ROUTE,
  CHECKOUT_DONE_ROUTE,
  IMG_NEXT_PATH,
} from "../../../../js/constants.js";
import { getUrlAndParam, globalJquery } from "../../../../js/common.js";

globalJquery();
console.log(window.location.pathname);
const [url, param] = getUrlAndParam();

console.log(url, param);
console.log(CHECKOUT_DONE_ROUTE);

if (url === CHECKOUT_DONE_ROUTE) {
  const customer_id = await fetch(CUSTOMER_SESSION_ROUTE, {
    headers: HEADERS,
  }).then((res) => res.json());

  $.ajax({
    url: `${CUSTOMER_ENDPOINT}/${customer_id}/invoices/${param}`,
    method: "GET",
    headers: HEADERS,
    success: function (res) {
      console.log(res);

      const wrapper = $("#checkout-done-wrapper");

      createCheckoutInvoiceView(res["invoiceInfo"])
        .append(createCheckoutTrackList(res["tracks"]))
        .appendTo(wrapper);
    },
    error: function (err) {
      console.log(err.responseText);
    },
  });

  const createCheckoutInvoiceView = (invoiceData) => {
    const section = $("<section />", { id: "checkout-info-section" }).append(
      $("<h3 />", { text: `Invoice: ${invoiceData["InvoiceId"]}` })
    );

    const table = $("<table />", { class: "checkout-info-table" }).appendTo(
      section
    );
    // $("<tr />")
    //   .append([$("<th />").text("hey"), $("<th />").text("hey")])
    //   .appendTo(table);

    table.append([
      createRow("Customer", invoiceData["CustomerName"]),
      createRow("Invoice date", invoiceData["InvoiceDate"]),
      createRow("Address", invoiceData["BillingAddress"]),
      createRow("Postal code", invoiceData["BillingPostalCode"]),
      createRow("State", invoiceData["BillingState"]),
      createRow("Country", invoiceData["BillingCountry"]),
      createRow("Total", invoiceData["Total"]),
    ]);
    return section;
  };

  const createRow = (text1, text2) => {
    return $("<tr />").append([
      $("<td />").text(text1),
      $("<td />").text(text2),
    ]);
  };

  const createCheckoutTrackList = (tracks) => {
    // const section = $("<section />", { id: "checkout-track-section" })/*.append(
    //   $("<h3 />", { text: "Tracks" })
    // );*/
    const trackList = $("<ul />", {
      class: "checkout-track-list",
    }); /*.appendTo(
      section
    );*/

    tracks.forEach((track) => {
      const id = track["trackId"];
      const listItem = $("<li />", { id: id }).appendTo(trackList);

      $("<p />", {
        text: track["TrackName"],
        class: "truncate-word",
      }).appendTo(listItem);

      $("<p />", {
        text: track["UnitPrice"] + " $",
        class: "truncate-word",
      }).appendTo(listItem);
    });

    return trackList;
  };
}
