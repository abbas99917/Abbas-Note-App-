    const titleInput = document.querySelector("#title");
    const descriptionInput = document.querySelector("#description");
    const addBtn = document.querySelector("#addBtn");
    const searchInput = document.querySelector("#search");
    const notesContainer = document.querySelector("#notesContainer");


   
    
    let editingNoteId = null;
    let noteArr = JSON.parse(localStorage.getItem("notes")) || [];


    // store in localstorage

    const saveNotesToLocalStorage = () => {
    localStorage.setItem("notes", JSON.stringify(noteArr));
};


    // ========================================= /////////////////// ===============================//
    // showNotes()
    const showNotes = () => {

  if(titleInput.value.trim() ==="" || descriptionInput.value.trim() === ""){
    alert("Please enter title and description.")
    return
  }

    let title = titleInput.value;
    let desc = descriptionInput.value;

    if (editingNoteId !== null) {

        let note = noteArr.find((curElem) => {
            return curElem.id === editingNoteId;
        });

        note.title = title;
        note.desc = desc;
        saveNotesToLocalStorage();

        editingNoteId = null;
        addBtn.innerHTML = "Add Note";

    } else {

        let note = {
            id: Date.now(),
            title: title,
            desc: desc,
            date: new Date().toLocaleString()
        };

        noteArr.push(note);
        saveNotesToLocalStorage()

        
    }
    titleInput.value = "";
    descriptionInput.value = "";

    displayNotesOnScreen();
};
// date
// let date = new Date().toLocaleString()

const displayNotesOnScreen = (notes = noteArr) => {

    notesContainer.innerHTML = "";
    notes.forEach((curElem) => {
        let noteCard = document.createElement("div");
        noteCard.classList.add("note");
        noteCard.innerHTML = `
            <h2>${curElem.title}</h2>
            <p>${curElem.desc}</p>

            <div class="date">
                ${curElem.date}
            </div>

            <button class="edit" onclick="editNote(${curElem.id})">
                Edit
            </button>

            <button class="delete" onclick="deleteNote(${curElem.id})">
                Delete
            </button>
        `;

        notesContainer.appendChild(noteCard);
    });
};


    // editNote delete note
    const deleteNote = (id)=>{
    noteArr = noteArr.filter((curElem)=>{
    return curElem.id !== id;
    })
    saveNotesToLocalStorage();
    displayNotesOnScreen()
    }


  //editNote()
  const editNote = (id) =>{
  editingNoteId = id;
  let note =   noteArr.find((curElem)=>{
  return  curElem.id === editingNoteId;

})
    titleInput.value = note.title;
    descriptionInput.value = note.desc;
    addBtn.innerHTML = "Update";
   

  }


  // search-note

    searchInput.addEventListener("input", () => { 

        let searchValue = searchInput.value .toLowerCase() .trim();

         let filteredNotes = noteArr.filter((curElem) => {
         return ( curElem.title.toLowerCase().includes(searchValue) || curElem.desc.toLowerCase().includes(searchValue)); 

        });
         displayNotesOnScreen(filteredNotes);
    });


    addBtn.addEventListener("click", showNotes)
    displayNotesOnScreen();