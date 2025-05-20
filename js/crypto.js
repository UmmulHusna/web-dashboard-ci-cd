// js/crypto.js
async function loadCryptoData() {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      let table = "";
      data.forEach((coin) => {
        table += `
          <tr>
            <td><img src="${coin.image}" width="20"> ${coin.name}</td>
            <td>${coin.symbol.toUpperCase()}</td>
            <td>$${coin.current_price}</td>
            <td class="${coin.price_change_percentage_24h >= 0 ? 'text-success' : 'text-danger'}">
              ${coin.price_change_percentage_24h.toFixed(2)}%
            </td>
          </tr>`;
      });
  
      document.getElementById("cryptoTable").innerHTML = table;
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      document.getElementById("cryptoTable").innerHTML = "<tr><td colspan='4'>Failed to load data.</td></tr>";
    }
  }
  
  loadCryptoData();
  