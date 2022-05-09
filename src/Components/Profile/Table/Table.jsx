import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import React from "react";

function SimpleTable({ rows }) {
  return (
    <div>
      <TableContainer>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <span className='text-lightgrey'>
                  <strong>{row.name}</strong>
                </span>
              </TableCell>
              <TableCell align="left">{row.value}</TableCell>
              <TableCell align="left">{row.ac}</TableCell>
              <TableCell align="left">{row.ac}</TableCell>
              <TableCell align="left">{row.ac}</TableCell>
              <TableCell align="left">{row.ac}</TableCell>
              <TableCell align="left">{row.ac}</TableCell>
              <TableCell align="left">{row.ac}</TableCell>
              <TableCell align="left">{row.ac}</TableCell>
              <TableCell align="left">{row.ac}</TableCell>
              <TableCell align="left">{row.ac}</TableCell>
              <TableCell align="left">{row.ac}</TableCell>
              <TableCell align="left">{row.ac}</TableCell>
              <TableCell align="left">{row.ac}</TableCell>
              <TableCell align="left">{row.ac}</TableCell>
              <TableCell align="left">{row.ac}</TableCell>
              <TableCell align="left">{row.ac}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    </div>
  );
}

export default SimpleTable;
