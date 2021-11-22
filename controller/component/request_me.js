export const RequestMe = {
    post : (url, data) => {
        let formData = new FormData();
        for (let name in data) {
            formData.append(name, data[name]);
        }
        return fetch(url, {
            method : 'POST',
            /*body : new URLSearchParams(data),*/
            body : formData/*,
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }*/
        })
        .then(response => response.json())
        .catch(error => console.error(error));
    },
    get : (url, data) => {
        let add_simbol = "?";
        for (let name in data) {
            url += add_simbol + name + "=" + data[name];
            if (add_simbol == "?") add_simbol = "&";
        }
        return fetch(url)
        .then(response => response.json())
        .catch(error => console.error(error));
    }
};