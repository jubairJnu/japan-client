"use client";

import { useGetAllVocabsQuery } from "@/redux/features/vocab.api";
import VocabularyPagination from "../../components/VocabPagination";

type TParams = {
  params: {
    number: string;
  };
};

const SingleLessonPage = ({ params }: TParams) => {
  const number = params.number;

  const { data: vocabs, isLoading } = useGetAllVocabsQuery(
    { lesson: number },
    {
      skip: !number,
    }
  );



  return (
    <div>
      <VocabularyPagination vocabularies={vocabs?.data} isLoading={isLoading} />
    </div>
  );
};

export default SingleLessonPage;
