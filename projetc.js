let add = document.getElementById("add");
let textarea = document.getElementById("textarea");
let save = document.getElementById("save");
let cancel = document.getElementById("cancel");
let outputs = document.getElementById("outputnotes");
let container = document.getElementById("container");

// Show textarea when Add button clicked
function addnotes() {
    textarea.style.display = "block";
    textarea.focus();
}

// Save note to localStorage and update UI
function saves() {
    if (textarea.value.trim() === "") {
        alert("enter the notes first");
        return;
    }

    // Get existing notes or empty array
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    // Add new note to array
    notes.push(textarea.value.trim());

    // Save updated notes array
    localStorage.setItem("notes", JSON.stringify(notes));

    // Clear and hide textarea
    textarea.value = "";
    textarea.style.display = "none";

    // Show notes
    displayNotes();
}

// Display all saved notes from localStorage
function displayNotes() {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    container.innerHTML = "";

    if (notes.length === 0) {
        outputs.style.display = "none";  // Hide notes section if no notes
        return;
    }

    // Show notes container
    outputs.style.display = "block";

    notes.forEach((note, index) => {
        let para = document.createElement("p");
        para.innerHTML = note + ` <button onclick="deleteNote(${index})">Delete</button>`;
        container.appendChild(para);
    });
}

// Delete a specific note by index
function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);  // remove the note
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}

// Delete all notes and clear UI
function deletes() {
    localStorage.removeItem("notes");
    container.innerHTML = "";
    outputs.style.display = "none";
}

// Cancel adding note: clear and hide textarea
function cancelling() {
    textarea.value = "";
    textarea.style.display = "none";
}

// Run when page loads: display notes and hide textarea
window.onload = function () {
    displayNotes();
    textarea.style.display = "none";
};
