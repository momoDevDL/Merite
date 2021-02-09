export default function({ params, redirect, store, $auth }) {
    // If the user is not authenticated
    console.log(store.state);
    console.log($auth.loggedIn);
    // if (params.token !== "stp") {
    //     redirect("/")
    // }
}