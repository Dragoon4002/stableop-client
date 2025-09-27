import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const LentCard = () => {
  return (
    <>
    {/* Header */}
    <div className=" rounded-4xl flex items-center pl-10 w-full h-[60px] text-2xl bg-card">Lent Records</div>
    {/* Table */}
    <div className="mt-4 bg-card rounded-3xl overflow-hidden">
      <Table>
        <TableHeader className="bg-primary" >
          <TableRow>
            <TableHead className="!p-4" >Amount</TableHead>
            <TableHead className="!p-4 text-center">Duration</TableHead>
            <TableHead className="!p-4 text-center">Approx Returns</TableHead>
            <TableHead className="!p-4 text-right">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="!px-4 ">INV001</TableCell>
            <TableCell className="!px-4 text-center">Paid</TableCell>
            <TableCell className="!px-4 text-center">Credit Card</TableCell>
            <TableCell className="!px-4 text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    </>
  );
};

export default LentCard;
