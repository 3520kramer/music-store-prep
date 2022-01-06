import { ADMIN_CREATE_TRACK_ROUTE } from "../../../js/constants.js";
import { globalJquery, createTrackList } from "../../../js/common.js";

$(document).ready(function () {
  globalJquery();

  const wrapper = $("#admin-tracks");
  const loading = $("#loading");
  const error = $("#error");

  $("#create-track").click(function (e) {
    window.location.href = ADMIN_CREATE_TRACK_ROUTE;
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
        console.log(response);

        const sections = [];

        // if (response["artists"].length > 0) {
        //   console.log("artists");
        //   sections.push(createArtistList(response["artists"]));
        // }

        // if (response["albums"].length > 0) {
        //   console.log("albums");
        //   sections.push(createAlbumList(response["albums"]));
        // }

        if (response["tracks"].length > 0) {
          console.log("tracks");
          sections.push(createTrackList(response["tracks"], "tracks-view"));
        }

        // HANDLE EMPTY RESPONSE
        if (sections.length === 0) {
          console.log("NO RES", response);
          sections.push($("<h3 />", { text: "No results - please try again" }));
        }
        wrapper.append(sections);
      },
    });
  });
});
