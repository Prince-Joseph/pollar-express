var currentUrl = new URL(String(window.location));
var URLParams = currentUrl.searchParams;
var url = window.location.protocol;

var search = document.getElementById('search') as HTMLInputElement;
var searchButton = document.getElementById('search-button') as HTMLElement;


var statusFilters = document.querySelectorAll('[data-params="status"]') as NodeListOf<HTMLDataElement>;

var sorters = document.querySelectorAll('[data-params="sort"]') as NodeListOf<HTMLDataElement>;
var pagelinks = document.querySelectorAll('[data-params="page"]') as NodeListOf<HTMLDataElement>;
var paramsClearers = document.querySelectorAll('[data-clear]') as NodeListOf<HTMLDataElement>;


var states = {
    "search": URLParams.get("search") ?? "",
    "status": URLParams.get("status") ?? "",
    "sort": URLParams.get("sort") ?? "",
    "page": URLParams.get("page") ?? "",
}


/* -------------------- *\

  Search
   id="search"

  Search Button
   id="search-button"

\* -------------------- */
if (search) {

  function setSearchParams() {
    let params = "search" as string ?? "";
    let paramsValue = search.value as string ?? "";
    updateParams(params, paramsValue);
    manipulateUrl();
  }

  if (searchButton) {
    searchButton.addEventListener('click', () => {
      setSearchParams()
    })
  }

  if (search) {
    if (states["search"]) {
      search.value = states["search"];
    }
    search.addEventListener('keypress', (event) => {
      if (event.key === "Enter") {
        // event.preventDefault();
        setSearchParams();
      }
    })
  }

}



/* -------------------- *\

  Status Filters
   data-params = "status"
   data-status-value = "packed"

\* -------------------- */
// @ts-ignore
for (const statusFilter of statusFilters ) {

  statusFilter.style.cursor = "pointer";
  // statusFilter.style.textDecoration = "underline";

  statusFilter.addEventListener('click', () => {
    let params = statusFilter.dataset.params as string ?? "";
    let paramsValue = statusFilter.dataset.statusValue as string ?? "";
    console.log(params, paramsValue);
    updateParams(params, paramsValue);
    manipulateUrl();
  })

}



/* -------------------- *\
  Sort Lists
  data-params="sort"  data-sort-value="gh"
\* -------------------- */
// @ts-ignore
for (const sorter of sorters) {

  sorter.style.cursor = "pointer";
  // sorter.style.textDecoration = "underline";

  sorter.addEventListener('click', () => {
    let params = sorter.dataset.params as string ?? "";
    let paramsValue = sorter.dataset.sortValue as string ?? "";
    updateParams(params, paramsValue);
    manipulateUrl();
  })

}

/* -------------------- *\
  Pagination
  data-params="page"  data-page-number="69"
  data-params="page"  data-page-number="{{ current_page_number }}"
  data-params="page"  data-page-number="{{ qs.next_page_number }}"
\* -------------------- */
// @ts-ignore
for (const pagelink of pagelinks) {

  pagelink.style.cursor = "pointer";
  // pagelink.style.textDecoration = "underline";

  pagelink.addEventListener('click', () => {
    let params = pagelink.dataset.params as string ?? "";
    let paramsValue = pagelink.dataset.pageNumber as string ?? "";
    updateParams(params, paramsValue);
    manipulateUrl();
  })

}


/* -------------------- *\
  Creating Clear Buttons
\* -------------------- */
//@ts-ignore
for (const clearBtn of paramsClearers) {
  clearBtn.addEventListener('click', () => {
    let params = clearBtn.dataset.clear ?? "";
    let paramsValue = "";
    updateParams(params, paramsValue);
    manipulateUrl();
  })
}



/* -------------------- *\
  Update State
\* -------------------- */
var updateParams = (params: string, paramsValue: any) => {
    console.log("hii");

    switch (params) {
      case "search":
        states["search"] = paramsValue
        break;
      case "page":
        states["page"] = paramsValue
        break;
      default:
        if (states[params] !== paramsValue) {
        switch (params) {
          case "sort":
              states["sort"] = paramsValue
              break;

          case "status":
            states["status"] = paramsValue
            break;

          default:
            break;
        }
    }
  else {
    updateParams(params, "");
  }
}

  console.log(states)
}



/* -------------------- *\
  redirection function
\* -------------------- */
var manipulateUrl = () => {

  var stringURL =
    "?" + "search" + "=" + states["search"] +
    "&" + "status" + "=" + states["status"] +
    "&" + "sort" + "=" + states["sort"] +
    "&" + "page" + "=" + states["page"];

  location.href = url + stringURL;
}

//@ts-ignore
for(const sortLink of sorters){
    sortLink.className = "";
    if(sortLink.dataset.sortValue == states['sort']){
        sortLink.className = "filter-btn active-filter-btn";
    }
    else{
      sortLink.className = "filter-btn";
    }
}

//@ts-ignore
for(const statusLink of statusFilters){
  statusLink.className = "";
  // data-status-value -> dataset.statusValue
  if(statusLink.dataset.statusValue == states['status']){
      statusLink.className = "filter-btn active-filter-btn";
  }
  else{
    statusLink.className = "filter-btn";
  }
}


