/* eslint-disable no-useless-escape */
const inputValidations = {
  string: {
    regex: /[^A-Za-z0-9]+/,
    min: 5,
    max: 50,
  },
  email: {
    regex: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    min: 5,
    max: 50,
    not: true,
  },
};

export default inputValidations;
