export function getTest(req, res) {
    res.header("Content-Type", "application/json")
    console.log(req.headers.authorization);
    res.send({ data: "Get works !" })
};

export function postTest(req, res) {
    res.header("Content-Type", "application/json")
    res.send({ data: "Post works !" })
};