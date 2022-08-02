import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import hiDog from '../../static/images/hi.png'
import Typography from '@mui/material/Typography';
import './comments.css'
import { useEffect } from 'react';
import { useContext } from 'react';
import { sharedState } from '../../App';
import trash from '../../static/images/trash.png'
import NewCommentModal from './addCommentModal/NewCommentModal';
import RepliesModal from './addCommentModal/RepliesModal';
import { useState } from 'react';
import { nanoid } from 'nanoid'



//Handle all the comment in comment section
export default function CommentBlock() {

  let state = useContext(sharedState);


  let [, , , , , , comments, setComments, , , , , , ,, , , , , setCommentId, currentUser, ,userRoll, ,, , , , ,  ] = state

  const [deleted, setDeleted] = useState(false);


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

  }, [])


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
        {comments.map((comment) => (
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
                    >
                    </Typography>
                
                   <div  style={{backgroundColor: 'rgb(242 225 230)', padding: '10px', borderRadius: '5px' }}>
                   <b>{`${comment.user}`}</b>

                  {/* === Comment reply modal component === */}
                    { userRoll === "admin" ? <RepliesModal  data={comment._id} /> :
                      userRoll === "member" ? <RepliesModal  data={comment._id} /> : <></>}
                
                    
                  

                      {` — ${comment.comment}`}
                   </div>
                    <i className='comment-date'> {` on ${comment.created.slice(0, 10)}`}</i>
                    
                  </React.Fragment>
                  
                }
              />
              {/* Comment's replies array */}
                {comment.replies.map(reply => (
                  <ListItemText 
                  key={nanoid()}
                  className='reply-text'
                  sx={{     
                    borderRadius: '5px',
                    marginLeft: 'auto'}}
                  primary=""
                  secondary={
                    <React.Fragment >
                      <Typography
                        sx={{display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                      </Typography>
                      {`${reply.comment}`} <b>{ `—  ${reply.user}`}</b>
                      <i className='comment-date'> {` on ${reply.created.slice(0, 10)}`}</i>
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
                    data-del={comment._id}
                    data-name={comment.user}
                  />
                </div>
              ) : currentUser.name === comment.user ? (
                userRoll === "member" ? (
                  <div className="comment-icons">
                    <img
                      src={trash}
                      onClick={deleteComment}
                      alt="delete-icon"
                      data-del={comment._id}
                      data-name={comment.user}
                    />
                  </div>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </ListItem>

            <Divider variant="inset" component="li" sx={{marginLeft: "0px"}} />
          </>
        ))}
      </List>
    </div>
  );
}
