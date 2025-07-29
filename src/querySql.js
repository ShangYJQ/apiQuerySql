import mysql from 'mysql2/promise'
import configSql from '../config/index.js'

const conf = configSql()

const pool = mysql.createPool({
    connectionLimit: conf['connectionLimit'],
    host: conf['host'],
    port: conf['port'],
    user: conf['user'],
    password: conf['password'],
    database: conf['database'],
});

console.log('数据池已连接')

const tableInPool = conf['table'];

async function queryDatabase(keyColumn, keyValue) {
    let connection;
    let result;
    try {
        connection = await pool.getConnection();
        console.log("成功连接到数据库！");

        const sqlTemplate = 'SELECT * FROM ?? WHERE ?? = ?';
        const params = [tableInPool, keyColumn, keyValue];

        const [rows] = await connection.query(sqlTemplate, params);

        console.log('数据库读取成功')
        result = rows;


    } catch (error) {
        console.error('数据库操作出错:', error);
    } finally {
        if (connection) {
            connection.release();
            console.log("数据库连接已释放");
        }
    }
    return result;
}

//查询函数
export default async function querySql(keyColumn, keyValue) {
    console.log("准备查询 " + conf["database"] + " 数据库 " + tableInPool + " 表 [" + keyColumn + " 中的 " + keyValue + ']');

    let returnRes = []
    try {
        returnRes = await queryDatabase(keyColumn, keyValue)
    } catch (error) {
        console.error("查询出错:", error);
        throw error;
    } finally {
        console.log("数据池已释放");
    }
    console.log("查询结果有 " + returnRes.length + " 个\n" + JSON.stringify(returnRes))
    return returnRes;
}