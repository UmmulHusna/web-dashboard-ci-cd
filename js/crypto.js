const tableBody = document.getElementById("cryptoTableBody");
const searchInput = document.getElementById("searchInput");
const updatedTime = document.getElementById("updatedTime");
let allCoins = [];

function fetchCryptoData() {
  fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1")
    .then(res => res.json())
    .then(data => {
      allCoins = data;
      renderTable(data);
      renderLineChart(data.slice(0, 5));
      updatedTime.textContent = "Last updated: " + new Date().toLocaleString();
    });
}

function renderTable(coins) {
  tableBody.innerHTML = "";
  coins.forEach(coin => {
    const priceChange = coin.price_change_percentage_24h;
    const trendIcon = priceChange > 0
      ? '📈 <span style="color:green;">+' + priceChange.toFixed(2) + '%</span>'
      : '📉 <span style="color:red;">' + priceChange.toFixed(2) + '%</span>';

    const row = `<tr>
      <td>
        <img src="${coin.image}" alt="${coin.name}" width="20" class="me-2">
        ${coin.name}
      </td>
      <td>${coin.symbol.toUpperCase()}</td>
      <td>$${coin.current_price.toLocaleString()}<br>${trendIcon}</td>
      <td>$${coin.market_cap.toLocaleString()}</td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}


function renderLineChart(coins) {
  const ctx = document.getElementById('cryptoChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: coins.map(c => c.name),
      datasets: [{
        label: 'Top 5 Crypto Prices (USD)',
        data: coins.map(c => c.current_price),
        borderColor: 'rgba(255, 105, 180, 1)',      // hot pink
        backgroundColor: 'rgba(0, 0, 0, 0.1)',       // soft black
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#000000',
        pointBorderColor: '#ff69b4',
        pointRadius: 6,
        pointHoverRadius: 8
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            color: '#3e2e25'
          }
        },
        x: {
          ticks: {
            color: '#3e2e25'
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: '#3e2e25',
            font: {
              weight: 'bold'
            }
          }
        }
      }
    }
  });
}

searchInput.addEventListener("input", function () {
  const filter = this.value.toLowerCase();
  const filtered = allCoins.filter(coin => coin.name.toLowerCase().includes(filter));
  renderTable(filtered);
});

fetchCryptoData();
