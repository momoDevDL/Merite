export default function({ app, redirect, $auth }) {
    console.log("MIDDDDDLLLLLEEEEEWARREEEEEEEEE");
    setTimeout(() => {
        if (app.$cookies.get("auth.user").idGlobalRole == 1 || app.$cookies.get("auth.user").idGlobalRole == 2) {
            return redirect('/admin')
        }
    }, 100)

}