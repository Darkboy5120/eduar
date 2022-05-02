/* eslint-disable no-useless-escape */
const inputValidations = {
  string: {
    regex: /[^A-Za-z0-9]+/,
    min: 5,
    max: 50,
  },
  url: {
    regex: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    min: 5,
    max: 50,
    not: true,
  },
  description: {
    regex: /[^A-Za-z0-9 ,.]+/,
    min: 5,
    max: 100,
  },
  email: {
    regex: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    min: 5,
    max: 50,
    not: true,
  },
  date: {
    regex: /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/,
    min: 10,
    max: 10,
  },
};

export default inputValidations;
