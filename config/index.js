// 配置文件获取

import jsonConfig from './config.json' with {type: 'json'}

//你可以添加更多 config 参数
export function getPoolConfig() {
    return jsonConfig['sqlConfig']
}

export function getExpressConfig() {
    const conf = jsonConfig['expressConfig'];
    const listPort = conf['listenPort'];
    const apiUrl = conf['apiUrl'];
    return {listPort, apiUrl};
}
