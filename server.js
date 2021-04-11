const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const port = 3000;

const BLOOMBERG_URL = 'https://www.bloomberght.com/doviz';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/currency', async (req, res) => {
    const data = await getBloombergData();

    if (data === null) {
        res.status(404).send('Not found');
        return;
    }

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

        return { usd, eur, gbp };
    }
    catch (error) {
        console.log(error);
    }

    return null;
}