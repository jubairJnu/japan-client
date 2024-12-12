"use client";

import { useGetAllLessonQuery } from "@/redux/features/lesson.api";
import CommonHeader from "@/utils/CommonHeder";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoaderCircle } from "lucide-react";
import EditLessonModal from "../../components/EditLessonModal";

export type TLesson = {
  _id: string;
  name: string;
  number: number;
  vocabCount: number;
};

const LessonMangePage = () => {
  const { data: lessons, isLoading } = useGetAllLessonQuery({});

  return (
    <div className=" min-h-screen">
      <CommonHeader
        manage="Lesson Management"
        add="Add Lesson"
        link="/dashboard/add-lesson"
      />

      {/* table */}
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Lesson Name</TableHead>
              <TableHead>Lesson Number</TableHead>
              <TableHead>Vocabulary Count</TableHead>

              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center mx-auto">
                  <LoaderCircle className="animate-spin w-full" />
                </TableCell>
              </TableRow>
            ) : lessons?.data?.length ? (
              lessons?.data?.map((item: TLesson, index: number) => (
                <TableRow key={item._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item?.name}</TableCell>
                  <TableCell>{item?.number}</TableCell>
                  <TableCell>{item?.vocabCount}</TableCell>
                  <TableCell>
                    <EditLessonModal item={item} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LessonMangePage;
