
export function formatDate(date) {
    if (!date) return undefined;
    const format = new Date(date);
    let day = format.getDate();
    let moth = format.getMonth();
    let year = format.getFullYear();

    let hour = format.getHours().toString();
    let min = format.getMinutes().toString();
    
    if (hour.length === 1) {
        hour = "0" + hour;
    }

    if (min.length === 1) {
        min = "0" + min;
    }

    return (day + "-" + moth + "-" + year + " " + hour + ":" + min + " hs");
}