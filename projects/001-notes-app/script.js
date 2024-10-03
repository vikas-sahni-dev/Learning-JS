const createNotesButton = document.querySelector("#create-notes-buttton");
const notesContainer = document.querySelector("#notes-container");
const data = JSON.parse(localStorage.getItem("data")) || {};
const dataObjKeys = Object.keys(data);
let noteCount = +dataObjKeys[dataObjKeys.length - 1] || 0;

const createNoteBox = (id) => {
  const div = document.createElement("div");
  div.classList.add(
    "max-w-sm",
    "w-full",
    "h-96",
    "border-white",
    "border-2",
    "relative",
    "rounded-2xl"
  );
  div.innerHTML = `<textarea class="w-full h-full resize-none p-4 rounded-2xl border-none outline-none" placeholder="Write..."></textarea>
                    <img class="w-8  absolute right-4 bottom-4" src="./images/delete.png" alt="delete-btn">
                     <span style="display:none" class="bg-[#892CE8] text-white text-[10px] px-2 py-1 text-center rounded-full absolute right-1 bottom-14">deleted</span>                    
                    `;
  notesContainer.prepend(div);
  div.id = id;

  data[div.id] = data[div.id] || "";
  localStorage.setItem("data", JSON.stringify(data));
  if (data[div.id]) {
    div.querySelector("textarea").value = data[div.id];
  }
  div.addEventListener("input", (e) => {
    data[div.id] = e.target.value;
    localStorage.setItem("data", JSON.stringify(data));
  });

  const deleteButton = div.querySelector("img");
  deleteButton.addEventListener("click", () => {
    delete data[deleteButton.parentElement.id];
    localStorage.setItem("data", JSON.stringify(data));
    deleteButton.nextElementSibling.style.display = "block";
    setTimeout(() => {
      deleteButton.parentElement.remove();
    }, 150);
  });
};

dataObjKeys.forEach((key) => {
  createNoteBox(key);
});

createNotesButton.addEventListener("click", () => {
  createNoteBox(++noteCount);
});


