export const calculeTime = (date: string | undefined) => {
    const newDate = new Date(date!);
    const now = new Date();
    const difference = now.getTime() - newDate.getTime();

    const second = Math.floor(difference / 1000);
    const mminute = Math.floor(second / 60);
    const hour = Math.floor(mminute / 60);
    const days = Math.floor(hour / 24);

    if (second < 60) return "hace un momento";
    if (mminute < 60)
        return `hace ${mminute} minuto${mminute !== 1 ? "s" : ""}`;
    if (hour < 24) return `hace ${hour} hora${hour !== 1 ? "s" : ""}`;
    return `Hace ${days} día${days !== 1 ? "s" : ""}`;
};