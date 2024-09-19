  // Initialize Speech Recognition and Speech Synthesis
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  const synth = window.speechSynthesis;
  const mediaPlayer = document.getElementById('mediaPlayer');

  // Function to speak feedback
  function speakFeedback(text) {
      const utterance = new SpeechSynthesisUtterance(text);
      synth.speak(utterance);
  }

 // Video playlist
// Video playlist
const videoSources = [
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "https://www.w3schools.com/html/movie.mp4"  
];





let currentVideoIndex = 0;

recognition.onresult = function(event) {
    const command = event.results[0][0].transcript.toLowerCase();
    document.getElementById('output').innerHTML = `You said: ${command}`;

    if (command.includes('play')) {
        speakFeedback("Playing your media");
        mediaPlayer.play();
    } else if (command.includes('pause')) {
        speakFeedback("Pausing your media");
        mediaPlayer.pause();
    } else if (command.includes('next')) {
        currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
        document.getElementById('videoSource').src = videoSources[currentVideoIndex];
        mediaPlayer.load();  // Load the new video
        mediaPlayer.play();  // Play the new video
        speakFeedback("Playing next video");
    } else {
        speakFeedback("Command not recognized");
    }
};


  // Start the voice recognition
  function startListening() {
      recognition.start();
  }

  // Button to activate voice recognition
  document.getElementById('start-btn').addEventListener('click', startListening);