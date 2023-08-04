import { useLocation } from 'react-router-dom';
import React  from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
// import { SwiperImage } from 'components';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useState } from 'react';


export default function Result(){
  // 1. useLocation 훅 취득
  const location = useLocation();

  // 2. location.state 에서 파라미터 취득
  const data = location.state.data
  var index = 0

  function plusindex(index){
    return index+1
}
    function return_image (d,i,n){
        var target = d[i]
        var url = ''
        switch(n) {
            case 1:
                url = target.product_id1.Image_URL;
                break;
            case 2:
                url = target.product_id2.Image_URL;
                break;
            case 3:
                url = target.product_id3.Image_URL;
                break;
            case 4:
                url = target.product_id4.Image_URL;
                break;  
            default:
                url = target.product_id1.Image_URL;
                break;
        }
        return url
    }

    function return_pricesum (d,i){
        var target = d[i]
        
        return target.price_sum
    }

    let [ind,setind] = useState(0);
    const onIncrease = () => {
        setind(ind + 1);
      }
  return (
    <div>
    
    <ImageList sx={{ width: 500, height: 500 }} cols={2} rowHeight={200}>
        <ImageListItem>
          <img
            src={`${return_image(data,index,1)}`}
            srcSet={`${return_image(data,ind,1)}`}
            alt={'first'}
            loading="lazy"
          />
        </ImageListItem>
        <ImageListItem>

          <img
            src={`${return_image(data,index,1)}`}
            srcSet={`${return_image(data,ind,2)}`}
            alt={'second'}
            loading="lazy"
          />
        </ImageListItem>
        <ImageListItem>
          <img
            src={`${return_image(data,index,1)}`}
            srcSet={`${return_image(data,ind,3)}`}
            alt={'third'}
            loading="lazy"
          />
        </ImageListItem>
        <ImageListItem>
          <img
            src={`${return_image(data,index,1)}`}
            srcSet={`${return_image(data,ind,4)}`}
            alt={'fourth'}
            loading="lazy"
          />
        </ImageListItem>
    </ImageList>

    <Typography>
        Price Sum: {return_pricesum(data,ind)}원
    </Typography>

    <Fab variant="extended" size="medium" color="primary" aria-label="add" onClick={onIncrease}>
            <NavigateNextIcon sx={{ mr: 1 }} />
            Next
            </Fab>
    
    </div>
  );
}
