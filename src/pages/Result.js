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
  // 1. useLocation으로 movepage에서 정한 state를 불러옴
  const location = useLocation();

  // 2. location.state 에서 가구조합정보 데이터 가져옴
  const data = location.state.data

  // 가구 조합 인덱스는 var로 설정해서 바뀔수있게
  var index = 0

  // 인덱스를 증가시켜서 다음 가구조합으로 넘어감 
  function plusindex(index){
    return index+1
}

  // 해당함수는 가구의 이미지 url을 반환해주는 함수임
  //input : d는 가구조합정보데이터[data], i는 인덱스넘버[index], n은 몇번째 가구의 이미지를 표시할 것인지
  // n에 따라서 switch문으로 image_url을 반환한다
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

    // return pricesum은 현재 가구조합의 가격 총합을 반환해줌
    function return_pricesum (d,i){
        var target = d[i]
        
        return target.price_sum
    }

    

    //위에 index랑 똑같은건데.. 중복된듯
    let [ind,setind] = useState(0);


    // 배열의 인덱스를 증가시켜 다음 가구 조합으로 넘어가게 하는 함수
    const onIncrease = () => {
        setind(ind + 1);
      }


    
  return (
    <div>
    
    <ImageList sx={{ width: 500, height: 500 }} cols={2} rowHeight={200}>
        <ImageListItem>
          <img
            //모르고 src랑 srcset 둘다 해버림.. 하나만 해도 댐
            // laoding="lazy"로 해두면 레이지로딩이 돼서 이미지 로딩을 미리 하지않게 만들어서 렉을 방지함
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

    {/* 이 버튼은 onincrease 함수를 call해서 ind 값을 증가시켜 다음 가구조합으로 넘어가는 버튼임 */}
    <Fab variant="extended" size="medium" color="primary" aria-label="add" onClick={onIncrease}>
            <NavigateNextIcon sx={{ mr: 1 }} />
            Next
            </Fab>
    
    </div>
  );
}
