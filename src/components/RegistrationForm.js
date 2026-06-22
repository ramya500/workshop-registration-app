import React, { useState } from 'react';
import './RegistrationForm.css';

const WORKSHOPS = [
  { id: 'react-basics', label: 'React Fundamentals', date: 'Jul 5, 2026', seats: 20 },
  { id: 'node-api',     label: 'Node.js & REST APIs',  date: 'Jul 12, 2026', seats: 15 },
  { id: 'ui-ux',       label: 'UI/UX Design Sprint',   date: 'Jul 19, 2026', seats: 12 },
  { id: 'data-python', label: 'Data Analysis w/ Python', date: 'Jul 26, 2026', seats: 18 },
];

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  workshop: '',
  experience: 'beginner',
};

function RegistrationForm({ onRegister, isDuplicate, onViewList }) {
  const [form, setForm]       = useState(INITIAL_FORM);
  const [errors, setErrors]   = useState({});
  const [status, setStatus]   = useState(null); // 'success' | 'duplicate' | null
  const [confirmed, setConfirmed] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name     = 'Full name is required.';
    if (!form.email.trim())   e.email    = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                              e.email    = 'Enter a valid email address.';
    if (!form.phone.trim())   e.phone    = 'Phone number is required.';
    else if (!/^\d{7,15}$/.test(form.phone.replace(/[\s\-+]/g, '')))
                              e.phone    = 'Enter a valid phone number.';
    if (!form.workshop)       e.workshop = 'Please select a workshop.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setStatus(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    if (isDuplicate(form.email)) {
      setStatus('duplicate');
      return;
    }

    const workshop = WORKSHOPS.find((w) => w.id === form.workshop);
    const participant = {
      ...form,
      workshopLabel: workshop.label,
      workshopDate:  workshop.date,
      registeredAt:  new Date().toLocaleString(),
      id:            Date.now(),
    };

    onRegister(participant);
    setConfirmed(participant);
    setStatus('success');
    setForm(INITIAL_FORM);
  };

  if (status === 'success' && confirmed) {
    return (
      <div className="confirmation-card">
        <div className="confirm-icon">✓</div>
        <h2>You're registered!</h2>
        <p className="confirm-sub">A confirmation has been recorded for:</p>
        <div className="confirm-details">
          <div className="detail-row"><span>Name</span><strong>{confirmed.name}</strong></div>
          <div className="detail-row"><span>Email</span><strong>{confirmed.email}</strong></div>
          <div className="detail-row"><span>Workshop</span><strong>{confirmed.workshopLabel}</strong></div>
          <div className="detail-row"><span>Date</span><strong>{confirmed.workshopDate}</strong></div>
          <div className="detail-row"><span>Level</span><strong style={{textTransform:'capitalize'}}>{confirmed.experience}</strong></div>
        </div>
        <div className="confirm-actions">
          <button className="btn-primary" onClick={() => { setStatus(null); setConfirmed(null); }}>
            Register Another
          </button>
          <button className="btn-ghost" onClick={onViewList}>
            View All Participants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-card">
      <h2 className="form-title">Workshop Registration</h2>
      <p className="form-desc">Fill in your details to secure your spot.</p>

      {status === 'duplicate' && (
        <div className="alert alert-error">
          ⚠ This email is already registered. Each email can only register once.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <div className={`field ${errors.name ? 'field-error' : ''}`}>
          <label htmlFor="name">Full Name</label>
          <input
            id="name" name="name" type="text"
            placeholder="e.g. Priya Sharma"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <span className="field-msg">{errors.name}</span>}
        </div>

        {/* Email */}
        <div className={`field ${errors.email ? 'field-error' : ''}`}>
          <label htmlFor="email">Email Address</label>
          <input
            id="email" name="email" type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <span className="field-msg">{errors.email}</span>}
        </div>

        {/* Phone */}
        <div className={`field ${errors.phone ? 'field-error' : ''}`}>
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone" name="phone" type="tel"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="field-msg">{errors.phone}</span>}
        </div>

        {/* Workshop */}
        <div className={`field ${errors.workshop ? 'field-error' : ''}`}>
          <label htmlFor="workshop">Select Workshop</label>
          <select
            id="workshop" name="workshop"
            value={form.workshop}
            onChange={handleChange}
          >
            <option value="">— Choose a workshop —</option>
            {WORKSHOPS.map((w) => (
              <option key={w.id} value={w.id}>
                {w.label} · {w.date} ({w.seats} seats)
              </option>
            ))}
          </select>
          {errors.workshop && <span className="field-msg">{errors.workshop}</span>}
        </div>

        {/* Experience */}
        <div className="field">
          <label>Experience Level</label>
          <div className="radio-group">
            {['beginner', 'intermediate', 'advanced'].map((lvl) => (
              <label key={lvl} className={`radio-option ${form.experience === lvl ? 'selected' : ''}`}>
                <input
                  type="radio" name="experience"
                  value={lvl} checked={form.experience === lvl}
                  onChange={handleChange}
                />
                <span style={{ textTransform: 'capitalize' }}>{lvl}</span>
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="btn-submit">
          Register Now →
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
