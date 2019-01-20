const AgeFilter = () => {
  return input => {
    input = input.toString();
    if (isInteger(input)) {
      if (isOne(input)) {
        return input + " Year";
      }
      return input + " Years";
    }
    if (isZero(input)) {
      const months = input.split(".")[1];
      let output = "";
      if (isOne(months)) {
        output = months + " Month";
      } else {
        output = months + " Months";
      }
      return output;
    }
    if (!isZero(input)) {
      const age = input.split(".");
      const years = age[0];
      const months = age[1];
      let output = "";
      if (isOne(years)) {
        output = years + " Year & " + months + " Months";
      } else {
        output = years + " Years & " + months + " Months";
      }
      return output;
    }
  };

  function isInteger(input) {
    return input % 1 === 0;
  }
  function isZero(input) {
    return parseInt(input) === 0;
  }
  function isOne(input) {
    return parseInt(input) === 1;
  }
};

export default AgeFilter;
