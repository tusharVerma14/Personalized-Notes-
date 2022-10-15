displayNotes();
    let addBtn = document.getElementById('addBtn');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    addBtn.addEventListener('click', function () {
      // A string 
      let a = new Date();
      let day = a.toLocaleDateString(undefined, options);
      let date = String(a.getHours()).padStart(2, '0') + ":" + String(a.getMinutes()).padStart(2, '0') + ":" + String(a.getSeconds()).padStart(2, '0');

      let addTxt = document.getElementById('addTxt');
      let addTitle = document.getElementById('addTitle');
      let currDay = day;
      let currDate = date;

      let notes = localStorage.getItem("notes");
      if (notes == null) {
        notesArr = [];
      }
      else {
        notesArr = JSON.parse(notes);
      }
      // new added below one
      let myObj = {
        title: addTitle.value,
        text: addTxt.value,
        day: currDay,
        date: currDate
      }
      // notesArr.push(addTxt.value);
      notesArr.push(myObj);

      localStorage.setItem("notes", JSON.stringify(notesArr));
      addTxt.value = "";
      addTitle.value = "";
      // console.log(notesArr);
      displayNotes();
    });

    function displayNotes() {
      let notes = localStorage.getItem("notes");
      if (notes == null) {
        notesArr = [];
      }
      else {
        notesArr = JSON.parse(notes);
      }
      let toDisplay = "";

      notesArr.forEach(function (element, index) {

        toDisplay += `
        <div class="notesCard card my-2 mx-2" style="width: 18rem;border:1px solid black">
        <div class="card-body">
        <h5 class="card-title">${index + 1} . <span style="text-decoration:underline ;text-transform:uppercase">${element.title}<span><span style="float:right ;margin-top:-15px;margin-right:-30px">
        <button id="${index}" onclick="deleteNode(this.id)"class="btn btn" style="display:inline-block"><img src="close-button-png-30225.png" height="18px" alt=""></button></span></h5>
        
        <p class="card-text" style="max-height:200px;overflow-y:scroll">${element.text}</p>
        <div style="position:relative">
       
        </div>
        </div>
        <footer>
        <span>
        <div style="font-size:10px ;border-top:2px solid black;">
        ${element.day}
        </div>
        <div>
        ${element.date}  
        </div>
        </span>
        </footer>
        </div>`;
      });
      if (notesArr.length != 0) {
        document.getElementById('Notes').innerHTML = toDisplay;
      }
      else {
        document.getElementById('Notes').innerHTML = `<h2>No Notes Added </h2>`;
      }
    }

    function deleteNode(index) {
      let notes = localStorage.getItem("notes");
      if (notes == null) {
        notesArr = [];
      }
      else {
        notesArr = JSON.parse(notes);
      }
      notesArr.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notesArr));
      displayNotes();
    }

    let search = document.getElementById('searchTxt');
    search.addEventListener('input', function () {
      let searchVal = search.value.toLowerCase();
      let notesCard = document.getElementsByClassName('notesCard');
      Array.from(notesCard).forEach(function (element) {
        let para = element.getElementsByTagName('p')[0].innerText;
        if (para.includes(searchVal)) {
          element.style.display = "block";
        }
        else {
          element.style.display = "none";
        }

      })
    })
