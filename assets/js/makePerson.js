const PERSON_KEY = "Person_Bookshelf";
const PERSON_ID = "person_id";
const INFOPENGGUNA_ID = "info-pengguna";
let person = [];

document.addEventListener("DOMContentLoaded", function () {
  const submitPerson = document.getElementById("form-person");
  submitPerson.addEventListener("submit", function (event) {
    event.preventDefault();

    const namaPengguna = document.getElementById("inputName").value;
    const hobiPengguna = document.getElementById("inputHobi").value;

    const newPerson = buatPerson(namaPengguna, hobiPengguna);
    const personInObject = composePersonObject(namaPengguna, hobiPengguna);

    newPerson[PERSON_ID] = personInObject.id;
    person.push(personInObject);

    updatePersonKeStorage();
  });

  periksaStorage();
});

function buatPerson(namaPerson, hobiPerson) {
  const formPerson = document.getElementById("form-person");
  formPerson.classList.remove("d-block");
  formPerson.classList.add("d-none");
  const infoPenggunaAvatar = document.getElementById(INFOPENGGUNA_ID);

  const avatar = document.createElement("div");
  avatar.classList.add("avatar", "d-block");
  const img = document.createElement("img");
  img.setAttribute("src", "assets/img/user-provile.jpg");
  avatar.append(img);

  const userContainer = document.createElement("div");
  userContainer.classList.add("user-profile", "d-block");
  const namaUser = document.createElement("h2");
  namaUser.classList.add("user-name");
  namaUser.innerText = namaPerson;

  const penggunaHobi = document.createElement("p");
  penggunaHobi.classList.add("user-bio");
  penggunaHobi.innerText = " " + hobiPerson;

  userContainer.append(namaUser, penggunaHobi);
  infoPenggunaAvatar.append(avatar, userContainer);
  return infoPenggunaAvatar;
}

function simpanDataPerson() {
  const persedDataPerson = JSON.stringify(person);
  localStorage.setItem(PERSON_KEY, persedDataPerson);
  document.dispatchEvent(new Event("ondatasavedperson"));
}

function updatePersonKeStorage() {
  if (periksaStorage()) simpanDataPerson();
}

function composePersonObject(namaPengguna, hobiPengguna) {
  return {
    id: +new Date(),
    namaPengguna,
    hobiPengguna,
  };
}

document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
  refreshDataPersonFromPerson();
});

function loadDataPersonDariStorage() {
  const unParsedData = localStorage.getItem(PERSON_KEY);

  let data = JSON.parse(unParsedData);

  if (data !== null) {
    person = data;
  }

  document.dispatchEvent(new Event("ondataloaded"));
}

function refreshDataPersonFromPerson() {
  const personContainer = document.getElementById(INFOPENGGUNA_ID);

  for (orang of person) {
    const newOrang = buatPerson(orang.namaPengguna, orang.hobiPengguna);
    newOrang[PERSON_ID] = orang.id;
  }
}
