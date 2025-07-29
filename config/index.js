// 这是一个配置文件

const configSqlPool = {
    connectionLimit: 10,
    host: '116.62.79.107',
    port: 3306,
    user: 'root',
    password: 'mysql985211',
    database: 'webdata'
}

const configSql = {
    configSqlPool,
    table: "users"
}


export default function () {
    return configSql
}