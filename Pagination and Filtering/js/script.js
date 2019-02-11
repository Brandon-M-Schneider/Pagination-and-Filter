/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

const mainDiv = document.querySelector("div.page");
const mainUl = mainDiv.querySelector("ul.student-list")
const students = mainUl.children;
const itemsPerPage = 10;
const totalPages = Math.ceil(students.length / itemsPerPage);
const pageHeader = document.getElementsByClassName("page-header cf")[0];
const studentNames = mainUl.getElementsByTagName("h3")

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

const showPageOfTen = (list, page) => {
   for (let i = 0; i < list.length; i++) {
      const first = (page - 1) * itemsPerPage;
      const last = first + 9
      if (i >= first && i <= last) {
         list[i].style.display = "block";
      } else {
         list[i].style.display = "none";
      }
   }
}
showPageOfTen(students, 1);


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

const appendPaginationLinks = (list) => {

   const newDiv = document.createElement("div");
   newDiv.className = "pagination";
   mainDiv.appendChild(newDiv);

   const newUl = document.createElement("ul");
   newDiv.appendChild(newUl);

   for (let j = 0; j < totalPages; j++) {
      let newLi = document.createElement("li");
      let newA = document.createElement("a");
      newA.textContent = j + 1;
      newA.href = "#";
      newUl.appendChild(newLi);
      newLi.appendChild(newA);
   }

   const initialLink = newUl.querySelector("a[href]:first-child");
   initialLink.className = "active";

   function removeClass() {
      const links = newUl.querySelectorAll("a[href]");
      for (let j = 0; j < totalPages; j++) {
         links[j].className = "";
      }
   }

   document.addEventListener("click", (event) => {
      if (event.target.tagName == "A") {
         showPageOfTen(list, event.target.textContent)
         removeClass();
         event.target.className = "active"
      }
   })

}

appendPaginationLinks(students);

// Search component

const searchDiv = document.createElement("div");
searchDiv.className = "student-search"
pageHeader.appendChild(searchDiv);

const createInput = document.createElement("input");
createInput.id = "search";
createInput.placeholder = "Search Students";
searchDiv.appendChild(createInput)

const createButton = document.createElement("button");
createButton.id = "enter";
createButton.textContent = "Search";
searchDiv.appendChild(createButton);


function searchStudents() {
   for (i = 0; i < students.length; i++) {
      let search = document.getElementById("search")
      let filter = search.value.toUpperCase();
      let names = studentNames[i].textContent;
      if (names.toUpperCase().indexOf(filter) > -1) {
         studentNames[i].parentNode.parentNode.style.display = "block"
      } else {
         studentNames[i].parentNode.parentNode.style.display = "none";
      } 
      if (filter === "") {
         showPageOfTen(students, 1);
      }
  }
}


const runStudentSearch = document.getElementsByClassName("student-search")[0];
runStudentSearch.addEventListener("keyup", (event) => {
   if (event.target.tagName == "INPUT") {
      searchStudents();
   }
})



// Remember to delete the comments that came with this file, and replace them with your own code comments.