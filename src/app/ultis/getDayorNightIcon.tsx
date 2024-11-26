/** @format */

export function getDayorNightIcon (
    iconName: string,
    dataTimeString: string
) : string {
    const hours = new  Date(dataTimeString).getHours();
    const isDaytime = hours >= 6 && hours < 18;
    return isDaytime ? iconName.replace(/.$/, "d") : iconName.replace(/.$/, "n")
}