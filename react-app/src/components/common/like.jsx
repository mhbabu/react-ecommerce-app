const Like = ({ liked, onLiked }) => {
  let classes = "fa fa-heart";
  classes += liked ? classes : "-o";
  return <span className={classes} onClick={onLiked} />;
};

export default Like;
