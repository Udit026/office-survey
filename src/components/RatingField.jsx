import Field from "./Field.jsx";
import { ratingScale } from "../data/questions.js";

export default function RatingField({ question, value, error, onChange }) {
  const { id, number, label, required } = question;

  return (
    <Field id={id} number={number} label={label} required={required} error={error}>
      <div className="rating" role="radiogroup" aria-label={label}>
        {ratingScale.map((score) => (
          <label
            key={score}
            className={`rating__option ${value === String(score) ? "is-selected" : ""}`}
          >
            <input
              type="radio"
              name={id}
              value={score}
              checked={value === String(score)}
              onChange={(e) => onChange(id, e.target.value)}
            />
            <span>{score}</span>
          </label>
        ))}
      </div>
    </Field>
  );
}
