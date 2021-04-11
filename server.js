const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const port = process.env.PORT || 4000;

const BLOOMBERG_URL = 'https://www.bloomberght.com/doviz';
const CARDANO_URL = 'https://piyasa.paratic.com/kripto-coin/cardano';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/currency', async (req, res) => {
    const data = await getBloombergData();

    if (data === null) {
        res.status(404).send('Not found');
        return;
    }

    const adaData = await getCardanoData();

    if (adaData === null) {
        res.status(404).send('Not found');
        return;
    }

    data.ada = adaData.ada;

    res.send(data);
});

app.listen(port, () => {
    console.log(`Currency tracker server listens on ${port}`)
});

async function getBloombergData() {
    try {
        let response = await axios.get(BLOOMBERG_URL);
        let $ = cheerio.load(response.data);

        let usdArr = [
            parseFloat($('i[data-secid="USDTRY Curncy"]').parent().next().next().text().replace(',', '.')),
            parseFloat($('i[data-secid="USDTRY Curncy"]').parent().next().next().next().text().replace(',', '.'))
        ];

        let eurArr = [
            parseFloat($('i[data-secid="EURTRY Curncy"]').parent().next().next().text().replace(',', '.')),
            parseFloat($('i[data-secid="EURTRY Curncy"]').parent().next().next().next().text().replace(',', '.'))
        ];

        let gbpArr = [
            parseFloat($('i[data-secid="GBPTRY Curncy"]').parent().next().next().text().replace(',', '.')),
            parseFloat($('i[data-secid="GBPTRY Curncy"]').parent().next().next().next().text().replace(',', '.'))
        ];

        let usd = (usdArr[0] + usdArr[1]) / 2;
        let eur = (eurArr[0] + eurArr[1]) / 2;
        let gbp = (gbpArr[0] + gbpArr[1]) / 2;

        usd = usd.toFixed(4);
        eur = eur.toFixed(4);
        gbp = gbp.toFixed(4);

        return { usd, eur, gbp };
    }
    catch (error) {
        console.log(error);
    }

    return null;
}

async function getCardanoData() {
    try {
        let response = await axios.get(CARDANO_URL);
        let $ = cheerio.load(response.data);

        let ada = parseFloat($('div[class="CRTL_price_box"]').find('span[data-code="ADAUSDT"][data-type="last"]').text());

        ada = ada.toFixed(4);

        return { ada };
    }
    catch (error) {
        console.log(error);
    }

    return null;
}