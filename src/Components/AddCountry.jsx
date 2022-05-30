import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
export const AddCountry = () => {
  const [text, setText] = useState("");

  const handleClick = () => {
    axios.get("https://city-country1.herokuapp.com/add-country").then(function (response) {
      // handle success
      let condition = true;
      let res = response.data.map((e) => {
        if (e.name.toLowerCase() == text.toLowerCase()) {
          alert(`${text} already exists`);
          condition = false;
        }
        return condition;
      });
      if (condition) {
        axios
          .post("https://city-country1.herokuapp.com/add-country", { name: text })
          .then(function (response) {
            alert("Country added sucessfully")
          });
      }
    });
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <TextField
        type="text"
        placeholder="Add new country"
        onChange={handleChange}
      />
      <Button variant="contained" endIcon={<SendIcon />} onClick={handleClick}>
        Submit
      </Button>
    </div>
  );
};
