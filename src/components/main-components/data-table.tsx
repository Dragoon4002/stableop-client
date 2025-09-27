import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableColumn {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
}

interface DataTableProps {
  title: string;
  columns: TableColumn[];
  data: Record<string, unknown>[];
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
}

const DataTable: React.FC<DataTableProps> = ({
  title,
  columns,
  data,
  isLoading = false,
  emptyMessage = "No data available",
  className = ""
}) => {
  const getAlignmentClass = (align?: string) => {
    switch (align) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "";
    }
  };

  const renderLoadingState = () => (
    <TableRow>
      <TableCell colSpan={columns.length} className="h-32 text-center">
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span>Loading...</span>
        </div>
      </TableCell>
    </TableRow>
  );

  const renderEmptyState = () => (
    <TableRow>
      <TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="text-4xl">📊</div>
          <span>{emptyMessage}</span>
        </div>
      </TableCell>
    </TableRow>
  );

  const renderDataRows = () =>
    data.map((row, index) => (
      <TableRow key={index}>
        {columns.map((column) => (
          <TableCell
            key={column.key}
            className={`!px-4 ${getAlignmentClass(column.align)}`}
          >
            {row[column.key] === undefined || row[column.key] === null
              ? "-"
              : typeof row[column.key] === "object"
                ? JSON.stringify(row[column.key])
                : String(row[column.key])}
          </TableCell>
        ))}
      </TableRow>
    ));

  return (
    <div className={className}>
      {/* Header */}
      <div className="rounded-4xl flex items-center pl-10 w-full h-[60px] text-2xl bg-card">
        {title}
      </div>

      {/* Table */}
      <div className="mt-4 bg-card rounded-3xl overflow-hidden">
        <Table>
          <TableHeader className="bg-primary">
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={`!p-4 ${getAlignmentClass(column.align)}`}
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? renderLoadingState()
              : data.length === 0
              ? renderEmptyState()
              : renderDataRows()}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;