// import { ROOT_URL } from "./constants.js";

// // Compile multiple javascript files into one
// // This could be used: https://github.com/dfsq/compressJS.sh

// // For PROD:
// // By default, $.getScript() sets the cache setting to false. This appends a timestamped query parameter
// // to the request URL to ensure that the browser downloads the script each time it is requested.
// $.ajaxSetup({
//   cache: true,
// });

// $(document).ready(function () {
//   // if non-prod
//   loadScript("home/home.js");
//   loadScript("header/header.js");
//   loadScript("tracks/tracks.js");
//   loadScript("tracks/one-track/one-track.js");
//   loadScript("albums/one-album/one-album.js");
//   loadScript("cart/cart.js");
//   loadScript("cart/checkout/checkout.js");
//   loadScript("cart/checkout/checkout-done/checkout-done.js");
//   loadScript("my-account/my-account.js");
//   loadScript("my-account/sign-in/sign-in.js");

//   // if prod, concat the files above and load that script from the HTML
// });

// // Alternative to jQuery $.getScript - as it's not possible to declare the script
// // as a module - which makes it impossible to use import in scripts
// const loadScript = (filepath) =>
//   $(
//     `<script src="${ROOT_URL}/src/${filepath}" type="module" defer></script>`
//   ).appendTo(document.head);
