/**
 * Navegação compartilhada do Cienvolva.
 * Destaca o item da página atual e resolve os data-path que o Stitch deixava como "#".
 */
(function initNavigation() {
  const page = document.body.dataset.page || "inicio";
  const inPagesFolder = page !== "inicio";

  /** Mapa de rotas do protótipo para arquivos reais. */
  const routes = {
    inicio: inPagesFolder ? "../index.html" : "index.html",
    "atividades-experimentos": inPagesFolder ? "atividades.html" : "pages/atividades.html",
    "experimento-detalhado": inPagesFolder ? "experimento.html" : "pages/experimento.html",
    "experimento-queda-livre": inPagesFolder ? "experimento.html" : "pages/experimento.html",
    "experimento-onda-harmonica": inPagesFolder ? "experimento.html" : "pages/experimento.html",
    "experimento-graficos-parabola": inPagesFolder ? "experimento.html" : "pages/experimento.html",
    "experimento-eletrostatica": inPagesFolder ? "experimento.html" : "pages/experimento.html",
    "experimento-pitagoras-visual": inPagesFolder ? "experimento.html" : "pages/experimento.html",
    "experimento-calorimetria": inPagesFolder ? "experimento.html" : "pages/experimento.html",
  };

  /**
   * Aplica o href correto e marca o link ativo no header.
   */
  function wireLinks() {
    document.querySelectorAll("a[data-path]").forEach((link) => {
      const path = link.dataset.path;
      if (routes[path]) {
        link.setAttribute("href", routes[path]);
      }

      const isHomeLink = path === "inicio" && page === "inicio";
      const isActivitiesLink = path === "atividades-experimentos" && page === "atividades-experimentos";
      const isExperimentLink =
        page === "experimento-detalhado" && path === "atividades-experimentos" && link.closest("header");

      if (isHomeLink || isActivitiesLink) {
        link.classList.add("nav-link-active");
      }

      if (isExperimentLink) {
        link.classList.add("nav-link-active");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wireLinks);
  } else {
    wireLinks();
  }
})();
