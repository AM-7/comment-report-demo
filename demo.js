import { outcomes, samples } from "./samples.js";

const el = (id) => document.getElementById(id);

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function evidenceComment([, outcome, text]) {
  const quote = element("blockquote");
  quote.append(element("p", text), element("footer", outcome, "outcome"));
  return quote;
}

function findingView(finding, comments, kind) {
  const details = element("details", undefined, "finding");
  details.id = finding.id;
  const heading = document.createElement("summary");
  heading.append(
    element("span", finding.label, "finding-label"),
    element("span", finding.support.length + " supporting " + (finding.support.length === 1 ? "comment" : "comments"), "meta"),
  );
  const evidence = element("div", undefined, "evidence");
  evidence.append(...finding.support.map((id) => evidenceComment(comments.get(id))));
  details.append(heading, evidence);
  const overview = element("li");
  const link = element("a", finding.label);
  link.href = "#" + finding.id;
  link.addEventListener("click", () => {
    details.open = true;
    heading.focus({ preventScroll: true });
  });
  overview.append(
    document.createTextNode(kind === "theme" ? finding.support.length + " comments mention " : "A question raised in " + finding.support.length + " comments is "),
    link,
    document.createTextNode(kind === "theme" ? "." : ""),
  );
  return { details, overview };
}

function distributionRow(outcome, count, total) {
  const row = element("li", undefined, "distribution-row");
  const percent = Math.round(count * 100 / total);
  const meter = element("meter", undefined, outcome);
  Object.assign(meter, { value: count, min: 0, max: total });
  meter.setAttribute("aria-hidden", "true");
  row.append(
    element("span", outcome, "outcome"),
    meter,
    element("span", count + " · " + percent + "%", "row-value"),
  );
  return row;
}

function render(sample, announce) {
  const count = sample.comments.length;
  const collected = count + Object.values(sample.excluded).reduce((sum, value) => sum + value, 0);
  const comments = new Map(sample.comments.map((row) => [row[0], row]));
  const sentiment = Object.fromEntries(outcomes.map((label) => [label, 0]));
  for (const [, label] of sample.comments) sentiment[label]++;

  el("video-title").textContent = sample.title;
  el("sample-category").textContent = sample.category;
  el("eligible").textContent = count;
  el("collected").textContent = collected;
  el("scope").textContent =
    [sample.excluded.language + " non-English or mixed language", sample.excluded.uncertain + " language uncertain", sample.excluded.unusable + " unusable"].join(" · ") +
    ". Newest first, with replies excluded.";
  el("scope-details").open = false;
  el("distribution").replaceChildren(...outcomes.map((label) => distributionRow(label, sentiment[label], count)));

  const themes = sample.themes.map((finding) => findingView(finding, comments, "theme"));
  const questions = sample.questions.map((finding) => findingView(finding, comments, "question"));
  el("summary").replaceChildren(...[...themes, ...questions].map((finding) => finding.overview));
  el("themes").replaceChildren(...themes.map((finding) => finding.details));
  el("questions").replaceChildren(...questions.map((finding) => finding.details));
  el("all-label").textContent = "Read all " + count + " comments";
  el("all-label").parentElement.open = false;
  el("all-comments").replaceChildren(...sample.comments.map(evidenceComment));
  if (announce) el("sample-status").textContent = sample.title + " report loaded.";
}

for (const radio of document.querySelectorAll('input[name="sample"]')) {
  radio.addEventListener("change", () => {
    if (radio.checked) render(samples[radio.value], true);
  });
}

const activeSample = document.querySelector('input[name="sample"]:checked');
render(samples[activeSample.value], false);
