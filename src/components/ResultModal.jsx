import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal(
  { targetTime, timeRemaining, onReset },
  ref
) {
  const dialog = useRef();

  const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);
  const userLost = timeRemaining <= 0;
  const formattedTimeRemaining = (timeRemaining / 1000).toFixed(2);

  useImperativeHandle(ref, () => {
    return {
      openModal() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h2>You lost!</h2>}
      {!userLost && <h2>Your score: {score}</h2>}
      <p>
        The target time was{" "}
        <strong>
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </strong>
      </p>
      {!userLost && (
        <p>
          You stopped the timer with{" "}
          <strong>
            {formattedTimeRemaining} second
            {formattedTimeRemaining > 1 ? "s" : ""} left.
          </strong>
        </p>
      )}
      {userLost && (
        <p>
          You failed to stop the timer before <strong>0.00 seconds</strong>
        </p>
      )}
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
