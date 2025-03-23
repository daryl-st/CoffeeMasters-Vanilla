const Router = {
    init: () => {
        document.querySelectorAll("a.navlink").forEach(link => {
            link.addEventListener("click", event => {
                event.preventDefault();
                // const url = event.target.href;
                const url = link.getAttribute("href"); // we are using closure

                Router.go(url);
            });
        });

        // Event Handler for URL changes
        window.addEventListener("popstate", event => {
            Router.go(event.state.route, false); // the event has access to the previously pushed state (route)
        });                                      // and we don't want to add it to history this time

        // Check the initial URL
        Router.go(location.pathname);
    },
    go: (route, addToHistory=true) => {
        console.log(`Going to ${route}`);

        if (addToHistory) {
            history.pushState({ route }, null, route);
        }

        let pageElement = null;
        // in this case we are add and removing elements when switching (routing) between pages
        // we can also use the hidden attribute to implement the same routing
        switch(route) {
            case "/":
                pageElement = document.createElement("menu-page");
                break;
            case "/order":
                pageElement = document.createElement("order-page");
                break;
            default:
                if (route.startsWith("/product-")) {
                    pageElement = document.createElement("details-page");
                    const paramID = route.substring(route.lastIndexOf("-") + 1);
                    pageElement.dataset.id = paramID;
                }
        }

        // if there is a pageElement...else maybe create client 404 page 
        if (pageElement) {
            const cache = document.querySelector("main");
            // cache.children[0].remove();
            cache.innerHTML = "";
            cache.appendChild(pageElement);

            window.scrollX = 0;
            window.scrollY = 0;
        }
    }
}

export default Router;