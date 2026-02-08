const fallbackLabels = {
  en: "Scroll",
  ko: "스크롤",
  zh: "向下滑动",
};

const ScrollCue = ({
  variant = "A",
  visible = false,
  onClick,
  languageCode = "en",
  label,
  ariaLabel = "Scroll to next section",
  tone = "",
}) => {
  const normalizedVariant = String(variant || "A").toUpperCase();
  const cueLabel = label || fallbackLabels[languageCode] || fallbackLabels.en;

  return (
    <button
      type="button"
      className={`scroll-cue scroll-cue--${normalizedVariant} ${tone ? `scroll-cue--${tone}` : ""} ${
        visible ? "is-visible" : ""
      }`}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {normalizedVariant === "A" && <span className="scroll-cue-a-fade" aria-hidden="true" />}
      {normalizedVariant === "A" && (
        <span className="scroll-cue-a-icon" aria-hidden="true">
          <span />
          <span />
        </span>
      )}
      {normalizedVariant === "B" && (
        <span className="scroll-cue-b-wrap" aria-hidden="true">
          <span className="scroll-cue-b-label">{cueLabel}</span>
          <span className="scroll-cue-b-line" />
          <span className="scroll-cue-b-chevron">⌄</span>
        </span>
      )}
      {normalizedVariant === "C" && (
        <span className="scroll-cue-c-wrap" aria-hidden="true">
          <span className="scroll-cue-c-dot" />
          <span className="scroll-cue-c-dot" />
          <span className="scroll-cue-c-dot" />
          <span className="scroll-cue-c-chevron">⌄</span>
        </span>
      )}
    </button>
  );
};

export default ScrollCue;
