var _a, _b, _c, _d;
var currentUrl = new URL(String(window.location));
var URLParams = currentUrl.searchParams;
var url = window.location.protocol;
var search = document.getElementById('search');
var searchButton = document.getElementById('search-button');
var statusFilters = document.querySelectorAll('[data-params="status"]');
var sorters = document.querySelectorAll('[data-params="sort"]');
var pagelinks = document.querySelectorAll('[data-params="page"]');
var paramsClearers = document.querySelectorAll('[data-clear]');
var states = {
    "search": (_a = URLParams.get("search")) !== null && _a !== void 0 ? _a : "",
    "status": (_b = URLParams.get("status")) !== null && _b !== void 0 ? _b : "",
    "sort": (_c = URLParams.get("sort")) !== null && _c !== void 0 ? _c : "",
    "page": (_d = URLParams.get("page")) !== null && _d !== void 0 ? _d : ""
};
/* -------------------- *\

  Search
   id="search"

  Search Button
   id="search-button"

\* -------------------- */
if (search) {
    function setSearchParams() {
        var _a, _b;
        var params = (_a = "search") !== null && _a !== void 0 ? _a : "";
        var paramsValue = (_b = search.value) !== null && _b !== void 0 ? _b : "";
        updateParams(params, paramsValue);
        manipulateUrl();
    }
    if (searchButton) {
        searchButton.addEventListener('click', function () {
            setSearchParams();
        });
    }
    if (search) {
        if (states["search"]) {
            search.value = states["search"];
        }
        search.addEventListener('keypress', function (event) {
            if (event.key === "Enter") {
                // event.preventDefault();
                setSearchParams();
            }
        });
    }
}
var _loop_1 = function (statusFilter) {
    statusFilter.style.cursor = "pointer";
    // statusFilter.style.textDecoration = "underline";
    statusFilter.addEventListener('click', function () {
        var _a, _b;
        var params = (_a = statusFilter.dataset.params) !== null && _a !== void 0 ? _a : "";
        var paramsValue = (_b = statusFilter.dataset.statusValue) !== null && _b !== void 0 ? _b : "";
        console.log(params, paramsValue);
        updateParams(params, paramsValue);
        manipulateUrl();
    });
};
/* -------------------- *\

  Status Filters
   data-params = "status"
   data-status-value = "packed"

\* -------------------- */
// @ts-ignore
for (var _i = 0, statusFilters_1 = statusFilters; _i < statusFilters_1.length; _i++) {
    var statusFilter = statusFilters_1[_i];
    _loop_1(statusFilter);
}
var _loop_2 = function (sorter) {
    sorter.style.cursor = "pointer";
    // sorter.style.textDecoration = "underline";
    sorter.addEventListener('click', function () {
        var _a, _b;
        var params = (_a = sorter.dataset.params) !== null && _a !== void 0 ? _a : "";
        var paramsValue = (_b = sorter.dataset.sortValue) !== null && _b !== void 0 ? _b : "";
        updateParams(params, paramsValue);
        manipulateUrl();
    });
};
/* -------------------- *\
  Sort Lists
  data-params="sort"  data-sort-value="gh"
\* -------------------- */
// @ts-ignore
for (var _e = 0, sorters_1 = sorters; _e < sorters_1.length; _e++) {
    var sorter = sorters_1[_e];
    _loop_2(sorter);
}
var _loop_3 = function (pagelink) {
    pagelink.style.cursor = "pointer";
    // pagelink.style.textDecoration = "underline";
    pagelink.addEventListener('click', function () {
        var _a, _b;
        var params = (_a = pagelink.dataset.params) !== null && _a !== void 0 ? _a : "";
        var paramsValue = (_b = pagelink.dataset.pageNumber) !== null && _b !== void 0 ? _b : "";
        updateParams(params, paramsValue);
        manipulateUrl();
    });
};
/* -------------------- *\
  Pagination
  data-params="page"  data-page-number="69"
  data-params="page"  data-page-number="{{ current_page_number }}"
  data-params="page"  data-page-number="{{ qs.next_page_number }}"
\* -------------------- */
// @ts-ignore
for (var _f = 0, pagelinks_1 = pagelinks; _f < pagelinks_1.length; _f++) {
    var pagelink = pagelinks_1[_f];
    _loop_3(pagelink);
}
var _loop_4 = function (clearBtn) {
    clearBtn.addEventListener('click', function () {
        var _a;
        var params = (_a = clearBtn.dataset.clear) !== null && _a !== void 0 ? _a : "";
        var paramsValue = "";
        updateParams(params, paramsValue);
        manipulateUrl();
    });
};
/* -------------------- *\
  Creating Clear Buttons
\* -------------------- */
//@ts-ignore
for (var _g = 0, paramsClearers_1 = paramsClearers; _g < paramsClearers_1.length; _g++) {
    var clearBtn = paramsClearers_1[_g];
    _loop_4(clearBtn);
}
/* -------------------- *\
  Update State
\* -------------------- */
var updateParams = function (params, paramsValue) {
    console.log("hii");
    switch (params) {
        case "search":
            states["search"] = paramsValue;
            break;
        case "page":
            states["page"] = paramsValue;
            break;
        default:
            if (states[params] !== paramsValue) {
                switch (params) {
                    case "sort":
                        states["sort"] = paramsValue;
                        break;
                    case "status":
                        states["status"] = paramsValue;
                        break;
                    default:
                        break;
                }
            }
            else {
                updateParams(params, "");
            }
    }
    console.log(states);
};
/* -------------------- *\
  redirection function
\* -------------------- */
var manipulateUrl = function () {
    var stringURL = "?" + "search" + "=" + states["search"] +
        "&" + "status" + "=" + states["status"] +
        "&" + "sort" + "=" + states["sort"] +
        "&" + "page" + "=" + states["page"];
    location.href = url + stringURL;
};
//@ts-ignore
for (var _h = 0, sorters_2 = sorters; _h < sorters_2.length; _h++) {
    var sortLink = sorters_2[_h];
    sortLink.className = "";
    if (sortLink.dataset.sortValue == states['sort']) {
        sortLink.className = "filter-btn active-filter-btn";
    }
    else {
        sortLink.className = "filter-btn";
    }
}
//@ts-ignore
for (var _j = 0, statusFilters_2 = statusFilters; _j < statusFilters_2.length; _j++) {
    var statusLink = statusFilters_2[_j];
    statusLink.className = "";
    // data-status-value -> dataset.statusValue
    if (statusLink.dataset.statusValue == states['status']) {
        statusLink.className = "filter-btn active-filter-btn";
    }
    else {
        statusLink.className = "filter-btn";
    }
}
