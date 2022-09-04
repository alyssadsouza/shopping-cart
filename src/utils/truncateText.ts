export function truncateText(charLimit: number, text: String) {
    if (text.length > 100) {
        return  text.substring(0, charLimit) + '...'
    }
    return text
}