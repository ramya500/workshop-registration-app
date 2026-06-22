import React, { useState } from 'react';
import './ParticipantList.css';

function ParticipantList({ participants }) {
  const [search, setSearch] = useState('');
  const [filterWorkshop, setFilterWorkshop] = useState('all');

  const workshops = [...new Set(participants.map((p) => p.workshopLabel))];

  const filtered = participants.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filterWorkshop === 'all' || p.workshopLabel === filterWorkshop;
    return matchSearch && matchFilter;
  });

  if (participants.length === 0) {
    return (
      <div className="list-card empty-state">
        <div className="empty-icon">◻</div>
        <h3>No participants yet</h3>
        <p>Registrations will appear here once someone signs up.</p>
      </div>
    );
  }

  return (
    <div className="list-card">
      <div className="list-header">
        <div>
          <h2 className="list-title">Participants</h2>
          <p className="list-count">{participants.length} registered</p>
        </div>
      </div>

      {/* Filters */}
      <div className="list-controls">
        <input
          type="text"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select
          value={filterWorkshop}
          onChange={(e) => setFilterWorkshop(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Workshops</option>
          {workshops.map((w) => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <p className="no-results">No participants match your search.</p>
      ) : (
        <div className="table-wrapper">
          <table className="participants-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Workshop</th>
                <th>Level</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id}>
                  <td className="row-num">{i + 1}</td>
                  <td className="name-cell">{p.name}</td>
                  <td className="email-cell">{p.email}</td>
                  <td>
                    <span className="workshop-tag">{p.workshopLabel}</span>
                  </td>
                  <td>
                    <span className={`level-badge level-${p.experience}`}>
                      {p.experience}
                    </span>
                  </td>
                  <td className="date-cell">{p.workshopDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ParticipantList;
