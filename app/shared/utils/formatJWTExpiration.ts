export function formatJwtExpiration(exp?: number): string {
    if (!exp) return "No expiration";
    const date = new Date(exp * 1000);
    return date.toLocaleString("ko-KR", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
}
