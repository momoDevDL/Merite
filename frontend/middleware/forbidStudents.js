export default function({ app, redirect, $auth }) {
    console.log(app.$cookies.get("auth.strategy"));
    if (app.$cookies.get("auth.strategy") == 'student') {
        redirect("/");
    } else if (!app.$cookies.get("auth.strategy")) {
        $auth.logout();
        redirect("/login");
    }
    // if (app.$cookies.get("auth.user").idGlobalRole == 1) {
    //     return redirect('/')
    // }
}