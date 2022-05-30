import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
export const AddCountry = () => {
  const [text, setText] = useState("");

  const handleClick = () => {
    axios.get("http://localhost:8080/countries").then(function (response) {
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
          .post("http://localhost:8080/countries", { name: text })
          .then(function (response) {
            console.log(response);
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
