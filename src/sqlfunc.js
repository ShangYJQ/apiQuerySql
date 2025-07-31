import {getPoolConfig} from '../config/index.js'
import logger from './logger.js'
import mysql from "mysql2/promise";

const pool = mysql.createPool(getPoolConfig())

export default async function sqlfunc(template, values) {

    logger.info("操作请求: template: " + JSON.stringify(template) + " values: " + JSON.stringify(values));

    const connection = await pool.getConnection();
    try {
        const [result, fields] = await connection.execute(template, values);
        return {result, fields};
    } catch (err) {
        logger.error(err);
    } finally {
        // 将连接归还给连接池
        pool.releaseConnection(connection);
        logger.info("操作完成");
    }
};
