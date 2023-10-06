import React from "react";
import { TableCell, TableRow } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
const TableSkeleton = ({ columns = 10 }) => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
        return (
          <TableRow>
            {Array.from({ length: columns }, (_, index) => (
              <TableCell key={index}>
                <Skeleton variant="text" />
              </TableCell>
            ))}

            {/* Add more Skeleton cells */}
          </TableRow>
        );
      })}
    </>
  );
};

export default TableSkeleton;
