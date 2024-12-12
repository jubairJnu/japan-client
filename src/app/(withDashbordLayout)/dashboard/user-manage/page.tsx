"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllUserQuery } from "@/redux/features/user.api";
import CommonHeader from "@/utils/CommonHeder";
import { LoaderCircle } from "lucide-react";

import EditUserModal from "../../components/EditUserModal";

export type TUser = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

const UserManagePage = () => {
  const { data: users, isLoading } = useGetAllUserQuery({});

  return (
    <div>
      <CommonHeader
        manage="Manage User"
        add="Add User"
        link="/dashboard/add-user"
      />

      {/* table */}
      <div className="w-full max-w-7xl px-3 container mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>

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
            ) : users?.data?.length ? (
              users?.data?.map((item: TUser, index: number) => (
                <TableRow key={item._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item?.name}</TableCell>
                  <TableCell>{item?.email}</TableCell>
                  <TableCell>{item?.role}</TableCell>
                  <TableCell>
                    <EditUserModal item={item} />
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

export default UserManagePage;
