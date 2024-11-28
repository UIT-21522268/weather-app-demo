/**@format */

export function meterToKilometer(meters: number): string {
   const kilometer = meters / 1000;
    return `${kilometer.toFixed(0)} km`;
}