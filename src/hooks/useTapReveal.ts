import { useState, type SyntheticEvent } from "react";

import { prefersTouch } from "../lib/media";

export const useTapReveal = () => {
  const [revealed, setRevealed] = useState(false);

  // On touch devices the card reveals its action on first tap and dismisses on a second tap.
  const handleCardClick = (e: SyntheticEvent) => {
    if (!prefersTouch) return;
    e.preventDefault();
    setRevealed((r) => !r);
  };

  return {
    revealed,
    handleCardClick,
    revealedClass: revealed ? " is-revealed" : "",
  };
};
