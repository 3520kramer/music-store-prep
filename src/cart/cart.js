import {
  CART_SESSION_ROUTE,
  TRACKS_ENDPOINT,
  HEADERS,
  TRASHCAN_IMG_PATH,
  CHECKOUT_ROUTE,
} from "../../js/constants.js";
import { globalJquery } from "../../js/common.js";

$(document).ready(async function () {
  globalJquery();
  console.log(window.location.pathname);

  const cartWrapper = $("#cart-wrapper");

  let cart;

  let res = await fetch(CART_SESSION_ROUTE);

  console.log(res);
  if (res.status === 200) {
    res = await res.json();
  } else if (res.status === 204) {
    cartWrapper.append($("<h2 />", { text: "Empty Cart" }));
  }

  $.ajax({
    url: `${TRACKS_ENDPOINT}?ids=${res}`,
    type: "GET",
    headers: HEADERS,
    success: function (response) {
      cart = response;
      console.log("cart", cart);

      const section = createCartTrackList(cart);

      let sum = 0;
      response.forEach((track) => (sum += parseFloat(track["trackPrice"])));
      createButton(sum).appendTo(section);

      cartWrapper.append(section);
    },
  });

  // $("#cart-wrapper").on("click", "li", function (e) {
  //   const id = $(this).attr("id");
  //   console.log(id);
  // });

  // Delete button
  cartWrapper.on("click", "img", async function (e) {
    const id = $(this).attr("id");
    console.log("img", id);

    const res = await fetch(`${CART_SESSION_ROUTE}?id=${id}`, {
      method: "DELETE",
    }).catch((err) => console.log(err));

    if (res.ok) {
      $("#" + id).remove();
      cart = cart.filter((x) => x.trackId === id);
      console.log("cart", cart);
      if (cart.length === 0) {
        $(cartWrapper).find("section").remove();
        $("#empty-cart").show();
      }
    }
  });

  cartWrapper.on("click", "#checkout-button", async function (e) {
    // find spans with ID attribute
    const ids = cartWrapper
      .find("li[id]")
      .map(() => {
        return this.id;
      }) // convert to set of IDs
      .get();

    console.log(ids);

    window.location.href = CHECKOUT_ROUTE;
  });
});

const createCartTrackList = (tracks) => {
  const section = $("<section />", { id: "cart-track-section" }).append(
    $("<h3 />", { text: "Tracks" })
  );
  const trackList = $("<ul />", { class: "cart-track-list" }).appendTo(section);

  tracks.forEach((track) => {
    const id = track["trackId"];
    const listItem = $("<li />", { id: id }).appendTo(trackList);

    $("<img />", {
      src: track["imgUrl"],
      alt: "albumart",
    }).appendTo(listItem);

    $("<p />", {
      text: track["trackTitle"],
      class: "truncate-word",
    }).appendTo(listItem);

    $("<p />", {
      text: `${track["trackPrice"]} $  -  ${track["artistName"]}`,
      class: "truncate-word",
    }).appendTo(listItem);

    $("<img />", {
      src: TRASHCAN_IMG_PATH,
      alt: "Show more",
      id: id,
    }).appendTo(listItem);
  });

  return section;
};

const createButton = (total) => {
  return $("<a />", {
    // href: "google.com",
    class: "button",
    id: "checkout-button",
  }).append($("<p />", { text: `Checkout - ${total} $` }));
};
