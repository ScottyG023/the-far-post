// Generic form handler — validates inputs, then opens a pre-filled mailto
// to thefarpost@mwfa.com.au with the form contents in the email body.
//
// No backend needed. Works on any static host.

(function () {
  const script = document.currentScript;
  const formId = script.dataset.form;
  const subject = script.dataset.subject || 'The Far Post – Enquiry';
  const recipient = script.dataset.to || 'thefarpost@mwfa.com.au';
  if (!formId) return;

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById(formId);
    const success = document.getElementById('formSuccess');
    const submitBtn = document.getElementById('submitBtn');
    if (!form) return;

    const fields = form.querySelectorAll('.field-input, .field-select, .field-textarea');
    fields.forEach((f) => {
      f.addEventListener('input', () => f.classList.remove('is-invalid'));
      f.addEventListener('blur', () => validateField(f));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let valid = true;
      fields.forEach((f) => { if (!validateField(f)) valid = false; });
      if (!valid) {
        const firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      // Build email body from form fields
      const data = new FormData(form);
      const lines = ['Hi The Far Post team,', ''];
      const labelMap = labelsFor(form);
      for (const [k, v] of data.entries()) {
        if (!v) continue;
        const label = labelMap[k] || k;
        lines.push(`${label}: ${v}`);
      }
      lines.push('', 'Thanks!');
      const body = lines.join('\n');

      const url = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = url;

      // Show success state after a short delay (the mail client will have opened)
      setTimeout(() => {
        if (success) {
          form.style.display = 'none';
          success.classList.add('show');
          success.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 400);
    });

    function validateField(field) {
      const isValid = field.checkValidity() && (field.value || !field.required);
      field.classList.toggle('is-invalid', !isValid);
      return isValid;
    }

    // Pull the human-readable label out of each field's <label>
    function labelsFor(form) {
      const map = {};
      form.querySelectorAll('label.field-label').forEach((lbl) => {
        const targetId = lbl.getAttribute('for');
        if (!targetId) return;
        const text = lbl.textContent.replace(/\*/g, '').trim();
        map[targetId] = text;
      });
      return map;
    }
  });
})();
