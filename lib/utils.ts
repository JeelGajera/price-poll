export function extractPrice(...elems: any) {
    for (const elem of elems) {
        const priceText = elem.text().trim();
        if(priceText) return priceText.replace(/[^\d.]/g, '');
    }
    return "";
}

export function extractCurrencies(elem: any) {
    const currencyText = elem.text().trim().slice(0, 1);
    return currencyText || "";
}