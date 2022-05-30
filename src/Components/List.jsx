import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import TextField from "@mui/material/TextField";
export const List = () => {
  const [data, setData] = useState([]);
  const [CopyData, setCopydata] = useState([]);
  const [sorting, setSort] = useState("");
  const getList = () => {
    axios.get("http://localhost:8080/city").then(function (response) {
      setData(response.data);
      setCopydata(response.data);
    });
  };
  useEffect(() => {
    getList();
  }, []);
  const handleChange = (e) => {
    setSort(e.target.value);
  };
  if (sorting === "Ascending") {
    CopyData.sort((a, b) => a.population - b.population);
  } else if (sorting === "Decending") {
    CopyData.sort((a, b) => b.population - a.population);
  }
  const handleFilter = (e) => {
    // console.log(e.target.value)
    let len = e.target.value.length;
    // console.log(len)
    let filteredData = data.filter((el) => {
      let name = "";
      for (let i = 0; i < len; i++) {
        name += el.country[i];
      }
      if (name.toLowerCase() === e.target.value.toLowerCase()) return el;
    });

    setCopydata(filteredData);
  };
 
  return (
    <div>
      <Link
        to="/add-country"
        style={{ textDecoration: "none", marginRight: "20px" }}
      >
        <Button variant="contained">Add new Country</Button>
      </Link>
      <Link
        to="/add-city"
        style={{ textDecoration: "none", marginRight: "20px" }}
      >
        <Button variant="contained">Add new City</Button>
      </Link>
      <Box sx={{ width: "200px" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Population</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            value={sorting}
            onChange={handleChange}
          >
            <MenuItem value="Ascending">Ascending</MenuItem>
            <MenuItem value="Decending">Decending</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Search Country"
          variant="outlined"
          onChange={handleFilter}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Population</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {CopyData.map((e) => (
              <TableRow key={e.id}>
                <TableCell>{e.id}</TableCell>
                <TableCell>{e.country}</TableCell>
                <TableCell>{e.city}</TableCell>
                <TableCell>{e.population}</TableCell>
                <TableCell>
                  <Button variant="outlined" startIcon={<EditIcon />}>
                    EDIT
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" startIcon={<DeleteIcon />} onClick={()=>(
                    
                    axios.delete(`http://localhost:8080/city/${e.id}`).then(
                      getList()
                    )
                  )}>
                    DELETE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

<Box
  component="form"
  sx={{
    "& > :not(style)": { m: 1, width: "25ch" },
  }}
  noValidate
  autoComplete="off"
>
  <TextField id="outlined-basic" label="Outlined" variant="outlined" />
</Box>;
