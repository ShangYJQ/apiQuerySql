'use strict';

import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    connectionLimit: 10,
    host: '116.62.79.107',
    port: 3306,
    user: 'root',
    password: 'mysql985211',
    database: 'webdata'
});

async function queryDatabase(tableName) {
    let connection;
    let results;
    try {
        // 从连接池获取一个连接
        connection = await pool.getConnection();
        console.log("成功连接到数据库！");

        // 执行查询, await会等待查询完成
        // pool.query() 返回一个数组，第一个元素是行数据，第二个是字段信息
        const [rows, fields] = await connection.query('SELECT * FROM ' + tableName); // 假设表名为 'users'

        console.log('数据库读取成功',rows)
        results = rows;


    } catch (error) {
        // 如果发生任何错误，在这里捕获
        console.error('数据库操作出错:', error);
    } finally {
        // 4. 无论成功还是失败，最后都必须释放连接
        if (connection) {
            connection.release();
            console.log("数据库连接已释放");
        }
    }

    console.log("@@@",results)
    return results;
}


export default function querySql(tableName) {
    const result = queryDatabase(tableName).then(r => {
        console.log("数据池释放")
        pool.end()
    })
    console.log(result);
}

querySql("users")