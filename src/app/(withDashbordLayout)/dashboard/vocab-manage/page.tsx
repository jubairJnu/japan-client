"use client";

import CommonHeader from "@/utils/CommonHeder";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, LoaderCircle } from "lucide-react";
import {
  useDeleteVocabsMutation,
  useGetAllVocabsQuery,
} from "@/redux/features/vocab.api";
import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";
import EditVocabsModal from "../../components/EditVocabsModal";
import Swal from "sweetalert2";

export type TVocabs = {
  _id: string;
  lessonNo: number;
  word: string;
  meaning: string;
  pronunciation: string;
  whenToSay: string;
};

const VocabManagePage = () => {
  const { data: vocabs, isLoading } = useGetAllVocabsQuery({});

  const [deleteItem, { isLoading: deleting }] = useDeleteVocabsMutation();

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
    <div>
      <CommonHeader
        manage="Vocabulary Manage"
        add="Add Vocabulary"
        link="/dashboard/add-vocab"
      />

      <div className="w-full max-w-7xl px-3 container mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Word</TableHead>
              <TableHead>Meaning</TableHead>
              <TableHead>Pronounciation</TableHead>
              <TableHead>When To Say</TableHead>
              <TableHead>Lesson No</TableHead>

              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center mx-auto">
                  <LoaderCircle className="animate-spin w-full" />
                </TableCell>
              </TableRow>
            ) : vocabs?.data?.length ? (
              vocabs?.data?.map((item: TVocabs, index: number) => (
                <TableRow key={item._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item?.word}</TableCell>
                  <TableCell>{item?.meaning}</TableCell>
                  <TableCell>{item?.pronunciation}</TableCell>
                  <TableCell>{item?.whenToSay}</TableCell>
                  <TableCell>{item?.lessonNo}</TableCell>
                  <TableCell className="flex items-center gap-3">
                    <EditVocabsModal item={item} />
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
                <TableCell colSpan={7} className="text-center">
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

export default VocabManagePage;
