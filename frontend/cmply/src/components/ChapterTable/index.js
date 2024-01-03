import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
    Table,
    Paper,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import ChaptersAPIContext from "../../contexts/ChaptersAPIContext";

const ChapterTable = ({ perPage, page }) => {
    const { chapters } = useContext(ChaptersAPIContext);
    return (
        <Paper variant="outlined" sx={{ width: 500 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Chapter</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell> </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {chapters !== undefined &&
                        chapters.map((chapter, i) => (
                            <TableRow key={"chapter-" + i}>
                                <TableCell align="center">
                                    {chapter.num}
                                </TableCell>
                                <TableCell align="center">
                                    <Link
                                        to={"/quran/" + chapter.num + "/"}
                                        underline={"hover"}
                                        style={{ color: "#ff9d3f" }}>
                                        {chapter.name_eng}
                                    </Link>
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        fontSize: 16,
                                        fontFamily: [
                                            "'Noto Naskh Arabic'",
                                            "serif",
                                        ].join(","),
        
                                    }}>
                                    {chapter.name_ara}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default ChapterTable;
