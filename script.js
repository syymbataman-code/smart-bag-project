const $ = (id) => document.getElementById(id);

const bodyWeight = $("bodyWeight");
const bagWeight = $("bagWeight");
const bodyOutput = $("bodyOutput");
const bagOutput = $("bagOutput");
const limitOutput = $("limitOutput");
const meterFill = $("meterFill");
const weightStatus = $("weightStatus");

function updateWeightLab() {
  const body = Number(bodyWeight.value);
  const bag = Number(bagWeight.value);
  const limit = body * 0.15; // Жобаның демонстрациялық жорамалы
  bodyOutput.value = `${body} кг`;
  bagOutput.value = `${bag.toFixed(1)} кг`;
  limitOutput.textContent = `${limit.toFixed(1)} кг`;
  const ratio = limit > 0 ? Math.min((bag / limit) * 100, 100) : 0;
  meterFill.style.width = `${ratio}%`;
  if (bag <= limit) {
    meterFill.style.background = "linear-gradient(90deg,#4be1c2,#55baff)";
    weightStatus.textContent = "✓ Шек ішінде";
    weightStatus.className = "status-pill ok";
  } else {
    meterFill.style.background = "linear-gradient(90deg,#ffbd69,#ff627a)";
    weightStatus.textContent = "⚠ Шектен жоғары";
    weightStatus.className = "status-pill over";
  }
}
bodyWeight.addEventListener("input", updateWeightLab);
bagWeight.addEventListener("input", updateWeightLab);
updateWeightLab();

const lightPreview = $("lightPreview");
const lightCaption = $("lightCaption");
document.querySelectorAll(".mode-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const night = button.dataset.mode === "night";
    lightPreview.classList.toggle("night", night);
    lightPreview.classList.toggle("day", !night);
    lightCaption.textContent = night ? "Қараңғы режим · LED қосулы" : "Күндізгі режим · LED өшірулі";
  });
});

$("menuToggle").addEventListener("click", () => $("nav").classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(link => link.addEventListener("click", () => $("nav").classList.remove("open")));
$("year").textContent = new Date().getFullYear();
