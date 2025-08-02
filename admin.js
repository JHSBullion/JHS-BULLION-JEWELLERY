
const correctUsername = "admin";
const correctPassword = "123456";

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === correctUsername && pass === correctPassword) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminBox").style.display = "block";
    showInputs();
  } else {
    alert("账号或密码错误");
  }
}

function showInputs() {
  const goldTypes = ["999", "916", "835", "750", "375"];
  let html = "";
  goldTypes.forEach(type => {
    html += `<label>${type} Gold: <input id="g${type}" type="number" /></label><br/>`;
  });
  document.getElementById("priceInputs").innerHTML = html;
}

function saveData() {
  const goldTypes = ["999", "916", "835", "750", "375"];
  let existingData = {};
  try {
    existingData = JSON.parse(localStorage.getItem("goldPrices") || "{}");
  } catch (e) {}

  const todayData = {};
  goldTypes.forEach(type => {
    const val = parseInt(document.getElementById("g" + type).value);
    if (!isNaN(val)) {
      const history = existingData[type]?.history || [];
      if (history.length >= 7) history.shift(); // 保持7天
      history.push(val);
      const prev = history.length >= 2 ? history[history.length - 2] : val;
      const diff = val - prev;
      todayData[type] = {
        current: val,
        diff: diff,
        history: history
      };
    }
  });

  localStorage.setItem("goldPrices", JSON.stringify(todayData));

  let content = "window.goldPrices = " + JSON.stringify(todayData, null, 2) + ";";
  const blob = new Blob([content], { type: "application/javascript" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "data.js";
  a.click();
}
