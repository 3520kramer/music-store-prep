import { ROOT_URL, CART_SESSION_ROUTE } from "../../../js/constants.js";
import {
  formatTime,
  formatSize,
  getUrlAndParam,
  globalJquery,
} from "../../../js/common.js";

$(document).ready(function () {
  globalJquery();

  console.log(`${ROOT_URL}/tracks/view`);

  const trackWrapper = $("#view-track");

  const [url, param] = getUrlAndParam();

  if (url === `${ROOT_URL}/tracks/view/`) {
    $.ajax({
      url: `/exam/music-store-api/tracks/${param}`,
      type: "GET",
      success: function (response) {
        console.log("response", response);
        // Inject data into HTML
        trackWrapper.prepend(getTracksElements(response));
      },
    });

    $("#add-to-cart").on("click", function (e) {
      const snackbar = $("#snackbar");

      $.post(CART_SESSION_ROUTE, { id: param }, (res) => {
        snackbar.text("Track added to cart").addClass("show success");
      })
        .fail((err) => {
          if (err.status === 400) {
            snackbar.text("Track already added to cart").addClass("show info");
          }
          console.log("err", err);
        })
        .always(() => {
          setTimeout(function () {
            snackbar.removeClass("show");
          }, 3000);
        });
    });
  }
});

const getTracksElements = (track) => {
  return [
    $("<img />", {
      id: "track-album-img",
      src: track["imgUrl"],
      alt: `${track["albumName"]} cover art`,
    }),
    $("<h2 />", { text: track["trackTitle"] }),

    $("<a />", {
      href: `${ROOT_URL}/artists/view/${track["artistId"]}`,
    }).append($("<p />", { text: track["artistName"] })),

    $("<a />", {
      href: `${ROOT_URL}/albums/view/${track["albumId"]}`,
    }).append($("<p />", { text: track["albumName"] })),

    $("<p />").append([
      $("<span />", { text: `${track["trackGenre"]} - ` }),
      $("<span />", { text: `${formatTime(track["trackTime"])} - ` }),
      $("<span />", { text: `${formatSize(track["trackSize"])}` }),
    ]),
  ];
};
