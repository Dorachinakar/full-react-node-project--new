const axios = require("axios");

const options = {
  method: "GET",
  url: "https://movie-database-alternative.p.rapidapi.com/",
  params: { s: "fight club", r: "json", page: "1" },
  headers: {
    "X-RapidAPI-Key": "7b2b677fb2msh1ece18c9243cc76p1558c9jsn79939132206b",
    "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
  },
};
const dor = axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

console.log(dor);

const options2 = {
  method: "GET",
  url: "https://movie-database-alternative.p.rapidapi.com/",
  params: { r: "json", i: `tt4154796` },
  headers: {
    "X-RapidAPI-Key": "7b2b677fb2msh1ece18c9243cc76p1558c9jsn79939132206b",
    "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
  },
};

const dor2 = axios
  .request(options2)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
const practice = { dor, dor2 };
export default practice;
