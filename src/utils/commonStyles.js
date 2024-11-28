const scrollBar = {
    "&::-webkit-scrollbar": {
      height: 6,
      width: 6,
    },
  
    "&::-webkit-scrollbar-thumb": {
      background: "transparent",
      borderRadius: 6,
    },
  
    "&:hover::-webkit-scrollbar-thumb": {
      background: "rgba(144, 147, 153, 0.5)",
      borderRadius: 6,
    },
  
    "&::-webkit-scrollbar-track": {
      background: "transparent",
      borderRadius: 5,
    },
  };
  
  const recordId = {
    border: "1px solid #000",
    borderRadius: 6,
    height: 25,
    lineHeight: "23px",
    background: "#fff",
    textAlign: "center",
    fontSize: 20,
  };
  
  const flexCentering = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  
  export { scrollBar, recordId, flexCentering };  