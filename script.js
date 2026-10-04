// ---------- Select elements ----------
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

// ---------- Data ----------
let notes = [];

// ---------- Helpers ----------
function capitalise(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
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

  meta.append(label, date, deleteBtn);
  card.append(text, meta);
  return card;
}

function render() {
  notesList.replaceChildren();
  notes.forEach(function (note) {
    notesList.appendChild(createNoteCard(note));
  });
}

// ---------- Add a note ----------
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const note = {
    id: Date.now(),
    text: noteInput.value.trim(),
    category: categorySelect.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.unshift(note);
  noteInput.value = "";
  noteInput.focus();
  render();
});

render();
