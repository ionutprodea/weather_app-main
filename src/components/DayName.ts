export function DayName(day:number) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    if (day > 6) return daysOfWeek[(day-7)];
    return daysOfWeek[day];
}