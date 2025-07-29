import axios from "axios";

const response = await axios.post('http://localhost:29999/api/', {
    opt: "query",
    keyColumn: "username",
    keyValue: "yjq",
});
const data = response.data;


if (data.length === 1)
    console.log("密码为: " + data[0]['passwd']);
else if (data.length > 1)
    console.warn("密码个数大于 1!")
else if (data.length === 0)
    console.log("请先注册")


// console.log(data.length, '个数据\n', data)