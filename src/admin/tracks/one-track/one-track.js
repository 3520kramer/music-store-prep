import {
  TRACKS_ENDPOINT,
  HEADERS,
  GENRES_ENDPOINT,
  MEDIATYPES_ENDPOINT,
  ARTISTS_ENDPOINT,
  ALBUMS_ENDPOINT,
  ADMIN_TRACKS_ROUTE,
} from "../../../../js/constants.js";
import {
  reduceFormValues,
  globalJquery,
  displaySnackbar,
  getPathParams,
} from "../../../../js/common.js";

$(document).ready(function () {
  globalJquery();
  const path = getPathParams("/tracks-");
  console.log(path);
  if (path[0] === "create") {
    handleCreate();
  } else if (path[0] === "view") {
    const trackId = path[1];
    handleUpdate(trackId);
  }
});

function handleCreate() {
  const section = $("#one-track-section");

  section.find("#delete-button").hide();
  section.find("form input[type=submit]").val("Create track");
  section.find("h2").text("Create track");
  selectForAlbum.attr("disabled", true);

  const selectForGenres = section.find("select[name=trackGenre]");
  const selectForMediaType = section.find("select[name=trackMediaType]");
  const selectForArtist = section.find("select[name=artist]");
  const selectForAlbum = section.find("select[name=album]");

  $.get(GENRES_ENDPOINT, (data) => {
    appendOptionsToSelect(selectForGenres, data, true);
    selectForGenres.val("");
  });

  $.get(MEDIATYPES_ENDPOINT, (data) => {
    appendOptionsToSelect(selectForMediaType, data, true);
    selectForMediaType.val("");
  });

  $.get(ARTISTS_ENDPOINT, (data) => {
    appendOptionsToSelect(selectForArtist, data, true);
    console.log(data);
    selectForArtist.val("");
  });

  // get albums when selected artist changes
  section.find("select[name=artist]").change(function (e) {
    getArtistsAlbums($(this).val(), selectForAlbum, true);
    selectForAlbum.attr("disabled", false).val("");
  });

  section.find("form").submit(function (e) {
    e.preventDefault();
    const track = reduceFormValues($(this));

    const dto = {
      Name: track["trackTitle"],
      AlbumId: section.find("#album option:selected").val(),
      MediaTypeId: section.find("#trackMediaType option:selected").val(),
      GenreId: section.find("#trackMediaType option:selected").val(),
      Composer: track["trackComposer"],
      Milliseconds: track["trackTime"],
      Bytes: track["trackSize"],
      UnitPrice: track["trackPrice"],
    };
    console.log(dto);

    $.ajax({
      url: TRACKS_ENDPOINT,
      type: "POST",
      headers: HEADERS,
      data: dto,
      success: function (response) {
        displaySnackbar(
          "Successfully created track",
          "success",
          () => (window.location.href = ADMIN_TRACKS_ROUTE),
          1500
        );
      },
      error: function (error) {
        displaySnackbar("Error creating track", "error");
      },
    });
  });
}

const getArtistsAlbums = (artistId, selectForAlbum, isInitial) => {
  $.get(`${ALBUMS_ENDPOINT}?artistId=${artistId}`, (data) =>
    appendOptionsToSelect(selectForAlbum, data, isInitial)
  );
};

const handleUpdate = (trackId) => {
  const section = $("#one-track-section");
  const selectForGenres = section.find("select[name=trackGenre]");
  const selectForMediaType = section.find("select[name=trackMediaType]");
  const selectForArtist = section.find("select[name=artist]");
  const selectForAlbum = section.find("select[name=album]");

  $.get(GENRES_ENDPOINT, (data) =>
    appendOptionsToSelect(selectForGenres, data, false)
  );

  $.get(MEDIATYPES_ENDPOINT, (data) =>
    appendOptionsToSelect(selectForMediaType, data, false)
  );

  $.get(ARTISTS_ENDPOINT, (data) => {
    appendOptionsToSelect(selectForArtist, data, false);
    console.log(data);
  });

  $.ajax({
    url: `${TRACKS_ENDPOINT}/${trackId}`,
    type: "GET",
    success: function (res) {
      // initial get of albums
      getArtistsAlbums(res["artistId"], selectForAlbum);

      // get albums when selected artist changes
      section.find("select[name=artist]").change(function (e) {
        getArtistsAlbums($(this).val(), selectForAlbum);
      });

      console.log(res);
      section.find("input[name=trackTitle]").val(res["trackTitle"]);
      section.find("input[name=trackTime]").val(res["trackTime"]);
      section.find("input[name=trackSize]").val(res["trackSize"]);
      section.find("input[name=trackPrice]").val(res["trackPrice"]);
      section.find("input[name=trackComposer]").val(res["trackComposer"]);
      section
        .find(`#trackMediaType option[value=${res["trackMediaTypeId"]}]`)
        .prop("selected", "selected");
      section
        .find(`#trackGenre option[value=${res["trackGenreId"]}]`)
        .prop("selected", "selected");
      section
        .find(`#artist option[value=${res["artistId"]}]`)
        .prop("selected", "selected");
      section
        .find(`#album option[value=${res["albumId"]}]`)
        .prop("selected", "selected");
    },
    error: function (error) {
      console.log(error.responseText);
    },
  });

  section.find("form").submit(function (e) {
    e.preventDefault();
    const track = reduceFormValues($(this));

    const dto = {
      TrackId: trackId,
      Name: track["trackTitle"],
      AlbumId: section.find("#album option:selected").val(),
      MediaTypeId: section.find("#trackMediaType option:selected").val(),
      GenreId: section.find("#trackMediaType option:selected").val(),
      Composer: track["trackComposer"],
      Milliseconds: track["trackTime"],
      Bytes: track["trackSize"],
      UnitPrice: track["trackPrice"],
    };
    console.log(dto);

    $.ajax({
      url: `${TRACKS_ENDPOINT}/${trackId}`,
      type: "POST",
      headers: HEADERS,
      data: dto,
      success: async function (response) {
        displaySnackbar("Succesfully updated track", "success");
      },
      error: function (error) {
        displaySnackbar("Unable to update track", "error");
      },
    });
  });
  section.find("#delete-button").click(function (e) {
    e.preventDefault();
    $.ajax({
      url: `${TRACKS_ENDPOINT}/${trackId}`,
      type: "DELETE",
      headers: HEADERS,
      success: async function (response) {
        displaySnackbar("Succesfully deleted track", "success");
      },
      error: function (error) {
        console.log(error.responseText);
        displaySnackbar("Unable to delete track", "error");
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
