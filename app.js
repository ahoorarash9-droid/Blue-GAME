const DATA_KEY = "bluegame_data";

const defaultData = {
  games: [
    {
      id: 1,
      title: "Minecraft",
      description: "نسخه رسمی Minecraft برای کامپیوتر و موبایل.",
      version: "Latest",
      size: "متغیر",
      image: "",
      download: "https://www.minecraft.net/download"
    }
  ],

  mods: [
    {
      id: 1,
      title: "Sodium",
      description: "مود بهینه‌سازی Minecraft برای افزایش عملکرد.",
      type: "java",
      version: "1.21",
      loader: "Fabric",
      image: "",
      download: "#"
    },
    {
      id: 2,
      title: "Better Animations",
      description: "انیمیشن‌های بهتر برای Minecraft Bedrock.",
      type: "bedrock",
      version: "1.21",
      loader: "",
      image: "",
      download: "#"
    }
  ],

  news: [
    {
      id: 1,
      title: "به BlueGame خوش آمدید!",
      description: "جدیدترین بازی‌ها و مودها را در BlueGame دنبال کنید.",
      date: "جدید"
    }
  ]
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


function escapeHTML(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function renderGames() {

  const container = document.getElementById("gameList");

  if (!container) return;

  const data = getData();

  if (data.games.length === 0) {

    container.innerHTML = `
      <div class="card">
        <h3>هنوز بازی‌ای اضافه نشده است.</h3>
      </div>
    `;

    return;
  }


  container.innerHTML = data.games.map(game => `

    <article class="card">

      <div class="card-image">

        ${
          game.image
            ? `<img src="${escapeHTML(game.image)}" alt="">`
            : "🎮"
        }

      </div>

      <h3>${escapeHTML(game.title)}</h3>

      <p>
        ${escapeHTML(game.description)}
      </p>

      <div class="tags">

        ${
          game.version
            ? `<span class="tag">${escapeHTML(game.version)}</span>`
            : ""
        }

        ${
          game.size
            ? `<span class="tag">${escapeHTML(game.size)}</span>`
            : ""
        }

      </div>

      <a
        class="btn download"
        href="${escapeHTML(game.download)}"
        target="_blank"
        rel="noopener"
      >
        دانلود بازی ⬇
      </a>

    </article>

  `).join("");
}



function renderMods() {

  const container = document.getElementById("modList");

  if (!container) return;

  const data = getData();

  const search =
    document.getElementById("search")?.value
      .toLowerCase()
      .trim() || "";

  const type =
    document.getElementById("modType")?.value || "all";


  const mods = data.mods.filter(mod => {

    const text = `
      ${mod.title}
      ${mod.description}
      ${mod.version}
      ${mod.loader}
    `.toLowerCase();


    const matchesSearch =
      !search || text.includes(search);


    const matchesType =
      type === "all" || mod.type === type;


    return matchesSearch && matchesType;

  });


  if (mods.length === 0) {

    container.innerHTML = `
      <div class="card">
        <h3>مودی پیدا نشد 🔎</h3>
        <p>عبارت جستجو یا فیلتر را تغییر بده.</p>
      </div>
    `;

    return;
  }


  container.innerHTML = mods.map(mod => `

    <article class="card">

      <div class="card-image">

        ${
          mod.image
            ? `<img src="${escapeHTML(mod.image)}" alt="">`
            : mod.type === "java"
              ? "🟢"
              : "🔷"
        }

      </div>


      <h3>
        ${escapeHTML(mod.title)}
      </h3>


      <p>
        ${escapeHTML(mod.description)}
      </p>


      <div class="tags">

        <span class="tag">
          ${mod.type === "java" ? "Java" : "Bedrock"}
        </span>

        ${
          mod.version
            ? `<span class="tag">${escapeHTML(mod.version)}</span>`
            : ""
        }

        ${
          mod.loader
            ? `<span class="tag">${escapeHTML(mod.loader)}</span>`
            : ""
        }

      </div>


      <a
        class="btn download"
        href="${escapeHTML(mod.download)}"
        target="_blank"
        rel="noopener"
      >
        دانلود مود ⬇
      </a>

    </article>

  `).join("");
}



function renderNews() {

  const container = document.getElementById("newsList");

  if (!container) return;

  const data = getData();


  if (data.news.length === 0) {

    container.innerHTML = `
      <div class="news-card">
        هنوز خبری منتشر نشده است.
      </div>
    `;

    return;
  }


  container.innerHTML = data.news.map(news => `

    <article class="news-card">

      <h3>
        ${escapeHTML(news.title)}
      </h3>

      <p>
        ${escapeHTML(news.description)}
      </p>

      <small>
        ${escapeHTML(news.date)}
      </small>

    </article>

  `).join("");
}



function renderAll() {

  renderGames();
  renderMods();
  renderNews();

}



document.addEventListener("DOMContentLoaded", () => {

  renderAll();


  const search =
    document.getElementById("search");

  const type =
    document.getElementById("modType");


  if (search) {

    search.addEventListener(
      "input",
      renderMods
    );

  }


  if (type) {

    type.addEventListener(
      "change",
      renderMods
    );

  }

});
