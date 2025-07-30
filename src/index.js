import express from 'express'
import getFormattedTime from "./logger.js";
import {getExpressConfig} from '../config/index.js'
import sqlOperation from "./SqlOperation.js";
import cors from "cors";

//覆写 console.log() 使其加上时间信息
const originalLog = console.log;
console.log = function (...args) {
    const beautifulTime = getFormattedTime();
    originalLog.apply(console, [`[${beautifulTime}]`, ...args]);
};

//获得监听端口
const listPort = getExpressConfig().listPort
const apiUrl = getExpressConfig().apiUrl

try {
    const app = express()

    //添加 cors 解决跨域问题
    app.use(cors())
    //创建监听服务器 并开启JSON支持
    app.use(express.json())

    app.post(apiUrl, async (req, res) => {

        //获得的 sql 命令
        const sqlTemplate = req.body['template'];
        const sqlValues = req.body['values'];

        const {result, fields} = await sqlOperation(sqlTemplate, sqlValues)
        res.json([{
            result: JSON.stringify(result),
            fields: JSON.stringify(fields),
        }])

    })
    //开始监听
    app.listen(listPort, () => {
        console.log(`express 正在监听 http://localhost:${listPort}${apiUrl} 的 post 请求`);
    });
} catch (error) {
    console.error(error)
}
