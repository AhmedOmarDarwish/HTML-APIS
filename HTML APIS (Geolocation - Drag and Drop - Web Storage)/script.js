const statusText = document.getElementById("status");
const map = document.getElementById("map");

function getMyLocation() {
  if (navigator.geolocation) {
    statusText.innerHTML = "Locating...";
    navigator.geolocation.getCurrentPosition(showPositionInMap, showError);
  } else {
    statusText.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPositionInMap(position) {
  const { latitude, longitude } = position.coords;
  statusText.innerHTML = `Your location: Latitude ${latitude.toFixed(
    5
  )}, Longitude ${longitude.toFixed(5)}`;
  //Show your location in Google Map
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
  map.src = googleMapsUrl;
}
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      statusText.innerHTML = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      statusText.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      statusText.innerHTML = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      statusText.innerHTML = "An unknown error occurred.";
      break;
  }
}

//For Darag and Drop Game

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

function allowDrop(ev) {
  ev.preventDefault();
}

//For Puzzle Game
let correctPieces = 0;
//localStorage
localStorage.numOfGameWin = 0;
document.querySelectorAll(".piece").forEach((piece) => {
  piece.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("piece", piece.dataset.piece);
  });
});

document.querySelectorAll(".dropzone").forEach((zone) => {
  zone.addEventListener("dragover", (e) => e.preventDefault());

  zone.addEventListener("drop", (e) => {
    const pieceId = e.dataTransfer.getData("piece");
    if (pieceId === zone.dataset.piece) {
      e.target.appendChild(
        document.querySelector(`.piece[data-piece="${pieceId}"]`)
      );
      zone.style.border = "1px solid green";
      correctPieces++;
      if (correctPieces === 3) {
        localStorage.numOfGameWin = Number(localStorage.numOfGameWin) + 1;
        document.getElementById(
          "win-Game-number"
        ).innerHTML = `You Win ${localStorage.numOfGameWin} Game(s)!`;
        document.getElementById("win-message").style.display = "block";
        document.getElementById("win-Game-number").style.display = "block";
      }
    } else {
      alert("Wrong position!");
    }
  });
});

function initGame() {
  correctPieces = 0;
  document.getElementById("win-message").style.display = "none";
  document.getElementById("win-Game-number").style.display = "none";

  const dropzones = document.querySelectorAll(".dropzone");
  const pieces = Array.from(document.querySelectorAll(".piece"));
  const piecesContainer = document.getElementById("pieces");

  dropzones.forEach((zone) => {
    zone.style.border = "2px dashed #ccc";
    zone.style.backgroundColor = "#f0f0f0";
    while (zone.firstChild) {
      zone.removeChild(zone.firstChild);
    }
  });
  pieces.sort(() => Math.random() - 0.5);
  pieces.forEach((piece) => {
    piecesContainer.appendChild(piece);
  });
}
