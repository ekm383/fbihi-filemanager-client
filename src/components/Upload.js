import React, { useState, useRef } from "react";
import { postUpload } from "../functions/file";
import Dropzone from "react-dropzone";
import { AiOutlineUpload } from "react-icons/ai";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0),
      width: "100%",
    },
  },
  formContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formControl: {
    marginBottom: "20px",
    minWidth: "49%",
  },
  button: {
    marginTop: "2rem",
    backgroundColor: "#1045d6",
    color: "#ffffff",
  },
}));

const Upload = () => {
  const classes = useStyles();

  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage
  const [state, setState] = useState({
    title: "",
    category: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));

    dropRef.current.style.border = "2px dashed #e9ebeb";
  };

  const updateBorder = (dragState) => {
    if (dragState === "over") {
      dropRef.current.style.border = "2px solid #000";
    } else if (dragState === "leave") {
      dropRef.current.style.border = "2px dashed #e9ebeb";
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const { title, category } = state;
      if (title.trim() !== "" && category.trim() !== "") {
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("title", title);
          formData.append("category", category);

          setErrorMsg("");
          await postUpload(formData);
          window.location.reload();
        } else {
          setErrorMsg("Please select a file to add.");
        }
      } else {
        setErrorMsg("Please enter all the field values.");
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  return (
    <>
      <form className={classes.root} onSubmit={handleOnSubmit}>
        {errorMsg && <p className='errorMsg'>{errorMsg}</p>}
        <div className={classes.formContainer}>
          <FormControl className={classes.formControl} variant='outlined'>
            <TextField
              id='standard-basic'
              label='File Name'
              name='title'
              value={state.title || ""}
              onChange={handleInputChange}
              variant='outlined'
            />
          </FormControl>
          <FormControl className={classes.formControl} variant='outlined'>
            <InputLabel id='demo-simple-select-label'>Provider</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={state.category || ""}
              onChange={handleInputChange}
              name='category'
            >
              <MenuItem value='medicare'>Medicare</MenuItem>
              <MenuItem value='aloha-care'>Aloha Care</MenuItem>
              <MenuItem value='hmsa'>HMSA</MenuItem>
              <MenuItem value='humana'>Humana</MenuItem>
              <MenuItem value='humana-benefits'>Humana Benefits</MenuItem>
              <MenuItem value='kaiser'>Kaiser</MenuItem>
              <MenuItem value='united-healthcare'>United Healthcare</MenuItem>
              <MenuItem value='united-healthcare-benefits'>
                United Healthcare Benefits
              </MenuItem>
              <MenuItem value='Ohana'>Ohana</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className='upload-section'>
          <Dropzone
            onDrop={onDrop}
            onDragEnter={() => updateBorder("over")}
            onDragLeave={() => updateBorder("leave")}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: "drop-zone" })} ref={dropRef}>
                <input {...getInputProps()} />
                <AiOutlineUpload /> upload
                {file && (
                  <div>
                    <strong>Selected file:</strong> {file.name}
                  </div>
                )}
              </div>
            )}
          </Dropzone>
          {previewSrc ? (
            isPreviewAvailable ? (
              <div className='image-preview'>
                <img className='preview-image' src={previewSrc} alt='Preview' />
              </div>
            ) : (
              <div className='preview-message'>
                <p>No image preview</p>
              </div>
            )
          ) : (
            <div className='preview-message'>
              <p>Image preview</p>
            </div>
          )}
        </div>
        <br />
        <Button className={classes.button} variant='contained' type='submit'>
          Upload File
        </Button>
      </form>
    </>
  );
};

export default Upload;
