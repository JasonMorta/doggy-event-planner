import * as React from 'react';
import Button from '@mui/material/Button';


//This button will be used in tother components
export default function ReusableButton(props) {


  const style ={
    backgroundColor: "#efffafd6",
    color: 'gray',
    margin: '0 5px',
    borderRadius: '20px',
    border: '0px solid gray',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: "#e0f782",
      boxShadow: 'none',
    }
  }

  return (

      <Button 
        variant={props.variant}
        classes={props.classes}
        color={props.color}
        disabled={props.disabled}
        size={props.size}
        sx={style}
        data-listitem={props.listitem}
        onClick={props.onClick}
        >
        {props.children}
      </Button>
    
  );
}
