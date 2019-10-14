// Form reference
const form = {}
form.noteText = document.querySelector('#formNoteText');
form.addButton = document.querySelector('#addNote');
form.color = document.querySelector('#formColor');

let editModeId = null;
let ID = 1;

const notes = document.querySelector('#noteList');

form.noteText.focus();

// Functions
function addNote() {
  let text = form.noteText.value;
  let note = document.createElement('div');
  let deleteButton = document.createElement('span');

  note.classList.add('note');
  note.classList.add(form.color.value);
  note.id = `note${ID}`;
  ID++;
  note.innerHTML = `<div class='note-text'>${text}</div>`;
  note.addEventListener('click', function(e) {
    e.preventDefault(); 
    editNote(e);
  });
  
  deleteButton.classList.add('note-delete');
  deleteButton.innerHTML = '&times;';

  note.appendChild(deleteButton);  
  notes.appendChild(note);

  form.noteText.value = '';
  form.noteText.focus();

  addListenerDeleteButton(deleteButton);
}

function addListenerDeleteButton(deleteButton) {
  deleteButton.addEventListener('click', function (e) {
    e.stopPropagation();      
    deleteNote(e);
  });
}

function deleteNote(e) {
  let eventNote = e.target.parentNode;
  eventNote.parentNode.removeChild(eventNote);
}

function editNote(e) {
  editModeId = e.target.parentNode.id;
  const text = e.target.parentNode.querySelector('.note-text').innerHTML;
   
  // in progress
  form.noteText.value = text;
}

function replaceNote() {
  const target = document.querySelector(`#${editModeId}`);
  target.querySelector('.note-text').innerHTML = form.noteText.value;
  target.classList.add(form.color.value);
  editModeId = null;
  form.noteText.value = '';
  form.noteText.focus();
}

// Event Listeners
form.addButton.addEventListener('click', function (e) {
  e.preventDefault();  
  if (form.noteText.value != '') {
    if(!editModeId) {
      addNote();
    } else {
      replaceNote();
    }
  }
});

