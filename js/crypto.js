const tableBody = document.getElementById("cryptoTableBody");
const searchInput = document.getElementById("searchInput");
const loadingText = document.getElementById("loading");
const updatedTime = document.getElementById("updatedTime");
let allCoins = [];

function fetchCryptoData() {
  loadingText.style.display = "block";
  fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1")
    .then(res => res.json())
    .then(data => {
      allCoins = data;
      renderTable(data);
      renderChart(data.slice(0, 5));
      updatedTime.textContent = "Last updated: " + new Date().toLocaleString();
      loadingText.style.display = "none";
    });
}

function renderTable(coins) {
  tableBody.innerHTML = "";
  coins.forEach(coin => {
    const row = `<tr>
      <td>${coin.name}</td>
      <td>${coin.symbol.toUpperCase()}</td>
      <td>$${coin.current_price.toLocaleString()}</td>
      <td>$${coin.market_cap.toLocaleString()}</td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}

function renderChart(coins) {
  const ctx = document.getElementById('cryptoChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: coins.map(c => c.name),
      datasets: [{
        label: 'Price (USD)',
        data: coins.map(c => c.current_price),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      },
      plugins: {
        legend: { display: false }
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
