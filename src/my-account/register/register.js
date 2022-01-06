import {
  CUSTOMER_ENDPOINT,
  CREATE_SESSION_ROUTE,
  REGISTER_ROUTE,
  MY_ACCOUNT_ROUTE,
  SIGN_IN_ROUTE,
} from "../../../js/constants.js";
import {
  reduceFormValues,
  globalJquery,
  displaySnackbar,
} from "../../../js/common.js";

$(document).ready(function () {
  globalJquery();
  $("#register-section form").submit(function (e) {
    e.preventDefault();

    const input = reduceFormValues($(this));

    if (input["Password"] === input["Password2"]) {
      delete input["Password2"];

      $.ajax({
        url: CUSTOMER_ENDPOINT,
        type: "POST",
        data: input,
        success: function (response) {
          displaySnackbar(
            "User created - please sign in",
            "success",
            () => (window.location.href = SIGN_IN_ROUTE),
            1500
          );
        },
      });
    } else {
      displaySnackbar("Error", "error");

      $("#password-error-message").remove();
      $("#Password2").after(
        $("<p />", {
          text: "Passwords must match",
          class: "form-validation-error",
          id: "password-error-message",
        })
      );
    }
  });

  $("#sign-in-section a:nth-of-type(1)").on("click", function (e) {
    e.preventDefault();
    window.location.href = REGISTER_ROUTE;
  });
});
