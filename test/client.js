import axios from "axios";
import jsonConfig from '../config/index.js'

const config = jsonConfig()

const startTime = Date.now();

const response = await axios.post('http://localhost:' + config["listenPort"] + '/api/', {
    opt: "query",
    keyColumn: "username",
    keyValue: "zs",
});

const endTime = Date.now();

console.log("耗时 " + (endTime - startTime) + " 毫秒")

const data = response.data;


if (data.length === 1)
    console.log("密码为: " + data[0]['passwd']);
else if (data.length > 1)
    console.warn("密码个数大于 1!")
else if (data.length === 0)
    console.log("请先注册")


// console.log(data.length, '个数据\n', data)