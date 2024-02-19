
  let progress, song, ctrlIcon, durationElement, songTitle, speedControl;
  let animationFrameId;
  let currentSongIndex = 0;

  const songs = [
    { title: "Puthuvellai Mazhai", source: "Pudhu-Vellai-Mazhai-Female-Version.mp3" },
    { title: "Manasellam Mazhaiye", source: "Manasellam-Mazhaiye.mp3" },
    { title: "Vennilave Vennilave", source: "Vennilave-Vennilave.mp3" },
    { title: "	Kaatre En Vaasal", source: "Kaatre-En-Vaasal.mp3" },
    { title: "Naan Sonnadhum Mazhai Vandhucha", source: "Naan-Sonnadhum-Mazhai-Vandhucha.mp3" }
    // Add more song objects as needed
  ];

  document.addEventListener("DOMContentLoaded", function () {
    progress = document.getElementById("progress");
    song = document.getElementById("song");
    ctrlIcon = document.getElementById("ctrlIcon");
    durationElement = document.getElementById("duration");
    songTitle = document.getElementById("songTitle");
   

    updateSong();

    song.onloadedmetadata = function () {
      progress.max = song.duration;
      progress.value = song.currentTime;
    };

  });

  function playpause() {
    console.log("playpause function called");
    if (ctrlIcon.classList.contains("fa-pause")) {
      console.log("Pausing...");
      song.pause();
      ctrlIcon.classList.remove("fa-pause");
      ctrlIcon.classList.add("fa-play");
      cancelAnimationFrame(animationFrameId);
    } else {
      console.log("Playing...");
      song.play();
      ctrlIcon.classList.add("fa-pause");
      ctrlIcon.classList.remove("fa-play");

      function updateProgress() {
        progress.value = song.currentTime;
        if (!song.paused) {
          animationFrameId = requestAnimationFrame(updateProgress);
        }
      }

      updateProgress();
    }
  }

  function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateSong();
  }

  function previousSong() {
    // Adjust index to handle negative values
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updateSong();
  }

  function updateSong() {
    song.src = songs[currentSongIndex].source;
    songTitle.textContent = songs[currentSongIndex].title;
    speedControl.value = 1;
    song.playbackRate = 1;
  }
  function toggleMenu() {
    const menu = document.getElementById("menu");

    // Toggle the visibility of the menu
    menu.style.display = (menu.style.display === "none" || menu.style.display === "") ? "block" : "none";

    // If the menu is visible, dynamically generate the menu items based on the songs
    if (menu.style.display === "block") {
        populateMenu();
    }
}


function populateMenu() {
    const menu = document.getElementById("menu");
    menu.innerHTML = ""; // Clear existing menu items

    // Populate the menu with songs
    songs.forEach((song, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = song.title;
        listItem.setAttribute("onclick", `selectSong(${index})`);
        menu.appendChild(listItem);
    });
}

function selectSong(index) {
    // Implement the action you want when a song is selected
    console.log("Selected song:", songs[index].title);
// Set the current song index
currentSongIndex = index;

// Update the song details
updateSong();

// Play the selected song
playpause();
    // Optionally, hide the menu after selecting a song
    toggleMenu();
}
  



 

