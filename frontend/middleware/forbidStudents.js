export default function({ app, redirect, $auth }) {
    if (app.$cookies.get("auth.user").idGlobalRole == 3) {
        return redirect('/')
    }
}