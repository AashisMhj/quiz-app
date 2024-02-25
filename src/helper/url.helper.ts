export function getUrlWithQueryParams(url:string, param_key:string, param_values:Array<number | string>) {
    const urlParams = new URLSearchParams();
    if (param_values.length >= 1) {
        urlParams.set("tags", param_values.toString());
    }
    return `url?` + urlParams.toString();
}