import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStatistics } from "../../store/features/attachment/attachment.actions";

const Journal = () => {
  // const {} = useSelector()
  const dispatch = useDispatch();

  const getJournal = () => {
    var axios = require("axios");
    let start = "2022-10-11";
    let end = "2022-12-11";
    let divisionId = "12"

    var config = {
      method: "get",
      url:
        "http://localhost:8080/statistics/getallbycreatedatbetweenfromdivision?start=" +
        start +
        "&&end=" +
        end +
        "&&divisionId=" +
        divisionId +
        "",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY3MDc0NTk0MCwiZXhwIjoxNjcwODMyMzQwLCJyb2xlcyI6IkFETUlOIn0.wACupjVMBfY0O9ocbYJuO5wCdI_Mvxjk4l3kiI682S0czC0z4LO2Tp6xryWmFNY_NrZV6XcypfO9mSTw4qyjMA",
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <button onClick={getJournal}>getData</button>
    </div>
  );
};

export default Journal;
