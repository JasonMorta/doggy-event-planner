import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import './comments.css'
import { useEffect } from 'react';
import { useContext } from 'react';
import { sharedState } from '../../App';
import trash from '../../static/images/trash.png'
import edit from '../../static/images/edit.png'
import NewCommentModal from './addCommentModal/NewCommentModal';
import EditComment from './editComment/EditComment';



//Handle all the comment in comment section
export default function CommentBlock() {

  let state = useContext(sharedState);


  let [loggedIn, setLoggedIn, dogOwners, setDogOwners, allEvents, setAllEvents, comments, setComments, editButton, setEditButton, eventId, setEventId, thisEvent, setThisEvent,update, setUpdate, thisComment, setThisComment, commentId, setCommentId, currentUser, setCurrentUser,userRoll, setUserRoll ] = state

  const [open, setOpen] = React.useState(false);
  const [deleted, setDeleted] = React.useState(false)

  //return all comment from db
  useEffect(() => {
    async function getComments(){
        await fetch("/findAllComments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((response) => {
            setComments(response);
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
      }
      getComments();

  }, [setComments])


  //DELETE Comment



  async function deleteComment(e){
    setDeleted(false)

    console.log(e)

    await fetch("/removeComment", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: e.target.dataset.del,
      }),
      //handle errors
    })
      .then((res) => res.json())
      .then((response) => {
       setComments(response)
      })
      .catch((error) =>{
       console.log(error)
      });

      setDeleted(true)
  }

 


  return (
    <div className="commentBlock">
      <h3>Comments</h3>
      {userRoll === "member" ? (
        <NewCommentModal />
      ) : userRoll === "admin" ? (
        <NewCommentModal />
      ) : (
        <></>
      )}
      <List
        sx={{ width: "100%", maxWidth: "90%", bgcolor: "background.paper" }}
        className="commentsList"
      >
        {comments.map((user) => (
          <>
            <ListItem alignItems="flex-start" key={user._id}>
              <ListItemText
                primary=""
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {`${user.user}`}
                    </Typography>
                    {` — ${user.comment}`}
                  </React.Fragment>
                }
              />

              {/*
               *** members can only  delete their own comment
               *** Admin can delete any comment
               */}
              {userRoll === "admin" ? (
                <div className="comment-icons">
                  <img
                    src={trash}
                    onClick={deleteComment}
                    alt="delete-icon"
                    data-del={user._id}
                    data-name={user.user}
                  />
                </div>
              ) : currentUser.name === user.user ? (
                userRoll === "member" ? (
                  <div className="comment-icons">
                    <img
                      src={trash}
                      onClick={deleteComment}
                      alt="delete-icon"
                      data-del={user._id}
                      data-name={user.user}
                    />
                  </div>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </ListItem>

            <Divider variant="inset" component="li" />
          </>
        ))}
      </List>
    </div>
  );
}
