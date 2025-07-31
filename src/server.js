import express from 'express'
import logger from "./logger.js"
import {getExpressConfig} from '../config/index.js'
import sqlfunc from "./sqlfunc.js";
import morgan from 'morgan'
import helmet from 'helmet'
import cors from "cors";

console.clear()

logger.info("欢迎使用SqlQuertApi server!")

//防止morgan打印时间
const morganFormat = ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';

//获得监听端口
const listPort = getExpressConfig().listPort
const apiUrl = getExpressConfig().apiUrl

try {
    const app = express()

    // 使用 helmet
    app.use(helmet())
    //添加 cors 解决跨域问题
    app.use(cors())
    //创建监听服务器 并开启JSON支持
    app.use(express.json())

    //让Morgan 把日志输出到 Winston 的 stream 中
    app.use(morgan(morganFormat, {stream: logger.stream}));

    app.post(apiUrl, async (req, res) => {

        //获得的 sql 命令
        const sqlTemplate = req.body['template'];
        const sqlValues = req.body['values'];

        const {result, fields} = await sqlfunc(sqlTemplate, sqlValues)
        res.json([{
            result: JSON.stringify(result),
            fields: JSON.stringify(fields),
        }])
    })
    //开始监听
    app.listen(listPort, () => {
        logger.info(`express 正在监听 http://localhost:${listPort}${apiUrl} 的 post 请求`);
    });
} catch (error) {
    logger.error(error)
}
