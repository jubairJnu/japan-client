"use client";

import {
  useDeleteLessonMutation,
  useGetAllLessonQuery,
} from "@/redux/features/lesson.api";
import CommonHeader from "@/utils/CommonHeder";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, LoaderCircle } from "lucide-react";
import EditLessonModal from "../../components/EditLessonModal";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";

export type TLesson = {
  _id: string;
  name: string;
  number: number;
  vocabCount: number;
};

const LessonMangePage = () => {
  const [deleteItem, { isLoading: deleting }] = useDeleteLessonMutation();

  const { data: lessons, isLoading } = useGetAllLessonQuery({});

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteItem(id).unwrap();

        if (res.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className=" min-h-screen">
      <CommonHeader
        manage="Lesson Management"
        add="Add Lesson"
        link="/dashboard/add-lesson"
      />

      {/* table */}
      <div className="w-full max-w-7xl px-3 container mx-auto">
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
                  <TableCell className="flex items-center gap-3">
                    <EditLessonModal item={item} />
                    <Button
                      disabled={deleting}
                      onClick={() => handleDelete(item._id)}
                      size="icon"
                      variant="destructive"
                    >
                      {deleting ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <FaTrash />
                      )}
                    </Button>
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
