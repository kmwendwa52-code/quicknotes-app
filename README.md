# QuickNotes

QuickNotes is a simple note-taking web app built with plain HTML, CSS and JavaScript. You can write short notes, give each one a category (Personal, Work or Study), search through them and delete the ones you no longer need. Your notes are saved in the browser, so they are still there after you refresh the page.

## Features

- Add a note with a category (Personal, Work or Study)
- Each note shows its text, a category label, the date and time it was created, and a Delete button
- Validation: empty notes and notes over 200 characters show an error message
- Delete any single note
- Live search that ignores upper and lower case
- A note count that reads correctly for zero, one and many notes
- Notes are saved with localStorage and restored when the page loads
- Responsive layout: the form stacks vertically on screens 600px wide or narrower

## How to run it locally

1. Clone the repository:
   ```bash
   git clone https://github.com/kmwendwa52-code/quicknotes-app.git
   ```
2. Open the `quicknotes-app` folder in VS Code.
3. Right-click `index.html` and choose **Open with Live Server**, or simply double-click `index.html` to open it in your browser.

No installation or build step is needed.

## What I learned

- How to build a page from the DOM up with `createElement` and `textContent`, which keeps user text safe compared with `innerHTML`.
- How to keep data in an array of objects and rebuild the screen from it with one `render()` function every time something changes.
- How `localStorage` only stores text, so arrays have to be converted with `JSON.stringify` and `JSON.parse`.
- How to use Flexbox for the form and a media query so the layout works on a phone.
- How to make small, clear Git commits as each feature is finished.
