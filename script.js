function updateStockPrices() {
    let stocks = [
        { name: 'ABC', currentPrice: 123, originalPrice: 123, lastPrice: 123 },
        { name: 'DEF', currentPrice: 67, originalPrice: 67, lastPrice: 67 },
        { name: 'GHI', currentPrice: 210, originalPrice: 210, lastPrice: 210 },
        { name: 'JKL', currentPrice: 98, originalPrice: 98, lastPrice: 98 },
    ];

    // Update prices and calculate gradient
    stocks = stocks.map(stock => {
        // Update lastPrice to the currentPrice from the previous cycle
        stock.lastPrice = stock.currentPrice;

        const change = Math.round(Math.random() * 20 - 10); //range of loss or gain
        const newPrice = Math.max(0, stock.currentPrice + change);//add or subtract change

        stock.gradient = (newPrice - stock.lastPrice) / 1;
        stock.currentPrice = newPrice; // Update currentPrice for the next calculation

        return stock;
    });

    // Sort stocks based on the absolute value of gradient
    stocks.sort((a, b) => Math.abs(b.gradient) - Math.abs(a.gradient));

    // Update the HTML
    const gainersElement = document.querySelector('.column.gainer');
    const losersElement = document.querySelector('.column.loser');

    gainersElement.innerHTML = '<h1>Gainers</h1>';
    losersElement.innerHTML = '<h1>Losers</h1>';

    stocks.forEach(stock => {
        const stockElement = document.createElement('p');
        stockElement.className = 'stock';
        stockElement.innerHTML = `<span class="name">${stock.name}</span><span class="gradient">${stock.gradient.toFixed(1)}</span>`;

        if (stock.gradient >= 0) { // Positive gradient for gainers
            gainersElement.appendChild(stockElement);
        } else { // Negative gradient for losers
            losersElement.appendChild(stockElement);
        }
    });
}

setInterval(updateStockPrices, 5000);
