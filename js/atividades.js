/**
 * Catálogo de atividades: busca por texto e filtros por categoria.
 */
(function initActivitiesCatalog() {
  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("activity-search-input");
    const filterChips = document.querySelectorAll(".filter-chip");
    const cards = document.querySelectorAll("#cards-grid article");

    if (!searchInput || !cards.length) return;

    filterChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        setActiveChip(filterChips, chip);
        applyFilters(cards, searchInput.value, chip.dataset.filter);
      });
    });

    searchInput.addEventListener("input", (event) => {
      const activeChip = document.querySelector(".filter-chip.active-filter, .filter-chip.bg-primary");
      const currentFilter = activeChip ? activeChip.dataset.filter : "all";
      applyFilters(cards, event.target.value, currentFilter);
    });
  });

  /** Marca visualmente o chip escolhido. */
  function setActiveChip(chips, selected) {
    chips.forEach((chip) => {
      chip.classList.remove("active-filter", "bg-primary", "text-on-primary", "shadow-sm");
      chip.classList.add("bg-surface-container-high", "text-on-surface-variant");
    });

    selected.classList.add("active-filter", "bg-primary", "text-on-primary", "shadow-sm");
    selected.classList.remove("bg-surface-container-high", "text-on-surface-variant");
  }

  /**
   * Mostra ou esconde cards conforme o texto digitado e a categoria do chip.
   * A busca usa o texto visível do card (título, tags e descrição).
   */
  function applyFilters(cards, query, filter) {
    const normalizedQuery = (query || "").toLowerCase();

    cards.forEach((card) => {
      const cardText = card.innerText.toLowerCase();
      const matchesQuery = cardText.includes(normalizedQuery);
      const matchesCategory = cardMatchesFilter(cardText, filter);

      card.style.display = matchesQuery && matchesCategory ? "flex" : "none";
    });
  }

  /** Regras de categoria alinhadas às tags dos cards do protótipo. */
  function cardMatchesFilter(cardText, filter) {
    if (!filter || filter === "all") return true;

    const rules = {
      matematica: ["matemática", "álgebra", "geometria"],
      fisica: ["física", "mecânica", "termodinâmica"],
      mecanica: ["mecânica", "gravidade"],
      termodinamica: ["calorimetria", "termodinâmica"],
      geometria: ["geometria", "pitágoras"],
      fundamental: ["iniciante", "fundamental"],
      medio: ["médio", "intermediário"],
    };

    const keywords = rules[filter] || [];
    return keywords.some((word) => cardText.includes(word));
  }
})();
