import { Navbar } from "../component/navbar.js";
import { Form } from "../component/form.js";
import { AlertMe } from "../component/alert_me.js";
import { RequestMe } from "../component/request_me.js";
import { AdvanceSearch } from "../component/advance_search.js";

(function () {
    let navbarController = Navbar();
    navbarController.main();

    let advanceSearch = AdvanceSearch("#myar", navbarController, {
        type : "myfavorite"
    });
    advanceSearch.main();
})();