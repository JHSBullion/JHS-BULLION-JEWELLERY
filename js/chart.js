function getLast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(5, 10)); // MM-DD
  }
  return days;
}

function generateTrendData(pricesArray) {
  const result = [];
  for (let i = 0; i < 7; i++) {
    result.push(pricesArray?.[i] || null);
  }
  return result;
}

const days = getLast7Days();
const data = window.goldPrices || {};
const prices999 = generateTrendData(data["999"]?.history);
const prices916 = generateTrendData(data["916"]?.history);

const ctx = document.getElementById("goldChart").getContext("2d");
new Chart(ctx, {
  type: "line",
  data: {
    labels: days,
    datasets: [
      {
        label: "999 Gold",
        data: prices999,
        borderColor: "#d4af37",
        backgroundColor: "#d4af37",
        fill: false,
        tension: 0.3
      },
      {
        label: "916 Gold",
        data: prices916,
        borderColor: "#ff8800",
        backgroundColor: "#ff8800",
        fill: false,
        tension: 0.3
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: { beginAtZero: false }
    }
  }
});
