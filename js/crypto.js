let cryptoData = [];

async function loadCryptoData() {
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
  try {
    const response = await fetch(url);
    cryptoData = await response.json();
    displayCrypto(cryptoData);
    drawCryptoChart(cryptoData);
  } catch (err) {
    console.error("Error fetching crypto data:", err);
  }
}

function displayCrypto(data) {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  let table = "";

  data
    .filter(coin => coin.name.toLowerCase().includes(searchValue) || coin.symbol.toLowerCase().includes(searchValue))
    .forEach((coin) => {
      table += `
        <tr>
          <td><img src="${coin.image}" width="20" alt="${coin.name} logo"> ${coin.name}</td>
          <td>${coin.symbol.toUpperCase()}</td>
          <td>$${coin.current_price.toFixed(2)}</td>
          <td class="${coin.price_change_percentage_24h >= 0 ? 'text-success' : 'text-danger'}">
            ${coin.price_change_percentage_24h.toFixed(2)}%
          </td>
        </tr>`;
    });

  document.getElementById("cryptoTable").innerHTML = table;
}

function drawCryptoChart(data) {
  const top5 = data.slice(0, 5);
  const labels = top5.map(coin => coin.name);
  const prices = top5.map(coin => coin.current_price);

  const ctx = document.getElementById("cryptoChart").getContext("2d");

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [{
        label: "Top 5 Coin Prices",
        data: prices,
        backgroundColor: ["#f28ab2", "#f9d5e5", "#fad4d4", "#e06699", "#f7c8e0"],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      animation: {
        animateScale: true,
        animateRotate: true
      },
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

document.getElementById("searchInput").addEventListener("input", () => displayCrypto(cryptoData));
loadCryptoData();
