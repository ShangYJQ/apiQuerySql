import {getPoolConfig} from '../config/index.js'
import mysql from "mysql2/promise";

const pool = mysql.createPool(getPoolConfig())

export default async function sqlOperation(template, values) {

    console.log("收到操作请求: template: ", template, "values: ", values);

    const connection = await pool.getConnection();
    try {
        const [result, fields] = await connection.execute(template, values);
        return {result, fields};
    } catch (err) {
        console.error(err);
    } finally {
        // 将连接归还给连接池
        pool.releaseConnection(connection);
        console.log("数据库连接断开");
    }
};
