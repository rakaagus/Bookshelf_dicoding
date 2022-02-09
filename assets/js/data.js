const STORAGE_KEY = "BOOKSHELF_APPS";

let buku = [];

function periksaStorage() {
  if (typeof Storage == undefined) {
    alert("Your Browser not support web storage");
    return false;
  }

  return true;
}

function simpanData() {
  const persedDataBuku = JSON.stringify(buku);
  localStorage.setItem(STORAGE_KEY, persedDataBuku);
  document.dispatchEvent(new Event("ondataseved"));
}

function loadDataDariStorage() {
  const unParsedData = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(unParsedData);

  if (data !== null) {
    buku = data;
  }

  document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataKeStorage() {
  if (periksaStorage()) simpanData();
}

function composeBukuObject(bukuTitle, bukuAuthor, bukuTahun, isCompleted) {
  return {
    id: +new Date(),
    bukuTitle,
    bukuAuthor,
    bukuTahun,
    isCompleted,
  };
}

function cariBuku(bukuId) {
  for (book of buku) {
    if (book.id === bukuId) return book;
  }

  return null;
}

function cariBukuIndex(bukuId) {
  let index = 0;
  for (book of buku) {
    if (book.id === bukuId) return index;

    index++;
  }

  return -1;
}

function refreshDataFromBuku() {
  const bukuNotComplete = document.getElementById(BUKUNOTCOMPLETE_ID);
  let bukuComplete = document.getElementById(BUKUCOMPLETE_ID);

  for (book of buku) {
    const newBuku = buatBuku(
      book.bukuTitle,
      book.bukuAuthor,
      book.bukuTahun,
      book.isCompleted
    );
    newBuku[BUKU_ID] = book.id;

    if (book.isCompleted) {
      bukuComplete.append(newBuku);
    } else {
      bukuNotComplete.append(newBuku);
    }
  }
}
