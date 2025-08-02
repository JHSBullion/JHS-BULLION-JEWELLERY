function checkPassword() {
  const pwd = document.getElementById("password").value;
  if (pwd === "1234567") {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminBox").style.display = "block";
  } else {
    alert("密码错误！");
  }
}

function updatePrice() {
  const newData = {
    "999": parseFloat(document.getElementById("g999").value),
    "916": parseFloat(document.getElementById("g916").value),
    "835": parseFloat(document.getElementById("g835").value),
    "750": parseFloat(document.getElementById("g750").value),
    "375": parseFloat(document.getElementById("g375").value)
  };

  let data = {};
  const now = new Date().toISOString().slice(0, 10);

  for (let key in newData) {
    const current = newData[key];
    data[key] = { current: current, diff: 0 };
  }

  const blob = new Blob(
    [ "window.goldPrices = " + JSON.stringify(data, null, 2) + ";" ],
    { type: "application/javascript" }
  );
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "data.js";
  a.textContent = "点击这里下载 data.js 文件并上传到网站";
  document.getElementById("status").innerHTML = "";
  document.getElementById("status").appendChild(a);
}
