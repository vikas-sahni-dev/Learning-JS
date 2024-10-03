const createNotesButton = document.querySelector("#create-notes-buttton");
const notesContainer = document.querySelector("#notes-container");
const data = JSON.parse(localStorage.getItem("data")) || {};
const dataObjKeys = Object.keys(data);
let noteCount = +dataObjKeys[dataObjKeys.length - 1] || 0;

const createNoteBox = (id) => {
  const div = document.createElement("div");
  div.classList.add("w-96", "h-96", "border-black", "border-2", "relative");
  div.innerHTML = `<textarea class="w-full h-full resize-none p-4" placeholder="Write..."></textarea>
                    <img class="w-8  absolute right-4 bottom-4" src="./images/delete.png" alt="delete-btn">`;
  notesContainer.prepend(div);
  div.id = id;

  data[div.id] = data[div.id] || "";
  localStorage.setItem("data", JSON.stringify(data));
  if(data[div.id]){
    div.querySelector("textarea").value=data[div.id]

  }
  div.addEventListener("input", (e) => {
    console.log("vikas");
    data[div.id] = e.target.value;
    localStorage.setItem("data", JSON.stringify(data));
  });

  const deleteButton = div.querySelector("img");
  deleteButton.addEventListener("click", () => {
    delete data[deleteButton.parentElement.id];
    localStorage.setItem("data", JSON.stringify(data));

    deleteButton.parentElement.remove();
  });
};

console.log(dataObjKeys);

dataObjKeys.forEach((key) => {
  // console.log(key);
  createNoteBox(key);
  // const div = document.createElement("div");

  // div.classList.add("w-96", "h-96", "border-black", "border-2", "relative");
  // div.innerHTML = `<textarea class="w-full h-full resize-none p-4" name="" id="" placeholder="Write..."></textarea>
  //                  <img class="w-8  absolute right-4 bottom-4" src="./images/delete.png" alt="">`;
  //         div.querySelector("textarea").value=data[key]

  // notesContainer.prepend(div);
});

createNotesButton.addEventListener("click", () => {
  createNoteBox(++noteCount);
});
