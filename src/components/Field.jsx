// Har question ka common wrapper: label + required star + error message
export default function Field({ id, number, label, required, error, children }) {
  return (
    <fieldset className={`field ${error ? "field--error" : ""}`} id={`field-${id}`}>
      <legend className="field__label">
        {number}. {label}
        {required && (
          <span className="field__star" aria-hidden="true">
            {" "}*
          </span>
        )}
      </legend>
      {children}
      {error && (
        <p className="field__error" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
