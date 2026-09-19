
    // =========================
    // SELECT ELEMENTS
    // =========================

    const titleInput = document.querySelector("#title");
    const descriptionInput = document.querySelector("#description");
    const addBtn = document.querySelector("#addBtn");
    const searchInput = document.querySelector("#search");
    const notesContainer = document.querySelector("#notesContainer");


    // =========================
    // GET NOTES FROM LOCALSTORAGE
    // =========================

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
 

    let editId = null;


    // =========================
    // SAVE NOTES
    // =========================

    function saveNotes() {

      localStorage.setItem("notes", JSON.stringify(notes));

    }


    // =========================
    // DISPLAY NOTES
    // =========================

    function displayNotes(notesToDisplay = notes) {

      notesContainer.innerHTML = "";

      if (notesToDisplay.length === 0) {

        notesContainer.innerHTML = `
          <p class="empty">No notes found.</p>
        `;

        return;
      }


      notesToDisplay.forEach((note) => {

        const noteCard = document.createElement("div");

        noteCard.classList.add("note");

        noteCard.innerHTML = `
          <h2>${note.title}</h2>

          <p>${note.description}</p>

          <div class="date">
            ${note.date}
          </div>

          <button class="edit" onclick="editNote(${note.id})">
            Edit
          </button>

          <button class="delete" onclick="deleteNote(${note.id})">
            Delete
          </button>
        `;

        notesContainer.appendChild(noteCard);

      });

    }


    // =========================
    // ADD NOTE
    // =========================

    addBtn.addEventListener("click", function () {

      const title = titleInput.value.trim();
      const description = descriptionInput.value.trim();


      if (title === "" || description === "") {

        alert("Please enter title and description.");

        return;
      }


      // =========================
      // EDIT MODE
      // =========================

      if (editId !== null) {

        notes = notes.map(function (note) {

          if (note.id === editId) {

            return {
              ...note,
              title: title,
              description: description
            };

          }

          return note;

        });

        editId = null;

        addBtn.innerText = "Add Note";

      }


      // =========================
      // ADD MODE
      // =========================

      else {

        const newNote = {

          id: Date.now(),

          title: title,

          description: description,

          date: new Date().toLocaleString()

        };


        notes.push(newNote);

      }


      saveNotes();

      displayNotes();

      clearInputs();

    });


    // =========================
    // DELETE NOTE
    // =========================

    function deleteNote(id) {

      notes = notes.filter(function (note) {

        return note.id !== id;

      });


      saveNotes();

      displayNotes();

    }


    // =========================
    // EDIT NOTE
    // =========================

    function editNote(id) {

      const note = notes.find(function (note) {

        return note.id === id;

      });


      if (!note) return;


      titleInput.value = note.title;

      descriptionInput.value = note.description;


      editId = id;

      addBtn.innerText = "Update Note";


      titleInput.focus();

    }


    // =========================
    // SEARCH NOTES
    // =========================

    searchInput.addEventListener("input", function () {

      const searchValue = searchInput.value.toLowerCase();


      const filteredNotes = notes.filter(function (note) {

        return (
          note.title.toLowerCase().includes(searchValue) ||
          note.description.toLowerCase().includes(searchValue)
        );

      });


      displayNotes(filteredNotes);

    });


    // =========================
    // CLEAR INPUTS
    // =========================

    function clearInputs() {

      titleInput.value = "";

      descriptionInput.value = "";

    }


    // =========================
    // INITIAL DISPLAY
    // =========================

    displayNotes();
