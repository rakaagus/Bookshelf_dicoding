const bgModal = document.querySelector(".bg-modal");
const openModal = document.querySelector(".open-modal");
const closeModal = document.querySelector(".close-modal");

const iscompleteCheckbox = document.getElementById("inputBookIsComplete");
const textButtonSubmit = document.getElementById("buttonTextIsComplete");

openModal.addEventListener("click", function () {
  bgModal.classList.add("show");
});

closeModal.addEventListener("click", function () {
  bgModal.classList.remove("show");
});

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("formTambahDataBuku");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    tambahBukuBaru();
  });

  if (periksaStorage()) {
    loadDataDariStorage();
  }
});

iscompleteCheckbox.addEventListener("click", () => {
  if (iscompleteCheckbox.checked === true) {
    textButtonSubmit.innerText = "Sudah Dibaca";
  } else {
    textButtonSubmit.innerText = "Belum Dibaca";
  }
});
