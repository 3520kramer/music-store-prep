import { ROOT_URL, IMG_NEXT_PATH } from "../../../js/constants.js";
import { formatTime, formatSize, getUrlAndParam } from "../../../js/common.js";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc19hZG1pbiI6ZmFsc2UsImZpcnN0X25hbWUiOiJMdVx1MDBlZHMiLCJsYXN0X25hbWUiOiJHb25cdTAwZTdhbHZlcyIsImV4cCI6MTYzOTgyMjU4OX0.f2Ci-5M5tYA4VWSq94kMc7LQBLlx2mnCbDNBNQyOnO8";

console.log(`${ROOT_URL}/albums/view`);

const trackWrapper = $("#album-wrapper");

const [url, param] = getUrlAndParam();

if (url === `${ROOT_URL}/albums/view/`) {
  console.log("IN", url, param);
  $.ajax({
    url: `/exam/music-store-api/albums/${param}`,
    type: "GET",
    headers: { Authorization: "Bearer " + token },
    success: function (response) {
      console.log("response", response);

      const albumSection = createAlbumElements(response["album"]);
      const trackSection = createTrackList(response["tracks"]);

      trackWrapper.append([albumSection, trackSection]);
    },
  });

  const createAlbumElements = (album) => {
    const section = $("<section />", { id: "view-album" }).append([
      $("<img />", {
        id: "album-img",
        src: album["imgUrl"],
        alt: `${album["albumName"]} cover art`,
      }),
      $("<h2 />", { text: album["albumName"] }),

      $("<a />", {
        href: `${ROOT_URL}/artists/view?id=${album["artistId"]}`,
      }).append($("<p />", { text: album["artistName"] })),
    ]);
    return section;
  };

  const createTrackList = (tracks) => {
    const section = $("<section />", { id: "album-track-section" }).append(
      $("<h3 />", { text: "Tracks" })
    );
    const trackList = $("<ul />", { class: "album-track-list" }).appendTo(
      section
    );

    tracks.forEach((track) => {
      const id = track["trackId"];
      const listItem = $("<li />", { id: id }).appendTo(trackList);
      const listAnchor = $("<a />", {
        href: `${ROOT_URL}/tracks/view/${id}`,
      }).appendTo(listItem);

      $("<p />", {
        text: track["trackTitle"],
        class: "truncate-word",
      }).appendTo(listAnchor);

      $("<img />", {
        src: IMG_NEXT_PATH,
        alt: "Show more",
      }).appendTo(listAnchor);
    });

    return section;
  };
}
