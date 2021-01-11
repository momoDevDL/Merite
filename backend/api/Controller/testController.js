export function getTest(req, res) {
    res.header("Content-Type", "application/json")
    res.send({ data: "Get works !" })
};

export function postTest(req, res) {
    res.header("Content-Type", "application/json")
    res.send({ data: "Post works !" })
};