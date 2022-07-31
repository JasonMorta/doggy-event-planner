import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}



//Display a list of images with Material UI Custom image list component
export default function Gallery() {
  return (
   <>
      <h2>Event Memories</h2>
      <ImageList
        sx={{
          width: 500,
          height: 650,
          transform: 'translateZ(0)',
        }}
        rowHeight={200}
        gap={1}
      >
        {itemData.map((item) => {
          const cols = item.featured ? 2 : 1;
          const rows = item.featured ? 2 : 1;
  
          return (
            <ImageListItem key={item.img} cols={cols} rows={rows}>
              <img
                {...srcset(item.img, 250, 200, rows, cols)}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                sx={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                }}
                title={item.title}
                position="top"
                // actionIcon={
                //   <IconButton
                //     sx={{ color: 'white' }}
                //     aria-label={`star ${item.title}`}
                //   >
                //     <StarBorderIcon />
                //   </IconButton>
                // }
                actionPosition="left"
              />
            </ImageListItem>
          );
        })}
      </ImageList>
   </>
  );
}


//Gallery page images
//Images obtained from https://dog.ceo/dog-api 
const itemData = [
  {
    img: 'https://images.dog.ceo/breeds/chihuahua/n02085620_575.jpg',
    title: 'Chihuahua',
    author: 'https://dog.ceo/dog-api/',
    featured: true,
  },
  {
    img: 'https://images.dog.ceo/breeds/redbone/n02090379_4673.jpg',
    title: 'Redbone',
    author: 'https://dog.ceo/dog-api/',
  },
  {
    img: 'https://images.dog.ceo/breeds/terrier-russell/little1.jpg',
    title: 'Terrier-russell',
    author: 'https://dog.ceo/dog-api/',
  },
  {
    img: 'https://images.dog.ceo/breeds/pitbull/pitbull dog.jpg',
    title: 'Pitbull',
    author: '@nolanissac',
  },
  {
    img: 'https://images.dog.ceo/breeds/dachshund/kaninchen-dachshund-953699_640.jpg',
    title: 'Dachshund',
    author: '@hjrc33',
  },
  {
    img: 'https://images.dog.ceo/breeds/chihuahua/n02085620_3826.jpg',
    title: 'Chihuahua',
    author: '@arwinneil',
    featured: true,
  },
  {
    img: 'https://images.dog.ceo/breeds/cockapoo/bubbles1.jpg',
    title: 'Cockapoo',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.dog.ceo/breeds/chihuahua/n02085620_2981.jpg',
    title: 'Chihuahua',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.dog.ceo/breeds/sheepdog-english/n02105641_9225.jpg',
    title: 'Sheepdog-english',
    author: '@silverdalex',
  },
  {
    img: 'https://images.dog.ceo/breeds/greyhound-italian/n02091032_11549.jpg',
    title: 'Greyhound-italian',
    author: 'https://dog.ceo/dog-api/',
  },
  {
    img: 'https://images.dog.ceo/breeds/greyhound-italian/n02091032_8244.jpg',
    title: 'Greyhound-italian',
    author: 'https://dog.ceo/dog-api/',
  },
  {
    img: 'https://images.dog.ceo/breeds/germanshepherd/n02106662_9735.jpg',
    title: 'Germanshepherd',
    author: 'https://dog.ceo/dog-api/',
  },
];
