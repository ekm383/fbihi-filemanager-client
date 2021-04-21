import React, { useState, useEffect } from "react";
import download from "downloadjs";
import { getAllFiles, getDownload } from "../functions/file";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  nameHeadCell: {
    width: "85%",
    fontSize: "1.5rem",
  },
  nameCell: {
    width: "85%",
    fontSize: "1rem",
  },
  downloadCell: {
    textAlign: "right",
    fontSize: "1rem",
  },
});

const Humana = () => {
  const classes = useStyles();

  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await getAllFiles("humana");
        setErrorMsg("");
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []);

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await getDownload(id);
      const split = path.split("/");
      const filename = split[split.length - 1];
      setErrorMsg("");
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg("Error while downloading file. Try again later");
      }
    }
  };

  return (
    <div className='files-container'>
      {errorMsg && <p className='errorMsg'>{errorMsg}</p>}
      <TableContainer>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell className={classes.nameHeadCell}>
                Humana Files
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filesList.length > 0 ? (
              filesList.map(({ _id, title, file_path, file_mimetype }) => (
                <TableRow key={_id}>
                  <TableCell className={classes.nameCell}>{title}</TableCell>
                  <TableCell className={classes.downloadCell}>
                    <a
                      href='#/'
                      onClick={() =>
                        downloadFile(_id, file_path, file_mimetype)
                      }
                    >
                      Download
                    </a>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} style={{ fontWeight: "300" }}>
                  No files found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Humana;
