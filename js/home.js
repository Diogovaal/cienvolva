/**
 * Interações da página inicial: escolha de perfil e carrossel de experimentos.
 */
(function initHomeInteractions() {
  /**
   * Alterna o card de perfil selecionado (Professor, Aluno ou Curioso).
   * Só muda ênfase visual — o layout original não navega para telas diferentes.
   */
  function setupRoleCards() {
    const roleCards = document.querySelectorAll(".role-card");

    roleCards.forEach((card) => {
      card.addEventListener("click", () => {
        roleCards.forEach((other) => deactivateRoleCard(other));
        activateRoleCard(card);
      });
    });
  }

  /** Remove o estado ativo de um card de perfil. */
  function deactivateRoleCard(card) {
    card.classList.remove("active-role", "bg-surface-container-high", "-translate-y-1", "shadow-md");
    card.classList.add("bg-surface-container-lowest", "shadow-sm");

    const pill = card.querySelector("span.px-space-md");
    if (!pill) return;

    pill.classList.remove("bg-primary", "text-on-primary");

    if (card.dataset.role === "professor") {
      pill.classList.add("bg-secondary-fixed", "text-on-secondary-container");
    } else if (card.dataset.role === "curioso") {
      pill.classList.add("bg-tertiary-fixed", "text-on-tertiary-fixed");
    } else {
      pill.classList.add("bg-primary", "text-on-primary");
    }
  }

  /** Aplica o estado ativo no card clicado. */
  function activateRoleCard(card) {
    card.classList.add("active-role", "bg-surface-container-high", "-translate-y-1", "shadow-md");
    card.classList.remove("bg-surface-container-lowest", "shadow-sm");

    const pill = card.querySelector("span.px-space-md");
    if (!pill) return;

    pill.classList.remove("bg-secondary-fixed", "bg-tertiary-fixed", "text-on-secondary-container", "text-on-tertiary-fixed");
    pill.classList.add("bg-primary", "text-on-primary");
  }

  /**
   * Feedback visual das setas do carrossel.
   * O grid original já mostra os 4 cards; as setas só confirmam a ação.
   */
  function setupCarousel() {
    const prevBtn = document.getElementById("carousel-prev");
    const nextBtn = document.getElementById("carousel-next");
    const track = document.getElementById("experiments-track");

    if (!prevBtn || !nextBtn || !track) return;

    let shifted = false;

    nextBtn.addEventListener("click", () => {
      if (shifted) return;
      nudgeTrack(track, "-10px");
      shifted = true;
      swapCarouselEmphasis(nextBtn, prevBtn);
    });

    prevBtn.addEventListener("click", () => {
      if (!shifted) return;
      nudgeTrack(track, "10px");
      shifted = false;
      swapCarouselEmphasis(prevBtn, nextBtn);
    });
  }

  /** Pequeno deslocamento para dar feedback ao clique. */
  function nudgeTrack(track, offset) {
    track.style.transform = `translateX(${offset})`;
    setTimeout(() => {
      track.style.transform = "";
    }, 200);
  }

  /** Inverte a cor primária entre as duas setas. */
  function swapCarouselEmphasis(fromBtn, toBtn) {
    fromBtn.classList.remove("bg-primary", "text-on-primary");
    fromBtn.classList.add("bg-surface-container-high", "text-on-surface");
    toBtn.classList.add("bg-primary", "text-on-primary");
    toBtn.classList.remove("bg-surface-container-high", "text-on-surface");
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupRoleCards();
    setupCarousel();
  });
})();
