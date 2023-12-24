import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Paper, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import VersesAPIContext from '../../../contexts/VersesAPIContext';


const VerseTable = ({perPage, page}) => {
    const { verses, transVerses } = useContext(VersesAPIContext);
    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Number</TableCell>
                        <TableCell>Verse Translation </TableCell>
                        <TableCell>Verse </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    { verses !== undefined && verses.map((verse, i) => (
                        <TableRow>
                            <TableCell> { verse.num } </TableCell>
                            <TableCell> 
                                <Link to={"/quran/verse/" + verse.num} underline={"hover"}> 
                                    { verse.text_eng }
                                </Link>
                                
                            </TableCell>
                            <TableCell> { verse.text_ara } </TableCell>
                        </TableRow>
                    ))
                    }
                </TableBody>
            </Table>
        </Paper>
    )
}

export default VerseTable;