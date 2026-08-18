import { useState, type SyntheticEvent } from "react";

import { isSmallScreen } from "../lib/media";

export const useTapReveal = () => {
  const [revealed, setRevealed] = useState(false);

  // On small screens the card reveals its description on first tap and dismisses on a second tap.
  const handleCardClick = (e: SyntheticEvent) => {
    if (!isSmallScreen) return;
    e.preventDefault();
    setRevealed((r) => !r);
  };

  return {
    revealed,
    handleCardClick,
    revealedClass: revealed ? " is-revealed" : "",
  };
};
