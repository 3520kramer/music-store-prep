import { ROOT_URL, IMG_NEXT_PATH } from "./constants.js";

/************* JQUERY *************/
export const globalJquery = () =>
  $(document).ready(function () {
    /* Header */
    $("#menu-icon").on("click", function (event) {
      event.preventDefault();
      $("nav").slideToggle(100);
    });
    /* */
  });
export const getPathParams = (offset_string) => {
  let req_type = window.location.pathname.split(offset_string)[1];
  req_type = req_type.endsWith("/") ? req_type.slice(0, -1) : req_type;
  return req_type.split("/");
};

export const displaySnackbar = (text, status, callback, length) => {
  const snackbar = $("#snackbar");
  snackbar.text(text).addClass(`show ${status}`);

  setTimeout(
    function () {
      snackbar.removeClass("show success error info");
      if (callback) callback();
    },
    !length ? 3000 : length
  );
};

export const createTrackList = (tracks, href) => {
  const section = $("<section />", { id: "track-section" }).append(
    $("<h3 />", { text: "Tracks" })
  );
  const trackList = $("<ul />", { class: "track-list" }).appendTo(section);

  tracks.forEach((track) => {
    const id = track["id"];

    const listItem = $("<li />", { id: id }).appendTo(trackList);
    const listAnchor = $("<a />", { href: `${href}/${id}` }).appendTo(listItem);

    $("<img />", {
      src: track["imgUrl"] ?? ROOT_URL + "/images/music-album.png",
      alt: "Show more",
    }).appendTo(listAnchor);

    $("<p />", { text: track["trackName"], class: "truncate-word" }).appendTo(
      listAnchor
    );
    $("<p />", { text: track["artistName"], class: "truncate-word" }).appendTo(
      listAnchor
    );

    $("<img />", {
      src: IMG_NEXT_PATH,
      alt: "Show more",
    }).appendTo(listAnchor);
  });
  return section;
};

export const createArtistList = (artists, href) => {
  const section = $("<section />", { id: "artist-section" }).append(
    $("<h3 />", { text: "Artists" })
  );
  const artistList = $("<ul />", { class: "artist-list" }).appendTo(section);

  artists.forEach((artist) => {
    const id = artist["id"];
    const listItem = $("<li />", { id: id }).appendTo(artistList);
    const listAnchor = $("<a />", { href: `${href}/${id}` }).appendTo(listItem);

    $("<img />", {
      src:
        artist["imgUrl"] ??
        "https://e-cdns-images.dzcdn.net/images/artist/250x250-000000-80-0-0.jpg",
      alt: "Show more",
    }).appendTo(listAnchor);

    $("<p />", { text: artist["artistName"], class: "truncate-word" }).appendTo(
      listAnchor
    );

    $("<img />", {
      src: IMG_NEXT_PATH,
      alt: "Show more",
    }).appendTo(listAnchor);
  });
  return section;
};

export const createAlbumList = (albums, href) => {
  const section = $("<section />", { id: "album-section" }).append(
    $("<h3 />", { text: "Albums" })
  );
  const trackList = $("<ul />", { class: "album-list" }).appendTo(section);

  albums.forEach((album) => {
    const id = album["id"];
    const listItem = $("<li />", { id: id }).appendTo(trackList);
    const listAnchor = $("<a />", { href: `${href}/${id}` }).appendTo(listItem);

    $("<img />", {
      src: album["imgUrl"] ?? ROOT_URL + "/images/music-album.png",
      alt: "Show more",
    }).appendTo(listAnchor);

    $("<p />", { text: album["albumName"], class: "truncate-word" }).appendTo(
      listAnchor
    );
  });
  return section;
};

/************* FUNCTIONS *************/
export const formatTime = (ms) => {
  const date = new Date(ms);
  const seconds = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();
  return `${date.getMinutes()}:${seconds} min`;
};

export const formatSize = (bytes) => {
  const result = parseFloat(bytes / 1000000).toFixed(2);
  return `${result} mb`;
};

export const getUrlAndParam = () => {
  const pathname = window.location.pathname;
  const url = pathname.substr(0, pathname.lastIndexOf("/") + 1); //window.location.pathname.split("/");
  const param = pathname.substr(pathname.lastIndexOf("/") + 1, pathname.length);
  return [url, param];
};

export const reduceFormValues = (formValues) =>
  formValues
    .serializeArray()
    .reduce((obj, item) => ((obj[item.name] = item.value), obj), {});
