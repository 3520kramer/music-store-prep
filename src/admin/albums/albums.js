import { ADMIN_CREATE_ALBUM_ROUTE } from "../../../js/constants.js";
import { globalJquery, createAlbumList } from "../../../js/common.js";

$(document).ready(function () {
  globalJquery();

  const wrapper = $("#admin-albums");
  const loading = $("#loading");
  const error = $("#error");

  $("#create-album").click(function (e) {
    window.location.href = ADMIN_CREATE_ALBUM_ROUTE;
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

        if (response["albums"].length > 0) {
          console.log("albums");
          sections.push(createAlbumList(response["albums"], "albums-view"));
        }

        // HANDLE EMPTY RESPONSE
        if (sections.length === 0) {
          sections.push($("<h3 />", { text: "No results - please try again" }));
        }
        wrapper.append(sections);
      },
    });
  });
});
