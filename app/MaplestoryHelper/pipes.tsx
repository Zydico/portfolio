export function simplifyNumber(value: number | null): string | null {
    if (!value) {
        return null;
    }
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: " k" },
        { value: 1e6, symbol: " M" },
        { value: 1e9, symbol: " B" },
        { value: 1e12, symbol: " T" },
        { value: 1e15, symbol: " Q" },
    ];
    let digits = 1;
    const regexp = /\.+$|(?<=\.[0-9]*[1-9])0+$/;
    const item = lookup.findLast(item => value >= item.value);
    return item ? ((value / item.value).toFixed(digits)).replace(regexp, "").concat(item.symbol) : "0";
}

export function roundUp5(value: number | null): number | null {
    if (!value) {
        return null;
    }
    return Math.ceil(value / 5) * 5;
}