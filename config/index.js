// 配置文件获取

import jsonConfig from './config.json' with {type: 'json'}

export function getPoolConfig() {
    // console.log("返回sql pool config")
    return jsonConfig['sqlConfig']
}

export function getExpressConfig() {
    const conf = jsonConfig['expressConfig'];

    const listPort = conf['listenPort'];
    const apiUrl = conf['apiUrl'];
    return {listPort, apiUrl};

}
