import { useCallback, useMemo } from 'react';
import './RangeSlider.css';

export default function RangeSlider({ min, max, value, step = 1, minGap = 0, onChange, formatLabel = String }) {
  const span = Math.max(max - min, 1);
  const lowPct = useMemo(() => ((value.min - min) / span) * 100, [value.min, min, span]);
  const highPct = useMemo(() => ((value.max - min) / span) * 100, [value.max, min, span]);

  const handleLow = useCallback((e) => {
    const next = Math.min(Number(e.target.value), value.max - minGap);
    onChange({ min: Math.max(min, next), max: value.max });
  }, [onChange, value.max, minGap, min]);

  const handleHigh = useCallback((e) => {
    const next = Math.max(Number(e.target.value), value.min + minGap);
    onChange({ min: value.min, max: Math.min(max, next) });
  }, [onChange, value.min, minGap, max]);

  return (
    <div className="range">
      <div className="range__track" aria-hidden="true">
        <div className="range__fill" style={{ left: `${lowPct}%`, width: `${Math.max(highPct - lowPct, 0)}%` }} />
      </div>
      <input type="range" className="range__input range__input--low"
        min={min} max={max} step={step} value={value.min} onChange={handleLow}
        aria-label="Minimum price" aria-valuetext={formatLabel(value.min)} />
      <input type="range" className="range__input range__input--high"
        min={min} max={max} step={step} value={value.max} onChange={handleHigh}
        aria-label="Maximum price" aria-valuetext={formatLabel(value.max)} />
    </div>
  );
}
