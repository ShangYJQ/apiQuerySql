import {createLogger, format, transports} from 'winston';
import fs from 'fs';
import path from 'path';

const logDir = 'log';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const customFormat = format.printf(({level, message, timestamp}) => {
    return `${timestamp} [${level}] : ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.colorize(),

        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        customFormat
    ),
    transports: [
        new transports.File({filename: path.join(logDir, 'error.log'), level: 'error'}),
        new transports.File({filename: path.join(logDir, 'combined.log')}),
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            customFormat
        )
    }));
}

logger.stream = {
    write: function (message) {
        // 使用 'info' 等级，Morgan 的日志将被 Winston 正常处理。
        // 我们去掉末尾的换行符，因为 Winston 会自己添加。
        logger.info(message.trim());
    },
};

export default logger;