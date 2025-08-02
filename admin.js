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
    html += \`<label>\${type} Gold: <input id="g\${type}" type="number"/></label><br/>\`;
  });
  document.getElementById("priceInputs").innerHTML = html;
}

function saveData() {
  const goldTypes = ["999", "916", "835", "750", "375"];
  const today = new Date().toISOString().slice(0, 10);
  const newData = {};

  goldTypes.forEach(type => {
    const val = parseInt(document.getElementById("g" + type).value);
    if (!isNaN(val)) {
      newData[type] = { current: val };
    }
  });

  // 默认 history 留空，建议后台完整功能版本使用 API 写入
  let content = "window.goldPrices = " + JSON.stringify(newData, null, 2) + ";";
  const blob = new Blob([content], { type: "application/javascript" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "data.js";
  a.click();
}