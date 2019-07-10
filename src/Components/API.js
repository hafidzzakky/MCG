export const baselink = 'http://202.158.14.174:9093/';

export const appVersion = '2.8';

export const buildFormBody = (params) => {
    // Build FormBody
    let formBody = [];
    for (let property in params) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(params[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return formBody
}