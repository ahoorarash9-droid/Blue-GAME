const DATA_KEY = "bluegame_data";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";


const defaultData = {
  games: [],
  mods: [],
  news: []
};


function getData() {

  const saved = localStorage.getItem(DATA_KEY);

  if (!saved) {

    localStorage.setItem(
      DATA_KEY,
      JSON.stringify(defaultData)
    );

    return defaultData;
  }

  try {
    return JSON.parse(saved);
  } catch {

    return defaultData;
  }
}


function saveData(data) {

  localStorage.setItem(
    DATA_KEY,
    JSON.stringify(data)
  );

}


function escapeHTML(text) {

  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}



/* LOGIN */

const loginForm =
  document.getElementById("loginForm");

const loginSection =
  document.getElementById("loginSection");

const adminSection =
  document.getElementById("adminSection");

const loginMessage =
  document.getElementById("loginMessage");


if (loginForm) {

  loginForm.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();

      const username =
        document.getElementById("username").value.trim();

      const password =
        document.getElementById("password").value;

      if (
        username === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD
      ) {

        sessionStorage.setItem(
          "bluegame_admin",
          "true"
        );

        loginSection.classList.add("hidden");

        adminSection.classList.remove("hidden");

        renderAdmin();

      } else {

        loginMessage.textContent =
          "نام کاربری یا رمز عبور اشتباه است.";

        loginMessage.className =
          "message error";

      }

    }
  );

}



/* CHECK LOGIN */

function checkLogin() {

  const loggedIn =
    sessionStorage.getItem("bluegame_admin");

  if (loggedIn === "true") {

    loginSection.classList.add("hidden");

    adminSection.classList.remove("hidden");

    renderAdmin();

  }

}


checkLogin();



/* LOGOUT */

const logoutBtn =
  document.getElementById("logoutBtn");


if (logoutBtn) {

  logoutBtn.addEventListener(
    "click",
    function() {

      sessionStorage.removeItem(
        "bluegame_admin"
      );

      location.reload();

    }
  );

}



/* ADD GAME */

const gameForm =
  document.getElementById("gameForm");


if (gameForm) {

  gameForm.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();

      const data = getData();

      const game = {

        id: Date.now(),

        title:
          document.getElementById("gameTitle").value.trim(),

        description:
          document.getElementById("gameDescription").value.trim(),

        version:
          document.getElementById("gameVersion").value.trim(),

        size:
          document.getElementById("gameSize").value.trim(),

        image:
          document.getElementById("gameImage").value.trim(),

        download:
          document.getElementById("gameDownload").value.trim()

      };


      data.games.push(game);

      saveData(data);

      gameForm.reset();

      renderAdmin();

      alert("بازی با موفقیت اضافه شد ✅");

    }
  );

}



/* ADD MOD */

const modForm =
  document.getElementById("modForm");


if (modForm) {

  modForm.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();

      const data = getData();

      const mod = {

        id: Date.now(),

        title:
          document.getElementById("modTitle").value.trim(),

        description:
          document.getElementById("modDescription").value.trim(),

        type:
          document.getElementById("modType").value,

        version:
          document.getElementById("modVersion").value.trim(),

        loader:
          document.getElementById("modLoader").value.trim(),

        image:
          document.getElementById("modImage").value.trim(),

        download:
          document.getElementById("modDownload").value.trim()

      };


      data.mods.push(mod);saveData(data);

      modForm.reset();

      renderAdmin();

      alert("مود با موفقیت اضافه شد ✅");

    }
  );

}



/* ADD NEWS */

const newsForm =
  document.getElementById("newsForm");


if (newsForm) {

  newsForm.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();

      const data = getData();

      const news = {

        id: Date.now(),

        title:
          document.getElementById("newsTitle").value.trim(),

        description:
          document.getElementById("newsDescription").value.trim(),

        date:
          document.getElementById("newsDate").value.trim()

      };


      data.news.push(news);

      saveData(data);

      newsForm.reset();

      renderAdmin();

      alert("خبر با موفقیت منتشر شد ✅");

    }
  );

}



/* DELETE GAME */

function deleteGame(id) {

  const data = getData();

  data.games =
    data.games.filter(
      game => game.id !== id
    );

  saveData(data);

  renderAdmin();

}



/* DELETE MOD */

function deleteMod(id) {

  const data = getData();

  data.mods =
    data.mods.filter(
      mod => mod.id !== id
    );

  saveData(data);

  renderAdmin();

}



/* DELETE NEWS */

function deleteNews(id) {

  const data = getData();

  data.news =
    data.news.filter(
      news => news.id !== id
    );

  saveData(data);

}



/* RENDER ADMIN */

function renderAdmin() {

  const data = getData();


  /* GAMES */

  const gamesContainer =
    document.getElementById("gamesAdminList");


  if (gamesContainer) {

    if (data.games.length === 0) {

      gamesContainer.innerHTML =
        "<p>هنوز بازی‌ای اضافه نشده است.</p>";

    } else {

      gamesContainer.innerHTML =
        data.games.map(game => `

          <div class="admin-item">

            <div class="admin-item-info">

              <h3>
                🎮 ${escapeHTML(game.title)}
              </h3>

              <p>
                ${escapeHTML(game.description)}
              </p>

            </div>

            <button
              class="delete-btn"
              onclick="deleteGame(${game.id})"
            >
              حذف
            </button>

          </div>

        `).join("");

    }

  }



  /* MODS */

  const modsContainer =
    document.getElementById("modsAdminList");


  if (modsContainer) {

    if (data.mods.length === 0) {

      modsContainer.innerHTML =
        "<p>هنوز مودی اضافه نشده است.</p>";

    } else {

      modsContainer.innerHTML =
        data.mods.map(mod => `

          <div class="admin-item">

            <div class="admin-item-info">

              <h3>
                🧩 ${escapeHTML(mod.title)}
              </h3>

              <p>
                ${mod.type === "java"
                  ? "Minecraft Java"
                  : "Minecraft Bedrock"
                }

                ${
                  mod.version
                    ? " • " + escapeHTML(mod.version)
                    : ""
                }

              </p>

            </div>

            <button
              class="delete-btn"
              onclick="deleteMod(${mod.id})"
            >
              حذف
            </button>

          </div>

        `).join("");

    }

  }



  /* NEWS */

  const newsContainer =
    document.getElementById("newsAdminList");


  if (newsContainer) {

    if (data.news.length === 0) {

      newsContainer.innerHTML =
        "<p>هنوز خبری منتشر نشده است.</p>";

    } else {

      newsContainer.innerHTML =
        data.news.map(news => `

          <div class="admin-item">

            <div class="admin-item-info">

              <h3>
                📰 ${escapeHTML(news.title)}
              </h3>

              <p>
                ${escapeHTML(news.description)}
              </p>

            </div>

            <button
              class="delete-btn"
              onclick="deleteNews(${news.id})"
            >
              حذف
            </button>

          </div>

        `).join("");

    }

  }

}
