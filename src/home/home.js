import {
  ROOT_URL,
  IMG_NEXT_PATH,
  SEARCH_ENDPOINT,
} from "../../js/constants.js";
import {
  globalJquery,
  createTrackList,
  createArtistList,
  createAlbumList,
} from "../../js/common.js";

$(document).ready(function () {
  globalJquery();

  console.log(`${ROOT_URL}/home`);

  const wrapper = $("#search-result-wrapper");

  const loading = $("#loading");
  const error = $("#error");

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
      url: `${SEARCH_ENDPOINT}?value=${search}`,

      type: "GET",
      success: function (response) {
        console.log(response);

        const sections = [];

        if (response["artists"].length > 0) {
          console.log("artists");
          sections.push(createArtistList(response["artists"], "artists/view"));
        }

        if (response["albums"].length > 0) {
          console.log("albums");
          sections.push(createAlbumList(response["albums"], "albums/view"));
        }

        if (response["tracks"].length > 0) {
          console.log("tracks");
          sections.push(createTrackList(response["tracks"], "tracks/view"));
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
