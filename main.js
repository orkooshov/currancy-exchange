let promise = fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    .then(response => response.json())
    .then(data => {
        updateData(data);
        console.log(data);
        return data;
    });

setInterval(() => {
    console.log(promise['PromiseResult']);
}, 1000);

function loadDate(date) {
    let dateDiv = document.getElementById('date');
    let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    };
    dateDiv.innerHTML = date.toLocaleDateString('ru', options);
}

function makeHtmlText(data) {
    let text = '';
    for (let elem in data.Valute) {
        let attr = '';
        switch (data.Valute[elem].CharCode) {
            case 'KZT':
                attr = `class="table-info"`;
                break;
            case 'USD':
                attr = `class="table-primary"`;
                break;
            case 'KGS':
                attr = `class="table-danger"`;
                break;
            case 'UAH':
                attr = `class="table-warning"`;
                break;
            case 'UZS':
                attr = `class="table-primary"`;
                break;
            default:
                break;
        }
        text +=
            `<tr ${attr}>
                    <td>${data.Valute[elem].CharCode} (${data.Valute[elem].NumCode})</td>
                    <td>${data.Valute[elem].Name}</td>
                    <td>${data.Valute[elem].Value}</td>
                </tr>`;
    }
    return text;
}

function loadToTable(htmlText) {
    let table = document.getElementById('currencyRate');
    table.innerHTML += htmlText;
}

function updateData(data) {
    loadDate(new Date(data.Timestamp));
    let text = makeHtmlText(data);
    loadToTable(text);
    console.log('updated');
}