"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
} from "@heroui/react";

type Member = { id: string; name: string; email: string; role: string };

export default function TeamManageTable({ members = [] }: { members?: Member[] }) {
  return (
    <Table aria-label="Team members">
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Email</TableColumn>
        <TableColumn>Role</TableColumn>
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody emptyContent="No members yet.">
        {members.map((m) => (
          <TableRow key={m.id}>
            <TableCell>{m.name}</TableCell>
            <TableCell className="text-default-500">{m.email}</TableCell>
            <TableCell>
              <Chip size="sm" variant="flat">
                {m.role}
              </Chip>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button size="sm" variant="flat">
                  Edit
                </Button>
                <Button size="sm" color="danger" variant="light">
                  Remove
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
