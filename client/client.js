import axios from "axios";
import {getExpressConfig} from '../config/index.js'


const example = {
    "INSERT": {
        template: "INSERT INTO users(username, passwd) VALUES (?, ?), (?,?)",
        values: ["name1", "passwd1", "name2", "passwd2"]
    }, "DELETE": {
        template: "DELETE FROM users WHERE username=?",
        values: ["name2"]
    }, "UPDATE": {
        template: "UPDATE users SET passwd=? WHERE username=?",
        values: ["hello-sql", "name1"]
    }, "SELECT": {
        template: "SELECT * FROM users WHERE username=?",
        values: ["name1"]
    }
}

//你可以直接把这个函数放在你的前端项目里
export default async function useSqlApi(ip, apiurl, port, sqloperation) {
    const startTime = Date.now();
    const response = await axios.post(ip + port + apiurl, sqloperation);
    const endTime = Date.now();
    console.log("耗时 " + (endTime - startTime) + " 毫秒")
    const data = response.data;
    return JSON.parse(data[0]["result"])
}

console.log(await useSqlApi('http://localhost:', '/api', getExpressConfig().listPort, example["SELECT"]))