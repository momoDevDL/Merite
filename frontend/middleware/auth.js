export default function({ params, redirect, store, $auth }) {
    // If the user is not authenticated
    console.log(store.state);
    console.log($auth.user);
    console.log("vvvvavavavavavavavavvavavvvavavavvavavavava");
    // if (params.token !== "stp") {
    //     redirect("/")
    // }
}