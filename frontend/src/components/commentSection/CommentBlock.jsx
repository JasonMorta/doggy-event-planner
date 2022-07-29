import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import hiDog from '../../static/images/hi.png'
import Typography from '@mui/material/Typography';
import './comments.css'
import { useEffect } from 'react';
import { useContext } from 'react';
import { sharedState } from '../../App';
import trash from '../../static/images/trash.png'
import edit from '../../static/images/edit.png'
import NewCommentModal from './addCommentModal/NewCommentModal';
import EditComment from './editComment/EditComment';
import RepliesModal from './addCommentModal/RepliesModal';
import { useState } from 'react';
import { nanoid } from 'nanoid'



//Handle all the comment in comment section
export default function CommentBlock() {

  let state = useContext(sharedState);


  let [loggedIn, setLoggedIn, dogOwners, setDogOwners, allEvents, setAllEvents, comments, setComments, editButton, setEditButton, eventId, setEventId, thisEvent, setThisEvent,update, setUpdate, thisComment, setThisComment, commentId, setCommentId, currentUser, setCurrentUser,userRoll, setUserRoll ] = state

  const [open, setOpen] = React.useState(false);
  const [deleted, setDeleted] = React.useState(false);
  const [thisReply, setThisReply] = React.useState('')

  //return all comment from db
  useEffect(() => {
    setCommentId('')
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
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem(currentUser.name)}`,
      },
      body: JSON.stringify({
        id: e.target.dataset.del,
      }),
      //handle errors
    })
      .then((res) => res.json())
      .then((response) => {
       if (response.err){
          alert('Authentication failed')
        } else {
          setComments(response)
        }
      })
      .catch((error) =>{
       console.log(error)
      });

      setDeleted(true)
  }


 
  //handle the reply input changes
  function handleInput(e){
    setThisReply(e.target.value)

  }

  //Reply to comments
   async function handleReplySubmit(e){
      
    await fetch("/replies", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: commentId,
        user: currentUser.name,
        comment: thisReply,
      }),
      //handle errors
    })
      .then((res) => res.json())
      .then(( response) => {
      setComments(response);
      setThisReply('✔')
      })
       .catch((error) => {
        console.log(error);
      setThisReply('⁉')
      });

      setTimeout(() => {
        setThisReply(' ')
      }, 2000);
    
  }


  return (
    <div className="commentBlock">
      <img src={hiDog} alt='dag waving' className='hi-dog' />
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
            <ListItem alignItems="flex-start" key={nanoid()} sx={{flexDirection: 'column'}}>
              <ListItemText
                className='comment-text'
                primary=""
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline"}}
                      component="span"
                      variant="body2"
                      color="text.primary"
                      key={nanoid()}
                    >
                    </Typography>
                
                   <div key={nanoid()}  style={{backgroundColor: 'rgb(242 225 230)', padding: "10px" }}>
                   <b key={nanoid()}>{`${user.user}`}</b>


                   {userRoll === "member" ? (
                      <RepliesModal 
                        key={nanoid()}
                        getUserId={()=> setCommentId(user._id)}
                        handleReplySubmit={handleReplySubmit}
                        thisReply={thisReply}
                        handleReplyInput={handleInput}/>
                    ) : userRoll === "admin" ? (
                      <RepliesModal 
                        key={nanoid()}
                        getUserId={()=> setCommentId(user._id)}
                        handleReplySubmit={handleReplySubmit}
                        thisReply={thisReply}
                        handleReplyInput={handleInput}/>
                    ) : (
                      <></>
                    )}

                   

                      {` — ${user.comment}`}
                   </div>
                    <i key={nanoid()} className='comment-date'> {` on ${user.created.slice(0, 10)}`}</i>
                    
                  </React.Fragment>
                  
                }
              />
              {/* replies on comment */}
                {user.replies.map(reply => (
                  <ListItemText 
                  key={nanoid()}
                  className='reply-text'
                  sx={{     
                    borderRadius: '50px',
                    marginLeft: 'auto'}}
                  primary=""
                  secondary={
                    <React.Fragment  key={nanoid()}>
                      <Typography
                       key={nanoid()}
                        sx={{display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                      </Typography>
                      {`${reply.comment}`} <b>{ `—  ${reply.user}`}</b>
                      <i  key={nanoid()} className='comment-date'> {` on ${reply.created.slice(0, 10)}`}</i>
                    </React.Fragment>
                    
                  }
              />
                ))}

              {/*
               *** members can only  delete their own comment
               *** Admin can delete any comment
               */}
              {userRoll === "admin" ? (
                <div className="comment-icons"  key={nanoid()}>
                  <img
                    src={trash}
                    onClick={deleteComment}
                    alt="delete-icon"
                    data-del={user._id}
                    data-name={user.user}
                    key={nanoid()}
                  />
                </div>
              ) : currentUser.name === user.user ? (
                userRoll === "member" ? (
                  <div className="comment-icons"  key={nanoid()}>
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
