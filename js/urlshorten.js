const url = 'https://api-ssl.bitly.com/v4/shorten';
const keyAPI = '4c13be78cb4294cbe16a1d93894c6127d361193a';
const inputField = document.getElementById('longUrl');
const button = document.getElementById('shortenButton');
const resultField = document.getElementById('resultArea');
const resultImg = document.getElementById('resultImg');
const googleQrLinkBase = 'https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=';
const promoLanding = 'https://www.olimp.bet/promo/promocode/?promocode=';
const copyButton = document.getElementById('copyButton');

function getShortUrl() {
    console.log(inputField.value.length);
    if (inputField.value.length < 3) {
        alert('Enter promocode');
        return;
    }

    let qrLink = '';
    let jsonObj = {};
    const longUrl = inputField.value;
    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `${keyAPI}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "long_url": `${promoLanding}${longUrl}`,
            "domain": "bit.ly"
        })
    }).then(response => {
        if (response.ok) {
            return response.text();
        }

        // 
    }).then(data => {
        jsonObj = JSON.parse(data);
        qrLink = `${googleQrLinkBase}${jsonObj.link}`;
        resultField.innerHTML = qrLink;
        resultImg.src = qrLink;
    });
    resultField.style.display = 'block';
    copyButton.style.display = 'block';

}

function copyText() {
    var area = document.createElement('textarea');
    document.body.appendChild(area);
    area.value = resultImg.src;
    area.select();
    document.execCommand("copy");
    document.body.removeChild(area);
}


button.addEventListener('click', getShortUrl);
copyButton.addEventListener('click', copyText);

