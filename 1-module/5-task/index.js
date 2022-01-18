function truncate(str, maxlength) {
  a = str.length;
  if ( a > maxlength) {
    str = str.slice(0, (maxlength - 1));
    str = str.slice(0) + "…";
    return str;
  } else {
    return str;
  }
};
