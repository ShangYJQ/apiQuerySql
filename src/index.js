import express from 'express'
import querySql from './querySql.js'
import jsonConfig from '../config/index.js'

const app = express()
const port = jsonConfig()["listenPort"]

app.use(express.json())

app.post('/api', async (req, res) => {

    const body = req.body;
    console.log("收到api请求: ", body);
    if (body["opt"] == "query") {
        const sqlData = await querySql(body["keyColumn"], body["keyValue"]);
        res.json(sqlData)
    } else {
        res.json(req.body)
    }

})

// querySql("username","yjq")

app.listen(port, () => {
    console.log(`api sql server 正在监听 http://localhost:${port}`);
});