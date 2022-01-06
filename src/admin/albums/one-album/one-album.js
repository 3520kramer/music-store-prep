import {
  ARTISTS_ENDPOINT,
  ALBUMS_ENDPOINT,
  ADMIN_ALBUMS_ROUTE,
  HEADERS,
} from "../../../../js/constants.js";
import {
  reduceFormValues,
  globalJquery,
  displaySnackbar,
  getPathParams,
} from "../../../../js/common.js";

$(document).ready(function () {
  globalJquery();
  const path = getPathParams("/albums-");
  console.log(path);
  if (path[0] === "create") {
    handleCreate();
  } else if (path[0] === "view") {
    const albumId = path[1];
    handleUpdate(albumId);
  }
});

function handleCreate() {
  const section = $("#one-album-section");
  section.find("#delete-button").hide();
  section.find("form input[type=submit]").val("Create Album");
  section.find("h2").text("Create album");

  const selectForArtist = section.find("select[name=artist]");

  $.get(ARTISTS_ENDPOINT, (data) => {
    appendOptionsToSelect(selectForArtist, data, true);
    selectForArtist.val("");
  });

  section.find("form").submit(function (e) {
    e.preventDefault();
    const album = reduceFormValues($(this));

    const dto = {
      Title: album["albumTitle"],
      ArtistId: section.find("#artist option:selected").val(),
    };

    $.ajax({
      url: ALBUMS_ENDPOINT,
      type: "POST",
      headers: HEADERS,
      data: dto,
      success: function (response) {
        displaySnackbar(
          "Successfully created album",
          "success",
          () => (window.location.href = ADMIN_ALBUMS_ROUTE),
          1500
        );
      },
      error: function (error) {
        displaySnackbar("Error creating album", "error");
      },
    });
  });
}

const handleUpdate = (albumId) => {
  const section = $("#one-album-section");
  const selectForArtist = section.find("select[name=artist]");

  $.get(ARTISTS_ENDPOINT, (data) => {
    appendOptionsToSelect(selectForArtist, data, false);

    $.ajax({
      url: `${ALBUMS_ENDPOINT}/${albumId}`,
      type: "GET",
      success: function (res) {
        console.log(res);

        section.find("input[name=albumTitle]").val(res["Title"]);
        section
          .find(`#artist option[value=${res["ArtistId"]}]`)
          .prop("selected", "selected");
      },
      error: function (error) {
        console.log(error.responseText);
      },
    });
  });

  section.find("form").submit(function (e) {
    e.preventDefault();
    const track = reduceFormValues($(this));

    const dto = {
      AlbumId: albumId,
      Title: track["albumTitle"],
      ArtistId: section.find("#artist option:selected").val(),
    };
    console.log(dto);

    $.ajax({
      url: ALBUMS_ENDPOINT,
      type: "POST",
      headers: HEADERS,
      data: dto,
      success: function (response) {
        displaySnackbar("Succesfully updated album", "success");
      },
      error: function (error) {
        displaySnackbar(
          "Unable to update album",
          "error",
          () => (window.location.href = ADMIN_ALBUMS_ROUTE),
          1500
        );
      },
    });
  });

  section.find("#delete-button").click(function (e) {
    e.preventDefault();
    $.ajax({
      url: `${ALBUMS_ENDPOINT}/${albumId}`,
      type: "DELETE",
      headers: HEADERS,
      success: async function (response) {
        displaySnackbar(
          "Succesfully deleted album",
          "success",
          () => (window.location.href = ADMIN_ALBUMS_ROUTE),
          1500
        );
      },
      error: function (error) {
        console.log(error.responseText);
        displaySnackbar("Unable to delete album", "error");
      },
    });
  });
};

const appendOptionsToSelect = (select, data, isInitial) => {
  let options = data.map((option) => {
    const id = option[Object.keys(option)[0]];
    const text = option[Object.keys(option)[1]];

    return $("<option/>", {
      value: id,
      text: text,
    }).appendTo(select);
  });

  if (isInitial) {
    const emptyOption = $("<option/>", {
      value: -1,
      text: "Please select a value from the list",
    }).prop("selected", true);

    options = [emptyOption, ...options];
    select.append(options);
    // select.val("eheheh");
    return;
  }

  select.empty();
  select.append(options);
};
