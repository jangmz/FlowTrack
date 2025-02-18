export function formatTimeStamp(date) {
    if (!date) return "";

    const formatedDate = new Date(date);
    return `${formatedDate.getDate()}. ${formatedDate.getMonth() + 1}. ${formatedDate.getFullYear()} (${formatedDate.getHours()}:${formatedDate.getMinutes()})`;
}