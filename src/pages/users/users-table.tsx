"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { User } from "@/schemas/user";
import { useUsers } from "@/services/use-users";
import { useEffect, useState } from "react";

export const UsersTable = ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const { users, usersToDisplay, goOnNextPage, goOnPrevPage, loading, error } = useUsers({query, currentPage});

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Table>
      <TableCaption>A list of users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {usersToDisplay.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
      <tr>
      <td>
        <button onClick={goOnPrevPage}>Prev</button>
        <button onClick={goOnNextPage}>Next</button>
        </td>
        </tr>
      </TableFooter>
    </Table>
  );
};
