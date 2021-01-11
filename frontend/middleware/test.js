export default function({ params, redirect }) {
    // If the user is not authenticated
    if (params.token !== "stp") {
        redirect("/")
    }
}