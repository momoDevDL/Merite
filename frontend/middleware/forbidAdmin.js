export default function({ app, redirect, $auth }) {
    console.log($auth.user);
    console.log(app.$cookies.get("auth.strategy"));

    if (app.$cookies.get("auth.strategy") == 'admin') {
        redirect("/admin");
    } else if (!app.$cookies.get("auth.strategy")) {
        console.log("logout");
        $auth.logout();
        redirect("/login");
    }

    // if (app.$cookies.get("auth.user").idGlobalRole == 1) {
    //     return redirect("/admin");
    // }
}