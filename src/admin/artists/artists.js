import {
  SIGN_IN_ADMIN_ENDPOINT,
  CREATE_SESSION_ROUTE,
  REGISTER_ROUTE,
  MY_ACCOUNT_ROUTE,
  IMG_NEXT_PATH,
  ADMIN_CREATE_ARTIST_ROUTE,
} from "../../../js/constants.js";
import {
  reduceFormValues,
  globalJquery,
  createArtistList,
} from "../../../js/common.js";

$(document).ready(function () {
  globalJquery();

  const wrapper = $("#admin-tracks");

  const loading = $("#loading");
  const error = $("#error");

  $("#create-artist").click(function (e) {
    window.location.href = ADMIN_CREATE_ARTIST_ROUTE;
  });

  $(".search-form").submit(function (e) {
    e.preventDefault();
    console.log(e);

    const search = $(this).serializeArray()[0]["value"];

    $(document).ajaxStart(function () {
      wrapper.empty();
      error.hide();
      loading.show();
    });

    $(document).ajaxStop(function () {
      loading.hide();
    });

    $(document).ajaxError(function () {
      error.show();
    });

    $.ajax({
      url: `/exam/music-store-api/search?value=${search}`,

      type: "GET",
      success: function (response) {
        const sections = [];

        if (response["artists"].length > 0) {
          sections.push(createArtistList(response["artists"], "artists-view"));
        }

        // if (response["albums"].length > 0) {
        //   sections.push(createAlbumList(response["albums"]));
        // }

        // if (response["tracks"].length > 0) {
        //   sections.push(createTrackList(response["tracks"], "/artists-view"));
        // }

        // HANDLE EMPTY RESPONSE
        if (sections.length === 0) {
          sections.push($("<h3 />", { text: "No results - please try again" }));
        }
        wrapper.append(sections);
      },
    });
  });
});
