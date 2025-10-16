// ui.js - main UI wiring (module)
import { getAll, addRecord, updateRecord, deleteRecord, setRecords } from './state.js';
import { validateRecord } from './validators.js';
import { compileRegex, highlight } from './search.js';

const form = document.getElementById('record-form');
const tbody = document.querySelector('#records-table tbody');
const totalRecordsEl = document.getElementById('total-records');
const totalSpentEl = document.getElementById('total-spent');
const formError = document.getElementById('form-error');
const searchInput = document.getElementById('search-input'); // optional search input

let editingId = null; // tracks which record is being edited
let currentRegex = null; // stores compiled regex for search highlight

// Render table rows
function renderTable() {
  const items = getAll();

  const rows = items.map(rec => {
    return `<tr data-id="${rec.id}">
      <td>${highlight(rec.description, currentRegex)}</td>
      <td>${rec.amount.toFixed(2)}</td>
      <td>${rec.category}</td>
      <td>${rec.date}</td>
      <td>
        <button class="edit">Edit</button>
        <button class="del">Delete</button>
      </td>
    </tr>`;
  }).join('');
  tbody.innerHTML = rows;
  updateStats();
}

// Update dashboard stats
function updateStats() {
  const items = getAll();
  totalRecordsEl.textContent = items.length;
  const sum = items.reduce((s, r) => s + Number(r.amount || 0), 0);
  totalSpentEl.textContent = sum.toFixed(2);
}

// Form submit (add or edit)
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newRec = {
    description: document.getElementById('description').value.trim(),
    amount: Number(document.getElementById('amount').value),
    category: document.getElementById('category').value,
    date: document.getElementById('date').value
  };

  const errors = validateRecord(newRec);
  if (errors.length) {
    formError.textContent = errors.join('; ');
    return;
  }

  if (editingId) {
    // Update existing record
    updateRecord(editingId, {
      ...newRec,
      updatedAt: new Date().toISOString()
    });
    editingId = null; // reset editing flag
  } else {
    // Add new record
    addRecord({
      ...newRec,
      id: `txn_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }

  form.reset();
  formError.textContent = '';
  renderTable();
  document.getElementById('description').focus();
});

// Event delegation for edit/delete buttons
tbody.addEventListener('click', (e) => {
  const tr = e.target.closest('tr');
  if (!tr) return;
  const id = tr.dataset.id;

  if (e.target.classList.contains('del')) {
    if (confirm('Delete this record?')) {
      deleteRecord(id);
      renderTable();
    }
  } else if (e.target.classList.contains('edit')) {
    const rec = getAll().find(r => r.id === id);
    if (rec) {
      document.getElementById('description').value = rec.description;
      document.getElementById('amount').value = rec.amount;
      document.getElementById('category').value = rec.category;
      document.getElementById('date').value = rec.date;
      editingId = id; // track record being edited
      document.getElementById('description').focus();
    }
  }
});

// Live regex search (optional)
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const pattern = e.target.value;
    currentRegex = compileRegex(pattern);
    renderTable();
  });
}
//  Clear search button functionality
if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    currentRegex = null;
    renderTable();
    searchInput.focus();
  });
}
// Initial render on page load
document.addEventListener('DOMContentLoaded', () => {
  renderTable();
});
