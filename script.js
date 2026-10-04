// ---------- Select elements ----------
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const clearAllBtn = document.querySelector("#clear-all-btn");

// ---------- Data ----------
const STORAGE_KEY = "quicknotes-notes";

function loadNotes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (error) {
      // Corrupted data: start with an empty list.
    }
  }
  return [];
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

let notes = loadNotes();

// ---------- Helpers ----------
function capitalise(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function showError(message) {
  errorMessage.textContent = message;
}

function clearError() {
  errorMessage.textContent = "";
}

function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

// Returns the notes that match every word typed in the search box.
function getVisibleNotes() {
  const words = searchInput.value
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  return notes.filter(function (note) {
    const text = note.text.toLowerCase();
    return words.every(function (word) {
      return text.includes(word);
    });
  });
}

// ---------- Delete ----------
function deleteNote(id) {
  notes = notes.filter(function (note) {
    return note.id !== id;
  });
  saveNotes();
  render();
}

// ---------- Render ----------
function createNoteCard(note) {
  const card = document.createElement("li");
  card.classList.add("note-card", `category-${note.category}`);

  const text = document.createElement("p");
  text.classList.add("note-text");
  text.textContent = note.text;

  const meta = document.createElement("div");
  meta.classList.add("note-meta");

  const label = document.createElement("span");
  label.classList.add("category-label");
  label.textContent = capitalise(note.category);

  const date = document.createElement("span");
  date.textContent = note.createdAt;

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function () {
    deleteNote(note.id);
  });

  meta.append(label, date, deleteBtn);
  card.append(text, meta);
  return card;
}

function render() {
  notesList.replaceChildren();

  const visibleNotes = getVisibleNotes();

  if (notes.length > 0 && visibleNotes.length === 0) {
    const message = document.createElement("li");
    message.classList.add("empty-message");
    message.textContent = "No notes match your search.";
    notesList.appendChild(message);
  }

  visibleNotes.forEach(function (note) {
    notesList.appendChild(createNoteCard(note));
  });

  updateCount();
  clearAllBtn.hidden = notes.length === 0;
}

// ---------- Add a note ----------
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();

  if (text === "") {
    showError("Please type a note first.");
    return;
  }
  if (text.length > 200) {
    showError("Notes must be 200 characters or fewer.");
    return;
  }

  clearError();

  const note = {
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.unshift(note);
  saveNotes();

  noteInput.value = "";
  searchInput.value = "";
  noteInput.focus();
  render();
});

// ---------- Clear all (bonus) ----------
clearAllBtn.addEventListener("click", function () {
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
});

// ---------- Search ----------
searchInput.addEventListener("input", render);

render();
