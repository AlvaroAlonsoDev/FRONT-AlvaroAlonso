import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export function timeAgo(date: string | Date): string {
    let str = formatDistanceToNow(new Date(date), { addSuffix: true, locale: es });
    return str.replace('alrededor de ', '');
}