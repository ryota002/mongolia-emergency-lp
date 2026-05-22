const backToTop = document.querySelector(".back-to-top");

const toggleBackToTop = () => {
  backToTop.classList.toggle("is-visible", window.scrollY > 520);
};

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", toggleBackToTop, { passive: true });
toggleBackToTop();

const getValue = (source, path) =>
  path.split(".").reduce((value, key) => (value && value[key] !== undefined ? value[key] : undefined), source);

const clearAndAppend = (element, children) => {
  element.replaceChildren(...children);
};

const textNodeElement = (tagName, text, className) => {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  element.textContent = text || "";
  return element;
};

const normalizeText = (item) => {
  if (typeof item === "string") return item;
  return item?.text || item?.paragraph || "";
};

const renderParagraphs = (selector, paragraphs) => {
  const container = document.querySelector(selector);
  if (!container || !Array.isArray(paragraphs)) return;
  clearAndAppend(
    container,
    paragraphs.filter(Boolean).map((paragraph) => textNodeElement("p", normalizeText(paragraph)))
  );
};

const renderFacts = (facts) => {
  const container = document.querySelector("[data-cms-facts]");
  if (!container || !Array.isArray(facts)) return;
  clearAndAppend(
    container,
    facts.filter(Boolean).map((fact) => textNodeElement("span", normalizeText(fact)))
  );
};

const renderGallery = (gallery) => {
  const container = document.querySelector("[data-cms-gallery]");
  if (!container || !Array.isArray(gallery)) return;

  clearAndAppend(
    container,
    gallery.map((item) => {
      const figure = document.createElement("figure");
      const image = document.createElement("img");
      const caption = document.createElement("figcaption");

      image.src = item.image || "";
      image.alt = item.alt || item.caption || "";
      caption.textContent = item.caption || "";

      figure.append(image, caption);
      return figure;
    })
  );
};

const renderActivities = (items) => {
  const container = document.querySelector("[data-cms-activities]");
  if (!container || !Array.isArray(items)) return;

  clearAndAppend(
    container,
    items.map((item, index) => {
      const article = document.createElement("article");
      article.className = "activity";
      article.append(
        textNodeElement("span", String(index + 1).padStart(2, "0"), "activity-number"),
        textNodeElement("h3", item.title),
        textNodeElement("p", item.body)
      );
      return article;
    })
  );
};

const renderTimeline = (items) => {
  const container = document.querySelector("[data-cms-timeline]");
  if (!container || !Array.isArray(items)) return;

  clearAndAppend(
    container,
    items.map((item) => {
      const li = document.createElement("li");
      const body = document.createElement("div");
      body.append(textNodeElement("h3", item.title), textNodeElement("p", item.body));
      li.append(textNodeElement("time", item.period), body);
      return li;
    })
  );
};

const renderSignature = (signature) => {
  const element = document.querySelector("[data-cms-signature]");
  if (!element || typeof signature !== "string") return;
  const lines = signature.split("\n");
  element.replaceChildren();
  lines.forEach((line, index) => {
    if (index > 0) element.append(document.createElement("br"));
    element.append(document.createTextNode(line));
  });
};

const renderSummary = (items) => {
  const container = document.querySelector("[data-cms-summary]");
  if (!container || !Array.isArray(items)) return;

  clearAndAppend(
    container,
    items.map((item) => {
      const wrapper = document.createElement("div");
      wrapper.append(textNodeElement("dt", item.label), textNodeElement("dd", item.value));
      return wrapper;
    })
  );
};

const applyContent = (content) => {
  document.querySelectorAll("[data-cms]").forEach((element) => {
    const value = getValue(content, element.dataset.cms);
    if (typeof value === "string") element.textContent = value;
  });

  const description = document.querySelector('meta[name="description"]');
  if (description && content.site?.description) {
    description.setAttribute("content", content.site.description);
  }

  renderFacts(content.hero?.facts);
  renderGallery(content.hero?.gallery);
  renderParagraphs('[data-cms-list="about.body"]', content.about?.body);
  renderActivities(content.activities?.items);
  renderParagraphs('[data-cms-list="approach.body"]', content.approach?.body);
  renderTimeline(content.timeline?.items);
  renderSignature(content.message?.signature);
  renderSummary(content.summary?.items);
};

fetch("content/site.json", { cache: "no-cache" })
  .then((response) => {
    if (!response.ok) throw new Error("Content file could not be loaded.");
    return response.json();
  })
  .then(applyContent)
  .catch(() => {
    // Keep the static HTML fallback when previewing directly from a local file.
  });
