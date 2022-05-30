import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
export const AddCity = () => {
  const [data, setData] = useState([]);
  const [n, setN] = useState("");
  const [details,setDetails] = useState({})
  const getList = () => {
    axios.get("http://localhost:8080/countries").then(function (response) {
      setData(response.data);
    });
  };

  useEffect(() => {
    getList();
  }, []);
  const handleChange = (e) => {
    if(e.target.name==="country") setN(e.target.value);
    setDetails((prev)=>(
       { ...prev,
        [e.target.name]:e.target.value}
    ))
  };
  const handleClick = ()=>{
    axios.post('http://localhost:8080/city', details)
    .then(function (response) {
        alert("City added sucessfully")
      })
  }
  return (
    <div>
      <TextField
        type="text"
        id="outlined-basic"
        label="Add new City"
        variant="outlined"
        name="city"
        onChange={handleChange}
      ></TextField>
      <TextField
        type="number"
        id="outlined-basic"
        label="City population"
        variant="outlined"
        name="population"
        onChange={handleChange}
      ></TextField>
      <Box sx={{ width: "200px" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Country</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            value={n}
            name="country"
            onChange={handleChange}
          >
            {data.map((e) => (
              <MenuItem value={e.name} key={e.id}>
                {e.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button variant="contained" endIcon={<SendIcon />} onClick={handleClick}>
        Submit
      </Button>
    </div>
  );
};

