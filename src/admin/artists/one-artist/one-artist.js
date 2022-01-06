import {
  TRACKS_ENDPOINT,
  HEADERS,
  ARTISTS_ENDPOINT,
  ALBUMS_ENDPOINT,
  ADMIN_ARTISTS_ROUTE,
} from "../../../../js/constants.js";
import {
  reduceFormValues,
  globalJquery,
  displaySnackbar,
  getPathParams,
} from "../../../../js/common.js";

$(document).ready(function () {
  globalJquery();
  const path = getPathParams("artists-");

  if (path[0] === "create") {
    handleCreate();
  } else if (path[0] === "view") {
    const trackId = path[1];
    handleUpdate(trackId);
  }
});

function handleCreate() {
  const section = $("#one-artist-section");

  section.find("#delete-button").hide();
  section.find("form input[type=submit]").val("Create Artist");
  section.find("h2").text("Create Artist");

  section.find("form").submit(function (e) {
    e.preventDefault();
    const artistName = $(this).serializeArray()[0]["value"];

    const dto = { Name: artistName };

    $.ajax({
      url: ARTISTS_ENDPOINT,
      type: "POST",
      headers: HEADERS,
      data: dto,
      success: function (res) {
        displaySnackbar(
          "Successfully created artist",
          "success",
          () => (window.location.href = ADMIN_ARTISTS_ROUTE),
          1500
        );
      },
      error: function (error) {
        displaySnackbar("Error creating artist", "error");
      },
    });
  });
}

const handleUpdate = (artistId) => {
  const section = $("#one-artist-section");

  $.ajax({
    url: `${ARTISTS_ENDPOINT}/${artistId}`,
    type: "GET",
    success: function (res) {
      console.log(res);
      section.find("input[name=artistName]").val(res["Name"]);
    },
    error: function (error) {
      console.log(error.responseText);
    },
  });

  section.find("form").submit(function (e) {
    e.preventDefault();
    const artist = reduceFormValues($(this));

    const dto = {
      ArtistId: artistId,
      Name: artist["artistName"],
    };

    $.ajax({
      url: `${ARTISTS_ENDPOINT}/${artistId}`,
      type: "POST",
      headers: HEADERS,
      data: dto,
      success: async function (response) {
        displaySnackbar(
          "Succesfully updated artist",
          "success",
          () => (window.location.href = ADMIN_ARTISTS_ROUTE),
          1500
        );
      },
      error: function (error) {
        displaySnackbar("Unable to update artist", "error");
      },
    });
  });
  section.find("#delete-button").click(function (e) {
    e.preventDefault();
    $.ajax({
      url: `${ARTISTS_ENDPOINT}/${artistId}`,
      type: "DELETE",
      headers: HEADERS,
      success: function (response) {
        displaySnackbar(
          "Succesfully deleted artist",
          "success",
          () => (window.location.href = ADMIN_ARTISTS_ROUTE),
          () => (window.location.href = ADMIN_ARTISTS_ROUTE)
        );
      },
      error: function (error) {
        displaySnackbar("Unable to delete artist", "error");
      },
    });
  });
};
