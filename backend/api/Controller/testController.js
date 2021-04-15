export function getTest(req, res) {
    console.log("===================================================");
    console.log("===================================================");
    console.log("===================================================");
    console.log("server");
    console.log(req.headers);
    console.log("===================================================");
    console.log("===================================================");
    console.log("===================================================");
    res.json({
        user: {
            username: "Pedro",
            email: "pedro@gmail.com"
        }
    })
};

export function postTest(req, res) {
    res.header("Content-Type", "application/json")
    res.send({ data: "Post works !" })
};