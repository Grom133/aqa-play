export function generateRandomPrefix(length) {
    const chars = "0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export function generateEmail() {
    return `naizbatkovich+${generateRandomPrefix(5)}@gmail.com`;
}
