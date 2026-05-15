const COMPANY_NAME = "HC8 Clients";

const clients = [
  {
    companyName: "JR Store",
    firstName: "Jeremy",
    lastName: "Rey",
    contactNo: "+57 (Colombia)",
    email: "info@jrthekin.store",
    website: "https://jrthekin.store",
    details: "Tienda de música y arte urbano. Vendemos presencia: posters premium, hoodies oversize y accesorios para artistas, creadores y fans del movimiento urbano. Inspirado en estética street y ritmos pesados.",
    address: {
      city: "Colombia",
      state: "COL",
      zip: "Envíos nacionales"
    },
    workDone: [
      "Diseño y desarrollo del sitio web de e-commerce",
      "Integración de sistema de pagos online seguro",
      "Optimización mobile y PWA para compras desde cualquier dispositivo",
      "Sistema de seguimiento de pedidos y entregas 24-48h"
    ]
  },
  {
    companyName: "Zayas4ka Barber",
    firstName: "Zayas",
    lastName: "Barbero",
    contactNo: "+1 (939) 397-6152",
    email: "info@zayas4ka.com",
    website: "https://zayas4ka.com",
    details: "Barbería profesional con más de 5 años de experiencia. Especializado en cortes modernos y tradicionales con altos estándares de higiene y calidad. Certificado y graduado en servicio profesional. Sistema de reservas online con confirmación inmediata.",
    address: {
      city: "Carolina",
      state: "PR",
      zip: "Puerto Rico"
    },
    workDone: [
      "Desarrollo de plataforma de reservas online automática",
      "Integración con sistema de confirmación por email",
      "Calendario interactivo con disponibilidad en tiempo real",
      "Sistema de pagos múltiples (Efectivo, ATH Móvil, PayPal)"
    ]
  },
  {
    companyName: "Internet iPC",
    firstName: "Internet",
    lastName: "iPC",
    contactNo: "+1 (555) 246-8135",
    email: "info@internetipc.com",
    website: "https://internetipc.com",
    details: "Plataforma de búsqueda y exploración web impulsada por inteligencia artificial. Ofrece herramientas avanzadas para investigación en línea, análisis de datos web y automatización de búsquedas. Especializada en tecnología AI y procesamiento de información digital.",
    address: {
      city: "Silicon Valley",
      state: "CA",
      zip: "94025"
    },
    workDone: [
      "Desarrollo de interfaz de búsqueda AI",
      "Sistema de procesamiento de datos en tiempo real",
      "Integración de APIs de exploración web",
      "Dashboard de análisis y reportes automáticos"
    ]
  },
  {
    companyName: "Communiks",
    firstName: "Communiks",
    lastName: "Studio",
    contactNo: "+1 (555) 789-1234",
    email: "info@communiks.com",
    website: "https://communiks.com",
    details: "Estudio de diseño futurista que combina arte, moda, interiores y tecnología. Utilizamos inteligencia artificial para transformar ideas en diseños únicos y personalizados. Especializados en crear conceptos vanguardistas que están listos para materializarse.",
    address: {
      city: "Buenos Aires",
      state: "BA",
      zip: "C1425"
    },
    workDone: [
      "Plataforma de carga y procesamiento de imágenes con IA",
      "Sistema de generación de diseños personalizados",
      "Galería de portafolio digital interactivo",
      "Integración de contacto y cotizaciones automáticas"
    ]
  },
  {
    companyName: "Jesenia Estilista",
    firstName: "Jesenia",
    lastName: "Hernandez",
    contactNo: "WhatsApp directo",
    email: "jesenia@estilista.com",
    website: "https://jeseniaestilista.com",
    details: "Estilista profesional con más de 30 años de experiencia en la industria de la belleza y el estilismo. Ofrece un espacio cálido y acogedor donde el arte, el estilo y la autenticidad convergen. Especializada en técnicas clásicas y modernas con atención personalizada.",
    address: {
      city: "Puerto Rico",
      state: "PR",
      zip: "San Juan"
    },
    workDone: [
      "Desarrollo de sitio web PWA para reservas de citas",
      "Integración con WhatsApp para contacto directo",
      "Sistema de portafolio con galería de servicios",
      "Plataforma mobile-first con servicio offline"
    ]
  },
  {
    companyName: "Casa Cash Express",
    firstName: "Casa",
    lastName: "Cash Express",
    contactNo: "+1 (787) 555-0123",
    email: "info@casacashexpress.com",
    website: "https://casacashexpress.com",
    details: "Servicio de compra de propiedades en efectivo. Ofrecemos dinero rápido por tu propiedad sin complicaciones ni trámites largos. Con cobertura en toda Puerto Rico, garantizamos una venta inmediata y profesional para tu propiedad.",
    address: {
      city: "Puerto Rico",
      state: "PR",
      zip: "Cobertura Total"
    },
    workDone: [
      "Desarrollo de formulario interactivo para evaluación de propiedades",
      "Integración con base de datos de municipios de Puerto Rico",
      "Sistema de contacto directo y cotizaciones automáticas",
      "Plataforma PWA para acceso mobile en cualquier momento"
    ]
  }
];

const errorBox = document.getElementById("error");
const preview = document.getElementById("preview");
const mobileTree = document.getElementById("mobileTree");
const clientInfo = document.getElementById("clientInfo");
const clientSelect = document.getElementById("clientSelect");
const installBtn = document.getElementById("installBtn");
const imageModal = document.getElementById("imageModal");
const imageModalStage = imageModal.querySelector(".image-modal-stage");
const modalImage = document.getElementById("modalImage");
const rotateBtn = document.getElementById("rotateBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

let deferredInstallPrompt = null;
let activeDiagramUrl = null;
let modalRotation = 0;

function showError(message) {
  errorBox.textContent = message;
  errorBox.style.display = "block";
}

function clearError() {
  errorBox.style.display = "none";
  errorBox.textContent = "";
}

function safeText(value) {
  return (value || "").toString().trim() || "-";
}

function escapeHtml(value) {
  return safeText(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getClientLabel(client, index) {
  return `${index + 1}. ${safeText(client.companyName)}`.trim();
}

function populateClientSelect() {
  clientSelect.innerHTML = "";
  clients.forEach((client, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = getClientLabel(client, index);
    clientSelect.appendChild(option);
  });
}

function getClientByIndex(index) {
  const safeIndex = Math.max(0, Number(index) || 0);
  return clients[safeIndex] || null;
}

function createSvgText(className, x, y, value) {
  return `<text class="${className}" x="${x}" y="${y}">${escapeHtml(value)}</text>`;
}

function buildClientDiagram(client) {
  const company = client.companyName || COMPANY_NAME;
  const fullName = `${safeText(client.firstName)} ${safeText(client.lastName)}`.trim();

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 500" width="100%" preserveAspectRatio="xMidYMid meet">
  <defs>
    <style>
      .bg { fill: #f5f5f7; }
      .node { fill: #ffffff; stroke: #b24c4c; stroke-width: 3; }
      .label { fill: #111111; font-family: "Segoe UI", Tahoma, sans-serif; font-size: 15px; font-weight: 600; text-anchor: middle; dominant-baseline: middle; }
      .label-sm { fill: #111111; font-family: "Segoe UI", Tahoma, sans-serif; font-size: 12px; font-weight: 500; text-anchor: middle; dominant-baseline: middle; }
      .edge { stroke: #111111; stroke-width: 4; fill: none; }
    </style>
    <marker id="arrow" markerWidth="12" markerHeight="12" refX="9" refY="6" orient="auto" markerUnits="strokeWidth">
      <path d="M 0 0 L 12 6 L 0 12 z" fill="#111111"/>
    </marker>
  </defs>

  <rect class="bg" x="0" y="0" width="1100" height="500"/>

  <line class="edge" x1="550" y1="76" x2="550" y2="104" marker-end="url(#arrow)"/>
  <line class="edge" x1="550" y1="166" x2="550" y2="200"/>
  <line class="edge" x1="130" y1="200" x2="970" y2="200"/>
  <line class="edge" x1="130" y1="200" x2="130" y2="214" marker-end="url(#arrow)"/>
  <line class="edge" x1="340" y1="200" x2="340" y2="214" marker-end="url(#arrow)"/>
  <line class="edge" x1="550" y1="200" x2="550" y2="214" marker-end="url(#arrow)"/>
  <line class="edge" x1="760" y1="200" x2="760" y2="214" marker-end="url(#arrow)"/>
  <line class="edge" x1="970" y1="200" x2="970" y2="214" marker-end="url(#arrow)"/>

  <line class="edge" x1="970" y1="276" x2="970" y2="340"/>
  <line class="edge" x1="340" y1="340" x2="760" y2="340"/>
  <line class="edge" x1="340" y1="340" x2="340" y2="374" marker-end="url(#arrow)"/>
  <line class="edge" x1="550" y1="340" x2="550" y2="374" marker-end="url(#arrow)"/>
  <line class="edge" x1="760" y1="340" x2="760" y2="374" marker-end="url(#arrow)"/>

  <rect class="node" x="460" y="20" width="180" height="56" rx="10"/>
  <rect class="node" x="460" y="110" width="180" height="56" rx="10"/>

  <rect class="node" x="40" y="220" width="180" height="56" rx="10"/>
  <rect class="node" x="250" y="220" width="180" height="56" rx="10"/>
  <rect class="node" x="460" y="220" width="180" height="56" rx="10"/>
  <rect class="node" x="670" y="220" width="180" height="56" rx="10"/>
  <rect class="node" x="880" y="220" width="180" height="56" rx="10"/>

  <rect class="node" x="250" y="380" width="180" height="56" rx="10"/>
  <rect class="node" x="460" y="380" width="180" height="56" rx="10"/>
  <rect class="node" x="670" y="380" width="180" height="56" rx="10"/>

  ${createSvgText("label", 550, 48, company)}
  ${createSvgText("label", 550, 138, fullName)}
  ${createSvgText("label", 130, 248, client.firstName)}
  ${createSvgText("label", 340, 248, client.lastName)}
  ${createSvgText("label-sm", 550, 248, client.contactNo)}
  ${createSvgText("label-sm", 760, 248, client.email)}
  ${createSvgText("label", 970, 248, "Address")}

  ${createSvgText("label", 340, 408, client.address?.city)}
  ${createSvgText("label", 550, 408, client.address?.state)}
  ${createSvgText("label", 760, 408, client.address?.zip)}
</svg>
`;
}

function renderClient(clientIndex) {
  const client = getClientByIndex(clientIndex);
  if (!client) {
    showError("No se pudo cargar el cliente seleccionado.");
    return;
  }

  preview.innerHTML = buildClientDiagram(client);
  renderMobileTree(client);
  renderClientInfo(client);
}

function createTreeItem(label, value) {
  const item = document.createElement("div");
  item.className = "mobile-item";
  item.innerHTML = `<span class="mobile-label">${escapeHtml(label)}</span><span class="mobile-value">${escapeHtml(value)}</span>`;
  return item;
}

function getSafeUrl(urlString) {
  const candidate = (urlString || "").toString().trim();
  if (!candidate) {
    return null;
  }

  try {
    const parsed = new URL(candidate);
    return parsed.href;
  } catch {
    return null;
  }
}

function renderClientInfo(client) {
  const websiteUrl = getSafeUrl(client.website);
  const workItems = Array.isArray(client.workDone) ? client.workDone.filter(Boolean) : [];
  const websiteMarkup = websiteUrl
    ? `<a class="info-link" href="${escapeHtml(websiteUrl)}" target="_blank" rel="noreferrer">${escapeHtml(websiteUrl)}</a>`
    : "<strong>-</strong>";
  const workMarkup = workItems.length > 0
    ? `<ul class="diagram-sublist">${workItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
    : "<p class=\"work-empty\">No hay trabajos registrados.</p>";

  clientInfo.innerHTML = `
    <ul class="diagram-list">
      <li><span class="diagram-label">Compania</span><span class="diagram-value">${escapeHtml(client.companyName)}</span></li>
      <li><span class="diagram-label">Cliente</span><span class="diagram-value">${escapeHtml(client.firstName)} ${escapeHtml(client.lastName)}</span></li>
      <li><span class="diagram-label">Telefono</span><span class="diagram-value">${escapeHtml(client.contactNo)}</span></li>
      <li><span class="diagram-label">Email</span><span class="diagram-value">${escapeHtml(client.email)}</span></li>
      <li><span class="diagram-label">Ciudad</span><span class="diagram-value">${escapeHtml(client.address?.city)}</span></li>
      <li><span class="diagram-label">Estado</span><span class="diagram-value">${escapeHtml(client.address?.state)}</span></li>
      <li><span class="diagram-label">Zip</span><span class="diagram-value">${escapeHtml(client.address?.zip)}</span></li>
      <li><span class="diagram-label">Pagina web</span><span class="diagram-value">${websiteMarkup}</span></li>
      <li class="diagram-list-wide"><span class="diagram-label">Detalles</span><span class="diagram-value">${escapeHtml(client.details)}</span></li>
      <li class="diagram-list-wide"><span class="diagram-label">Trabajo realizado</span><span class="diagram-value">${workMarkup}</span></li>
    </ul>
  `;
}

function renderMobileTree(client) {
  const fullName = `${safeText(client.firstName)} ${safeText(client.lastName)}`.trim();

  const wrapper = document.createElement("div");
  wrapper.className = "mobile-tree-wrapper";

  const topCard = document.createElement("section");
  topCard.className = "mobile-card";
  topCard.innerHTML = `<h3>${escapeHtml(client.companyName)}</h3><p>${escapeHtml(fullName)}</p>`;
  wrapper.appendChild(topCard);

  const infoCard = document.createElement("section");
  infoCard.className = "mobile-card";
  infoCard.innerHTML = "<h3>Datos del cliente</h3>";
  infoCard.appendChild(createTreeItem("Nombre", client.firstName));
  infoCard.appendChild(createTreeItem("Apellido", client.lastName));
  infoCard.appendChild(createTreeItem("Telefono", client.contactNo));
  infoCard.appendChild(createTreeItem("Email", client.email));
  wrapper.appendChild(infoCard);

  const addressCard = document.createElement("section");
  addressCard.className = "mobile-card";
  addressCard.innerHTML = "<h3>Direccion</h3>";
  addressCard.appendChild(createTreeItem("Ciudad", client.address?.city));
  addressCard.appendChild(createTreeItem("Estado", client.address?.state));
  addressCard.appendChild(createTreeItem("Zip", client.address?.zip));
  wrapper.appendChild(addressCard);

  mobileTree.innerHTML = "";
  mobileTree.appendChild(wrapper);
}

function revokeActiveDiagramUrl() {
  if (activeDiagramUrl) {
    URL.revokeObjectURL(activeDiagramUrl);
    activeDiagramUrl = null;
  }
}

function createDiagramImageUrl() {
  const svg = preview.querySelector("svg");
  if (!svg) {
    return null;
  }

  const serializer = new XMLSerializer();
  const svgMarkup = serializer.serializeToString(svg);
  const blob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });
  revokeActiveDiagramUrl();
  activeDiagramUrl = URL.createObjectURL(blob);
  return activeDiagramUrl;
}

function openDiagramModal() {
  const imageUrl = createDiagramImageUrl();
  if (!imageUrl) {
    return;
  }

  modalRotation = 0;
  modalImage.src = imageUrl;
  modalImage.classList.remove("is-rotated");
  modalImage.style.transform = "rotate(0deg)";
  imageModal.hidden = false;
  document.body.classList.add("modal-open");
  requestAnimationFrame(fitModalImageToStage);
}

function closeDiagramModal() {
  imageModal.hidden = true;
  modalImage.removeAttribute("src");
  modalImage.style.width = "";
  modalImage.style.height = "";
  modalImage.style.transform = "";
  document.body.classList.remove("modal-open");
  revokeActiveDiagramUrl();
}

function fitModalImageToStage() {
  if (imageModal.hidden || !modalImage.naturalWidth || !modalImage.naturalHeight) {
    return;
  }

  const stageRect = imageModalStage.getBoundingClientRect();
  const stageWidth = Math.max(0, stageRect.width - 8);
  const stageHeight = Math.max(0, stageRect.height - 8);
  if (stageWidth <= 0 || stageHeight <= 0) {
    return;
  }

  const aspectRatio = modalImage.naturalWidth / modalImage.naturalHeight;
  const normalizedRotation = ((modalRotation % 360) + 360) % 360;
  const isQuarterTurn = normalizedRotation === 90 || normalizedRotation === 270;

  let width;
  let height;

  if (isQuarterTurn) {
    const candidateHeight = Math.min(stageWidth, stageHeight / aspectRatio);
    height = Math.max(1, candidateHeight);
    width = Math.max(1, candidateHeight * aspectRatio);
  } else {
    const candidateHeight = Math.min(stageHeight, stageWidth / aspectRatio);
    height = Math.max(1, candidateHeight);
    width = Math.max(1, candidateHeight * aspectRatio);
  }

  modalImage.classList.toggle("is-rotated", isQuarterTurn);
  modalImage.style.width = `${width}px`;
  modalImage.style.height = `${height}px`;
  modalImage.style.transform = `rotate(${modalRotation}deg)`;
}

function rotateModalImage(direction) {
  modalRotation += direction * 90;
  fitModalImageToStage();
}

function setupEvents() {
  clientSelect.addEventListener("change", (event) => {
    const selectedIndex = Number(event.target.value) || 0;
    renderClient(selectedIndex);
  });

  preview.addEventListener("click", () => {
    openDiagramModal();
  });

  imageModal.addEventListener("click", (event) => {
    if (event.target.dataset.closeModal === "true") {
      closeDiagramModal();
    }
  });

  closeModalBtn.addEventListener("click", () => {
    closeDiagramModal();
  });

  rotateBtn.addEventListener("click", () => {
    rotateModalImage(1);
  });

  modalImage.addEventListener("load", () => {
    fitModalImageToStage();
  });

  window.addEventListener("resize", () => {
    fitModalImageToStage();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !imageModal.hidden) {
      closeDiagramModal();
    }
  });
}

function setupPwa() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {
        showError("No se pudo registrar el service worker para modo offline.");
      });
    });
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    installBtn.hidden = false;
  });

  installBtn.addEventListener("click", async () => {
    if (!deferredInstallPrompt) {
      return;
    }

    deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    if (choice && choice.outcome === "accepted") {
      installBtn.hidden = true;
    }
    deferredInstallPrompt = null;
  });

  window.addEventListener("appinstalled", () => {
    installBtn.hidden = true;
  });
}

function run() {
  if (!Array.isArray(clients) || clients.length === 0) {
    showError("No hay clientes para mostrar en el diagrama.");
    return;
  }

  clearError();
  populateClientSelect();
  setupEvents();
  renderClient(0);
}

setupPwa();
run();
