const generateStaffUsn = () => {
  return (
    "STF" +
    "-" +
    String(Math.floor(Math.random() * 1000)).padStart(3, "0") +
    "-" +
    String(Date.now()).slice(-3)
  );
};

export default generateStaffUsn;
