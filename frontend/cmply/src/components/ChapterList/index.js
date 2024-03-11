import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
    Table,
    Paper,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    tableCellClasses,
    Card,
    CardActionArea,
    Typography,
    CardContent,
    CardHeader,
} from "@mui/material";
import ChaptersAPIContext from "../../contexts/ChaptersAPIContext";

const ChapterList = ({ perPage, page }) => {
    let navigate = useNavigate();
    const { chapters } = useContext(ChaptersAPIContext);
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
            }}>
            {chapters.map((chapter, i) => (
                <Card
                    key={"chapter-" + i}
                    style={{
                        width: "15rem",
                        height: "5rem",
                        margin: "1rem",
                        borderRadius: "1rem",
                        display: "table-cell",
                        verticalAlign: "middle",
                    }}>
                    <CardActionArea
                        onClick={() => {
                            navigate("/quran/" + chapter.num + "/");
                        }}>
                        <div style={{ padding: "0.5rem" }}>
                            <Typography
                                align="left"
                                style={{
                                    fontSize: 20,
                                }}>
                                {"( " +
                                    chapter.num +
                                    " )     " +
                                    chapter.name_eng}
                                <Typography
                                    align="right"
                                    style={{
                                        fontSize: 22,
                                        fontFamily: [
                                            "'Noto Naskh Arabic'",
                                            "serif",
                                        ].join(","),
                                    }}>
                                    {chapter.name_ara}
                                </Typography>
                            </Typography>
                        </div>
                    </CardActionArea>
                </Card>
            ))}
        </div>
        // <Paper variant="outlined" sx={{ width: 500, border: "none" }}>
        //     <Table
        //         sx={{
        //             [`& .${tableCellClasses.root}`]: {
        //                 borderBottom: "none",
        //             },
        //         }}>
        //         <TableHead>
        //             <TableRow>
        //                 <TableCell align="center">Chapter</TableCell>
        //                 <TableCell align="center">Name</TableCell>
        //                 <TableCell> </TableCell>
        //             </TableRow>
        //         </TableHead>

        //         <TableBody>
        //             {chapters !== undefined &&
        //                 chapters.map((chapter, i) => (
        //                     <TableRow key={"chapter-" + i}>
        //                         <TableCell align="center">
        //                             {chapter.num}
        //                         </TableCell>
        //                         <TableCell align="center">
        //                             <Link
        //                                 to={"/quran/" + chapter.num + "/"}
        //                                 underline={"hover"}
        //                                 style={{ color: "#ff9d3f" }}>
        //                                 {chapter.name_eng}
        //                             </Link>
        //                         </TableCell>
        //                         <TableCell
        //                             align="center"
        //                             style={{
        //                                 fontSize: 16,
        //                                 fontFamily: [
        //                                     "'Noto Naskh Arabic'",
        //                                     "serif",
        //                                 ].join(","),
        //                             }}>
        //                             {chapter.name_ara}
        //                         </TableCell>
        //                     </TableRow>
        //                 ))}
        //         </TableBody>
        //     </Table>
        // </Paper>
    );
};

export default ChapterList;
