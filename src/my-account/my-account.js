import { ROOT_URL, DESTROY_SESSION_ROUTE } from "../../js/constants.js";
import { globalJquery } from "../../js/common.js";

$(document).ready(function () {
  globalJquery();

  $("#my-account-section a").on("click", function (e) {
    e.preventDefault();
    $.ajax({
      url: DESTROY_SESSION_ROUTE,
      type: "GET",
      success: function (res) {
        console.log(res);
        localStorage.removeItem("jwt");
        window.location.replace(ROOT_URL);
      },
    });
  });
});
