const BUKUNOTCOMPLETE_ID = "isnotfinished";
const BUKUCOMPLETE_ID = "isfinished";
const BUKU_ID = "books_id";

function tambahBukuBaru() {
  const bukuUnComplete = document.getElementById(BUKUNOTCOMPLETE_ID);
  const bukuComplete = document.getElementById(BUKUCOMPLETE_ID);
  const inputJudul = document.getElementById("inputJudul").value;
  const inputAuthor = document.getElementById("authorBuku").value;
  const inputTahun = document.getElementById("tahunBuku").value;
  const inputBukuComplete = document.getElementById("inputBookIsComplete");

  if (inputBukuComplete.checked === true) {
    const book = buatBuku(inputJudul, inputAuthor, inputTahun, true);
    const bookInObject = composeBukuObject(
      inputJudul,
      inputAuthor,
      inputTahun,
      true
    );
    book[BUKU_ID] = bookInObject.id;
    buku.push(bookInObject);

    bukuComplete.append(book);
  } else {
    const book = buatBuku(inputJudul, inputAuthor, inputTahun, false);
    const bookInObject = composeBukuObject(
      inputJudul,
      inputAuthor,
      inputTahun,
      false
    );
    book[BUKU_ID] = bookInObject.id;
    buku.push(bookInObject);

    bukuUnComplete.append(book);
  }

  updateDataKeStorage();
}

function buatBuku(judul, author, tahun, isCompleted) {
  const bukuJudul = document.createElement("h3");
  bukuJudul.innerText = judul;
  bukuJudul.classList.add("judul-buku");

  const namaAuthor = document.createElement("p");
  namaAuthor.innerText = author;
  namaAuthor.classList.add("penulis");

  const tahunRilis = document.createElement("p");
  tahunRilis.innerText = tahun;
  tahunRilis.classList.add("tahun");

  const detailBuku = document.createElement("div");
  detailBuku.classList.add("detail-buku");
  detailBuku.append(bukuJudul, namaAuthor, tahunRilis);

  const container = document.createElement("div");
  if (isCompleted) {
    container.classList.add("box-iscomplete");
  } else {
    container.classList.add("box-isnotcomplete");
  }
  container.append(detailBuku);

  if (isCompleted) {
    container.append(buatButtonCancel(), buatButtonHapus());
  } else {
    container.append(buatButtonDibaca(), buatButtonHapus());
  }
  return container;
}

function buatButton(buttonClass, namaButton, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonClass);
  button.innerText = namaButton;

  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}

function buatButtonDibaca() {
  return buatButton("finised", "Dibaca", function (event) {
    tambahBukuComplete(event.target.parentElement);
  });
}

function buatButtonCancel() {
  return buatButton("cancel", "Cancel", function (event) {
    ulangBukuComplete(event.target.parentElement);
  });
}

function buatButtonHapus() {
  return buatButton("delete", "Hapus", function (event) {
    hapusBukuDariComplete(event.target.parentElement);
  });
}

function tambahBukuComplete(bukuElement) {
  const bukuComplete = document.getElementById(BUKUCOMPLETE_ID);
  const titleBuku = bukuElement.querySelector(
    ".detail-buku > .judul-buku"
  ).innerText;
  const authorBuku = bukuElement.querySelector(
    ".detail-buku > .penulis"
  ).innerText;
  const tahunBuku = bukuElement.querySelector(
    ".detail-buku > .tahun"
  ).innerText;

  const newBuku = buatBuku(titleBuku, authorBuku, tahunBuku, true);
  const books = cariBuku(bukuElement[BUKU_ID]);
  books.isCompleted = true;
  newBuku[BUKU_ID] = books.id;

  bukuComplete.append(newBuku);
  bukuElement.remove();

  updateDataKeStorage();
}

function ulangBukuComplete(bukuElement) {
  const listUncompleted = document.getElementById(BUKUNOTCOMPLETE_ID);

  const titleBuku = bukuElement.querySelector(
    ".detail-buku > .judul-buku"
  ).innerText;
  const authorBuku = bukuElement.querySelector(
    ".detail-buku > .penulis"
  ).innerText;
  const tahunBuku = bukuElement.querySelector(
    ".detail-buku > .tahun"
  ).innerText;

  const newBuku = buatBuku(titleBuku, authorBuku, tahunBuku, false);
  const books = cariBuku(bukuElement[BUKU_ID]);
  books.isCompleted = false;
  newBuku[BUKU_ID] = books.id;

  listUncompleted.append(newBuku);
  bukuElement.remove();
  updateDataKeStorage();
}

function hapusBukuDariComplete(bukuElement) {
  const posisiBuku = cariBukuIndex(bukuElement[BUKU_ID]);
  buku.splice(posisiBuku, 1);
  bukuElement.remove();
  updateDataKeStorage();
}

document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBuku();
});
