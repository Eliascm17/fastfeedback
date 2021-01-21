export default async (url, token) => {
    const res = await fetch(url, {
        method: 'GET',
        headers: new Headers({ 'Content-Type': 'applicaiton/json', token }),
        credentials: 'same-origin'
    });
    return res.json();
};
