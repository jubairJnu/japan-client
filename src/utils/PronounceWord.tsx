  
export const pronounceWord = (word: string, language = "ja-JP") => {
  if (!("speechSynthesis" in window)) {
    console.error("Speech synthesis is not supported in this browser.");
    return;
  }

  try {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = language; // Set the language
    window.speechSynthesis.speak(utterance); // Pronounce the word
  } catch (error) {
    console.error("Error while pronouncing the word:", error);
  }
};
