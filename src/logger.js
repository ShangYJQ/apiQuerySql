const dateTimeFormatter = new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
});

export default function getFormattedTime() {
    const parts = dateTimeFormatter.formatToParts(new Date());
    const partMap = {};
    for (const part of parts) {
        partMap[part.type] = part.value;
    }
    return `${partMap.year}-${partMap.month}-${partMap.day} ${partMap.hour}:${partMap.minute}:${partMap.second}`;
}




