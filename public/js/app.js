$(document).ready(async () => {
    let response = await axios.get('/currency');
    let data = response.data;
    $('#dollar-value').text(data.usd);
    $('#euro-value').text(data.eur);
    $('#pound-value').text(data.gbp);
});