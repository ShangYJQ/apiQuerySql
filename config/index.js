// 这是一个配置文件

import jsonConfig from './config.json' with {type: 'json'}

const configSql = jsonConfig

export default function () {
    return configSql
}
