import { useMemo, useState } from "react";
import Field from "./components/Field.jsx";
import RatingField from "./components/RatingField.jsx";
import {
  usageOptions,
  lastUsedOptions,
  ratingQuestions,
} from "./data/questions.js";

const initialValues = {
  bestOffice: "",
  whyBest: "",
  usage: "",
  lastUsed: "",
  country: "",
  agree: false,
  email: "",
  ...Object.fromEntries(ratingQuestions.map((q) => [q.id, ""])),
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function App() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const setValue = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValue(name, type === "checkbox" ? checked : value);
  };

  // Progress: kitne required questions ho gaye
  const progress = useMemo(() => {
    const requiredKeys = [
      "bestOffice",
      "whyBest",
      "usage",
      "lastUsed",
      ...ratingQuestions.filter((q) => q.required).map((q) => q.id),
      "country",
      "email",
    ];
    const done = requiredKeys.filter((k) => String(values[k]).trim() !== "").length;
    return { done, total: requiredKeys.length + 1 }; // +1 for terms checkbox
  }, [values]);

  const progressDone = progress.done + (values.agree ? 1 : 0);

  const validate = () => {
    const e = {};
    const msg = "This question is required.";

    if (!values.bestOffice.trim()) e.bestOffice = msg;
    if (!values.whyBest.trim()) e.whyBest = msg;
    if (!values.usage) e.usage = "Please choose one option.";
    if (!values.lastUsed) e.lastUsed = "Please select an option.";

    ratingQuestions.forEach((q) => {
      if (q.required && !values[q.id]) e[q.id] = "Please give a rating from 1 to 5.";
    });

    if (!values.country.trim()) e.country = msg;
    if (!values.agree) e.agree = "You need to agree to the Terms and Conditions.";

    if (!values.email.trim()) e.email = msg;
    else if (!emailPattern.test(values.email.trim()))
      e.email = "Enter a valid email address.";

    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const found = validate();
    setErrors(found);

    const firstKey = Object.keys(found)[0];
    if (firstKey) {
      document
        .getElementById(`field-${firstKey}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // Yahan apni API call laga sakte ho (fetch / axios)
    console.log("Survey submitted:", values);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
    setSubmitted(false);
  };

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <div className="logo" aria-hidden="true">
            {/* <span>SKYTRAX</span> */}
          </div>
          <div className="site-header__text">
            <p className="site-header__title">Office Picnic Form</p>
            {/* <p className="site-header__sub">World Office Awards</p> */}
          </div>
        </div>
      </header>

      <main className="page">
        <h1 className="page__title">Vote here for the World's Best Office</h1>

        {submitted ? (
          <section className="success" role="status">
            <h2>Thank you for voting</h2>
            <p>
              Your survey has been submitted. Only one entry is allowed for each
              survey subject.
            </p>
            <button type="button" className="btn" onClick={handleReset}>
              Fill the survey again
            </button>
          </section>
        ) : (
          <form className="survey" onSubmit={handleSubmit} noValidate>
            <p className="survey__intro">
              Please only complete the survey if you have visited or worked in this
              office in the last 12 months.
            </p>

            <div className="progress" aria-live="polite">
              <div className="progress__bar">
                <div
                  className="progress__fill"
                  style={{ width: `${(progressDone / progress.total) * 100}%` }}
                />
              </div>
              <span className="progress__text">
                {progressDone} of {progress.total} required answers
              </span>
            </div>

            {/* 1 */}
            <Field
              id="bestOffice"
              number={1}
              label="Which Office do you consider to be the best?"
              required
              error={errors.bestOffice}
            >
              <input
                className="input"
                type="text"
                name="bestOffice"
                value={values.bestOffice}
                onChange={handleChange}
              />
            </Field>

            {/* 2 */}
            <Field
              id="whyBest"
              number={2}
              label="Why have you named this as the Best Office?"
              required
              error={errors.whyBest}
            >
              <input
                className="input"
                type="text"
                name="whyBest"
                value={values.whyBest}
                onChange={handleChange}
              />
            </Field>

            {/* 3 */}
            <Field
              id="usage"
              number={3}
              label="What is your typical use of this office?"
              required
              error={errors.usage}
            >
              <div className="choices">
                {usageOptions.map((opt) => (
                  <label key={opt} className="choice">
                    <input
                      type="radio"
                      name="usage"
                      value={opt}
                      checked={values.usage === opt}
                      onChange={handleChange}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </Field>

            {/* 4 */}
            <Field
              id="lastUsed"
              number={4}
              label="When did you last use this office?"
              required
              error={errors.lastUsed}
            >
              <select
                className="input"
                name="lastUsed"
                value={values.lastUsed}
                onChange={handleChange}
              >
                <option value="">- Select -</option>
                {lastUsedOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </Field>

            <p className="survey__rate-note">
              Please rate your experience(s) for this Office, using: 5 = Excellent
              / 1 = Very poor
            </p>

            {/* 5 - 35 */}
            {ratingQuestions.map((q) => (
              <RatingField
                key={q.id}
                question={q}
                value={values[q.id]}
                error={errors[q.id]}
                onChange={setValue}
              />
            ))}

            {/* 36 */}
            <Field
              id="country"
              number={36}
              label="The country where you live"
              required
              error={errors.country}
            >
              <input
                className="input"
                type="text"
                name="country"
                value={values.country}
                onChange={handleChange}
              />
            </Field>

            {/* Terms */}
            <fieldset
              className={`field ${errors.agree ? "field--error" : ""}`}
              id="field-agree"
            >
              <legend className="field__label field__label--plain">
                It is important that you know and understand exactly how we will use
                the data you submit in this form, and why we ask for this
                information. Please let us know that you have read the{" "}
                <a href="#terms" onClick={(e) => e.preventDefault()}>
                  Terms and Conditions
                </a>{" "}
                and that you're happy to proceed.
                <span className="field__star"> *</span>
              </legend>
              <label className="choice">
                <input
                  type="checkbox"
                  name="agree"
                  checked={values.agree}
                  onChange={handleChange}
                />
                <span>I confirm that I agree to the Terms and Conditions</span>
              </label>
              {errors.agree && (
                <p className="field__error" role="alert">
                  {errors.agree}
                </p>
              )}
            </fieldset>

            {/* Email */}
            <div
              className={`field ${errors.email ? "field--error" : ""}`}
              id="field-email"
            >
              <label className="field__label" htmlFor="email">
                Email<span className="field__star"> *</span>
              </label>
              <div className="email-wrap">
                <span className="email-wrap__icon" aria-hidden="true">
                  ✉
                </span>
                <input
                  id="email"
                  className="input input--email"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p className="field__error" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <p className="survey__important">
              IMPORTANT: Users are allowed to submit one entry for each survey
              subject. By submitting this survey you confirm you do not work for (or
              have previously worked for) the office nominated
            </p>

            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        )}
      </main>

      <footer className="site-footer">
        {/* <p>© {new Date().getFullYear()} Skytrax. All rights reserved.</p> */}
      </footer>
    </>
  );
}
