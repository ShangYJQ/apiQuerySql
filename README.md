## A simple mysql api server made by `Node.js` with `sqlfunc` and `express`

#### It runs an express server to listen post requset with json data and change it to `execute(sql, values)` function in `sqlfunc`

## How to use?
1. clone the repositories
```shell
git clone https://github.com/ShangYJQ/apiQuerySql.git
cd apiQuerySql
```

2. rename the `templete.config.json` to `config.json` and config the file

3. you can start api server by using
```shell
npm install
npm run server
```

## Tips
1. You can test and learn the function by running `npm run client`
2. Using `tmux` to run the server maybe a good choice,anyway it is just a very simple api server
3. You can use the function below to use in you project as a hook

```javascript
export default async function useSqlApi(ip, apiurl, port, sqloperation) {
    const startTime = Date.now();
    const response = await axios.post(ip + port + apiurl, sqloperation);
    const endTime = Date.now();
    console.log("耗时 " + (endTime - startTime) + " 毫秒")
    const data = response.data;
    return JSON.parse(data[0]["result"])
}
```