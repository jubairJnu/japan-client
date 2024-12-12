"use client";
import { TVocabs } from "@/app/(withDashbordLayout)/dashboard/vocab-manage/page";
import { Button } from "@/components/ui/button";
import { pronounceWord } from "@/utils/PronounceWord";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const VocabularyPagination = ({
  vocabularies,
  isLoading,
}: {
  vocabularies: TVocabs[];
  isLoading: boolean;
}) => {
  // State to track the current vocabulary index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get the current vocabulary to display
  const currentVocab = vocabularies?.[currentIndex];

  // Handle next vocabulary
  const handleNext = () => {
    if (currentIndex < vocabularies.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1); // Go to the next vocabulary
    }
  };

  // Handle previous vocabulary
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1); // Go to the previous vocabulary
    }
  };

  if (isLoading) {
    return <Loader2 className="animate-spin" />;
  }

  return (
    <div className="w-[380px] h-72 rounded-lg drop-shadow-lg border bg-[#f7f7f7] mx-auto pt-2 pb-5  mt-10">
      <p className="mt-2">
        {currentIndex + 1} /{" "}
        <span className="text-blue-600">{vocabularies?.length}</span>
      </p>
      {currentVocab && (
        <div className="flex flex-col  px-3">
          <button
            className="bg-[#007bff] text-[#fff]  min-w-[300px] rounded-md mx-auto px-4 py-2 text-center"
            onClick={() => pronounceWord(currentVocab.word)}
          >
            {currentVocab.word}
          </button>
          <div className="grid grid-cols-2 gap-4 text-sm justify-items-center mt-5">
            <div>
              <p className="font-bold text-gray-700">Pronunciation</p>
              <p className="text-gray-600">{currentVocab.pronunciation}</p>
            </div>
            <div>
              <p className="font-bold text-gray-700">Meaning</p>
              <p className="text-gray-600">{currentVocab.meaning}</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="font-bold text-gray-700 ">When to Say</p>
            <p className="text-gray-600">{currentVocab.whenToSay}</p>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      {currentIndex + 1 === vocabularies?.length ? (
        <div className="max-w-60 mx-auto">
          <Button className="bg-blue-600 text-slate-100 w-full mt-5  ">
            Complete
          </Button>
        </div>
      ) : (
        <div className="flex justify-end mt-5 gap-5 px-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="prev-button border border-blue-700"
          >
            <FaArrowLeft /> Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentIndex === vocabularies?.length - 1}
            className="next-button bg-blue-700 hover:bg-blue-500 font-bold"
          >
            Next
            <FaArrowRight />
          </Button>
        </div>
      )}

      {/* Display current index */}
    </div>
  );
};

export default VocabularyPagination;
