/* INTERNAL ROUTES */
export const ROOT_URL = "/exam/music-store";
// export const ROOT_URL = "";

export const TRACKS_ROUTE = ROOT_URL + "";
export const VIEW_TRACK_ROUTE = "";

export const ARTISTS_ROUTE = "";
export const VIEW_ARTIST_ROUTE = "";

export const ALBUMS_ROUTE = "";
export const VIEW_ALBUM_ROUTE = "";

export const VIEW_CART_ROUTE = ROOT_URL + "/cart";
export const CHECKOUT_ROUTE = ROOT_URL + "/cart/checkout";
export const CHECKOUT_DONE_ROUTE = ROOT_URL + "/cart/checkout-done/";

export const MY_ACCOUNT_ROUTE = ROOT_URL + "/my-account";
export const SIGN_IN_ROUTE = ROOT_URL + "/my-account/sign-in";
export const SIGN_OUT_ROUTE = ROOT_URL + "/my-account/sign-out";
export const REGISTER_ROUTE = ROOT_URL + "/my-account/register";

export const ADMIN_TRACKS_ROUTE = ROOT_URL + "/admin/tracks";
export const ADMIN_ARTISTS_ROUTE = ROOT_URL + "/admin/artists";
export const ADMIN_ALBUMS_ROUTE = ROOT_URL + "/admin/albums";

export const ADMIN_CREATE_TRACK_ROUTE = ROOT_URL + "/admin/tracks-create";
export const ADMIN_CREATE_ARTIST_ROUTE = ROOT_URL + "/admin/artists-create";
export const ADMIN_CREATE_ALBUM_ROUTE = ROOT_URL + "/admin/albums-create";

/* INTERNAL ENDPOINT FOR SESSION*/
export const CREATE_SESSION_ROUTE =
  ROOT_URL + "/src/session/create_session.php";

export const DESTROY_SESSION_ROUTE =
  ROOT_URL + "/src/session/destroy_session.php";

export const CART_SESSION_ROUTE = ROOT_URL + "/src/session/cart.php";
export const CUSTOMER_SESSION_ROUTE = ROOT_URL + "/src/session/customer.php";

/* "EXTERNAL" API ENDPOINTS */
export const API_ROOT_URL = "/exam/music-store-api";
// export const API_ROOT_URL = "https://music-store-api-webdev.herokuapp.com";

export const TRACKS_ENDPOINT = API_ROOT_URL + "/tracks";
export const SIGN_IN_CUSTOMER_ENDPOINT = API_ROOT_URL + "/auth/customer";
export const SIGN_IN_ADMIN_ENDPOINT = API_ROOT_URL + "/auth/admin";
export const INVOICES_ENDPOINT = API_ROOT_URL + "/invoices";
export const CUSTOMER_ENDPOINT = API_ROOT_URL + "/customers";
export const GENRES_ENDPOINT = API_ROOT_URL + "/genres";
export const MEDIATYPES_ENDPOINT = API_ROOT_URL + "/mediatypes";
export const ARTISTS_ENDPOINT = API_ROOT_URL + "/artists";
export const ALBUMS_ENDPOINT = API_ROOT_URL + "/albums";
export const SEARCH_ENDPOINT = API_ROOT_URL + "/search";

/* IMAGES */
export const IMG_NEXT_PATH = ROOT_URL + "/images/next.png";
export const TRASHCAN_IMG_PATH = ROOT_URL + "/images/close.png";

/* MISC */
const token = "";
export const HEADERS = {
  Authorization: `Bearer ${localStorage.getItem("jwt")}`,
};
