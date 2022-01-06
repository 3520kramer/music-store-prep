import {
  SIGN_IN_ADMIN_ENDPOINT,
  CREATE_SESSION_ROUTE,
  REGISTER_ROUTE,
  MY_ACCOUNT_ROUTE,
} from "../../../js/constants.js";
import { reduceFormValues, globalJquery } from "../../../js/common.js";

$(document).ready(function () {
  globalJquery();

  $("#menu-icon").hide();

  $("#admin-sign-in-section form").submit(function (e) {
    e.preventDefault();

    const input = reduceFormValues($(this));

    console.log(input);

    $.ajax({
      url: SIGN_IN_ADMIN_ENDPOINT,
      type: "POST",
      data: { username: input["username"], password: input["password"] },
      //data: { username: "luisg@embraer.com.br", password: "customer" },
      statusCode: {
        400: function (response) {
          console.log("ajax.statusCode: 400");
        },
      },
      success: function (response) {
        console.log(response);
        const jwt = response["token"];
        console.log(jwt);
        sendJwtToPhpSession(jwt);
        localStorage.setItem("jwt", jwt);
      },
    });
  });

  const sendJwtToPhpSession = (jwt) => {
    $.ajax({
      url: CREATE_SESSION_ROUTE,
      type: "POST",
      data: { jwt: jwt },
      success: function (res) {
        console.log(res);
        //window.location.href = MY_ACCOUNT_ROUTE;
      },
    });
  };
});
