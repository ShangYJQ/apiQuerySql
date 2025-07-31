import axios from "axios";

const example = {
    "INSERT": {
        template: "INSERT INTO users(username, passwd) VALUES (?, ?)",
        values: ["name", "passwd"]
    }, "DELETE": {
        template: "DELETE FROM users WHERE username=?",
        values: ["name"]
    }, "UPDATE": {
        template: "UPDATE users SET passwd=? WHERE username=?",
        values: ["passwd", "name"],
    }, "SELECT": {
        template: "SELECT * FROM users WHERE username=?",
        values: ["name"]
    }
}

//你可以直接把这个函数放在你的前端项目里
export default async function useSqlApi(baseUrl, apiUrl, postData) {
    const startTime = Date.now();
    const response = await axios.post(baseUrl + apiUrl, postData);
    const endTime = Date.now();
    console.log("耗时 " + (endTime - startTime) + " 毫秒")
    const data = response.data;
    return JSON.parse(data[0]["result"])
}
// 29999 is in config.json
console.log(await useSqlApi('http://localhost:29999', '/api', example["INSERT"]))