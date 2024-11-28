import { makeStyles } from "@material-ui/core";

const useStyes = makeStyles({
  ViewNameBox: {
    display: 'flex',
    alignItems: 'center',
    height: 30,
    marginTop: -1,
    marginLeft: -1
  },
  blackBox: {
    width: 10,
    height: 10,
    background: "#333"
  },
  label: {
    color: "#333",
    background: "#fff",
    borderRadius: 6,
    borderTopLeftRadius: 0,
    lineHeight: "30px",
    textAlign: "center",
    fontSize: 20,
    paddingLeft: 5.5,
    paddingRight: 10
  }
})

const ViewNameBox = (props) => {
  const classes = useStyes()

  return(
    <div className={classes.ViewNameBox} style={props.style}>
      <div className={classes.blackBox}></div>
      <div className={classes.label}>{props.label}</div>
    </div>
  )
}

export default ViewNameBox