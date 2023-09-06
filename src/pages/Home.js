import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Card from '@mui/material/Card';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Fab from '@mui/material/Fab';
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";


import { Amplify, Auth } from 'aws-amplify';
import { API } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { post } from 'axios'  
import axios from 'axios';


// budget의 경우 좀 복잡하게 해놨는데, 슬라이더의 값을 지수적으로 증가시키기 위해서
// 아래 함수를 썼음. 어차피 textinput으로 받을테니 아래 무시해도 됨
function calculateValue(value) {
    return Math.round(value**1.1)*1000;
  }
  
// 아래 함수도 budget value에 원을 붙이기 위해서 했음, 무시 가능
function valueLabelFormat(value) {
    const units = ['원'];
  
    let scaledValue = value;
  
  
    return `${scaledValue} ${units[0]}`;
  }


  
export default function Home() {

    //value는 예산을 뜻함
    const [value, setValue] = React.useState(10);

    // movePage는 result페이지로 넘어가는 기능임
    const movePage = useNavigate();


    //handlechange는 뭔지 까먹음,,
    const handleChange2 = (event, newValue) => {
      if (typeof newValue === 'number') {
        setValue(newValue);
      }
    };
  
    const handleChange = (event) => {
      typesetState({
        ...typestate,
        [event.target.name]: event.target.checked,
      });
    };

    // typestate의 초기 설정
    const [typestate, typesetState] = React.useState({
      소파: true,의자: false,옷장: false,러그: false,책상: false,선반: false,수납장: false,침대: false,조명: false,
      Black: true,White: false, Wood: false, Red: false, Green: false, Blue: false
    });
  

    // typestate 선언
    const {소파,의자,옷장,러그,책상,선반,수납장,침대,조명} = typestate;
    // 만약 true로 되어있는게 4보다 작으면 error가 true가 돼서 에러 메세지를 띄울 수 있게끔
    const error1 = [소파,의자,옷장,러그,책상,선반,수납장,침대,조명].filter((v) => v).length <= 3;
  
    const {Black, White, Wood, Red, Green, Blue} = typestate;
    const error2 = [Black, White, Wood, Red, Green, Blue].filter((v) => v).length === 0;
    
    //Auth.user는 현재 로그인한 유저의 정보를 반환하는 함수, 여기서 username(email 등도 가능)을 뒤에 붙이면
    //유저의 아이디를 반환
    const userinfo = Auth.user.username
    
    // [true, false, false, true..] 형식의 typestate를 [1,3,5,8..]등의 형태로 반환!
    // 용도: API CALL을 하기 전에 furniture_preference와 color_preference를 API CALL이 요구하는 형식으로 변환하려고 사용
    // 원리는 list[index]가 참이라면 배열의 인덱스 넘버를 리스트에 추가하는거임
    function convert_list(list){
        var arr = []; 

        for(let index = 0; index < list.length; index++) {
            if(list[index] === true) {
                arr.push(index+1)
            }
        }
        return arr
    }

    // API 서버에 post method로 API CALL을 날려서 가구 조합 정보를 받아옴
    // input: user는 유저 아이디, fp와 cp는 가구취향,컬러취향배열 [convert_list로 변환해야댐],money는 예산
    
    function generate(user,fp,cp,money) {
        // error1와 error2가 둘다 false라면 발동
        if(!error1 & !error2){
          
        //axios라는 라이브러리로 api call을 날리는 거임, 추가 설치 아마도 필요

        axios.post( 'https://roombi-proxy-6704c33e2b30.herokuapp.com/http://43.201.25.85:5000/combination/getcombination', 
            { 
              // 이 부분은 post 메소드의 input을 지정함. 
            user_id: user, 
            furniture_preference: fp,
            color_preference: cp,    
	        money: money
            }, 
            // 헤더는 json형식임을 지정함. 바꾸지 않아도 댐
            { 
            headers:{ 
                'Content-type': 'application/json', 
                'Accept': 'application/json' 
                } 
                } 
            ) 
            //response 메세지가 온다면 then이 발동
            .then(function(response) {
              //response는 반환된 response message를 뜻함. response.data로 response message의 본문, 즉 가구조합 json을 가져올 수 있음 
                var r = response.data
                console.log("");
                console.log("RESPONSE : " + r);
                console.log("");
                // Result.js 페이지로 이동! 그리고 state는 이동하면서 상태 정보 또한 같이 넘기는건데, data를 response.data로 넘기므로싸
                // 가구조합 json 정보를 페이지 이동하면서 같이 넘겨주는 거임
                movePage('/result', { state: { data: r} })

            })
            //에러날 경우
            .catch(function(error) {
                console.log("");
                console.log("ERROR : " + JSON.stringify(error));
                console.log("");
            });
        }
      }


    return (
      // authenticator로 감싸서 로그인 안되어 있으면 안에 내용을 볼 수 없게
      <Authenticator signUpAttributes={[
        'email',
      ]} variation="modal">
        {({ signOut, user }) => (

          <div>
          {/* 유저 정보를 userinfo로 지정했으니, "Hello, <유저아이디>" 형식으로 뜸 */}
            <Typography id="input-slider" gutterBottom>
          Hello, {userinfo}
            </Typography>
          <Box sx={{width: 500,height: 300}}>   


          <FormControl
          required
          error={error1}
          component="fieldset"
          variant="standard"
          >
          <FormLabel component="legend">선호하는 가구 종류를 골라주세요</FormLabel>
          <FormGroup>
          <Grid container >

            {/* 여기는 체크박스형식으로 구현했는데, 체크할 경우 가구에 해당되는 typestate가 true,false로 바뀌게 했음 */}
            <FormControlLabel
              control={
                <Checkbox checked={소파} onChange={handleChange} name="소파" />
              }
              label="소파"
            />
            <FormControlLabel
              control={
                <Checkbox checked={의자} onChange={handleChange} name="의자" />
              }
              label="의자"
            />
            <FormControlLabel
              control={
                <Checkbox checked={옷장} onChange={handleChange} name="옷장" />
              }
              label="옷장"
            />
            <FormControlLabel
              control={
                <Checkbox checked={러그} onChange={handleChange} name="러그" />
              }
              label="러그"
            />
            <FormControlLabel
              control={
                <Checkbox checked={책상} onChange={handleChange} name="책상" />
              }
              label="책상"
            />
            <FormControlLabel
              control={
                <Checkbox checked={선반} onChange={handleChange} name="선반" />
              }
              label="선반"
            />
            <FormControlLabel
              control={
                <Checkbox checked={수납장} onChange={handleChange} name="수납장" />
              }
              label="수납장"
            />
            <FormControlLabel
              control={
                <Checkbox checked={침대} onChange={handleChange} name="침대" />
              }
              label="침대"
            />
            <FormControlLabel
              control={
                <Checkbox checked={조명} onChange={handleChange} name="조명" />
              }
              label="조명"
            />
          </Grid>
          </FormGroup>
          <FormHelperText>최소 4개 이상 선택</FormHelperText>
          </FormControl>
        
        <Box sx={{width: 500,height: 20}}></Box>
  
        <FormControl
          required
          error={error2}
          component="fieldset"
          variant="standard"
          >
          <FormLabel component="legend">선호하는 색상을 골라주세요</FormLabel>
          <FormGroup>
          <Grid container >
            <FormControlLabel
              control={
                <Checkbox checked={Black} onChange={handleChange} name="Black" />
              }
              label="Black"
            />
            <FormControlLabel
              control={
                <Checkbox checked={White} onChange={handleChange} name="White" />
              }
              label="White"
            />
            <FormControlLabel
              control={
                <Checkbox checked={Wood} onChange={handleChange} name="Wood" />
              }
              label="Wood"
            />
            <FormControlLabel
              control={
                <Checkbox checked={Red} onChange={handleChange} name="Red" />
              }
              label="Red"
            />
            <FormControlLabel
              control={
                <Checkbox checked={Green} onChange={handleChange} name="Green" />
              }
              label="Green"
            />
            <FormControlLabel
              control={
                <Checkbox checked={Blue} onChange={handleChange} name="Blue" />
              }
              label="Blue"
            />
          </Grid>
          </FormGroup>
          <FormHelperText>최소 1개 이상 선택</FormHelperText>
          </FormControl>
        
        <Box sx={{width: 500,height: 20}}></Box>
  
        <Typography id="input-slider" gutterBottom>
          예산: {valueLabelFormat(calculateValue(value))}
        </Typography>
            <Slider
              aria-label="Always visible"
              defaultValue={100000}
              // getAriaValueText={valuetext}
              valueLabelFormat={calculateValue(value)+"원"}
              value={value}
              step={10}
              min={8}
              max={1002}
              valueLabelDisplay="auto"
              scale={calculateValue}
              onChange={handleChange2}
            />


            {/* Generate버튼을 누르면 generate 함수가 발동되게 댐 */}
            {/* convert_list로 typestate 형식으로 되어있는 배열을 API 서버가 요구하는 리스트 형식으로 변환했음 */}
            {/* calculate_value 부분은 무시하고 예산을 넣으면 댐  */}
            <Fab variant="extended" size="medium" color="primary" aria-label="add" onClick={() => generate(userinfo,convert_list([소파,의자,옷장,러그,책상,선반,수납장,침대,조명]),convert_list([Black, White, Wood, Red, Green, Blue]),calculateValue(value))}>
            <BedroomChildIcon sx={{ mr: 1 }} />
            Generate
            </Fab>
              
            <Fab variant="extended" size="medium" color="error" aria-label="add" onClick={() => signOut()}>
            <FavoriteIcon sx={{ mr: 1 }} />
            Heartlist
            </Fab>
            
            <Fab variant="extended" size="medium" color="red" aria-label="add" onClick={() => signOut()}>
            Logout
            </Fab>
            
            {/* <Typography>{colors.join(",")}</Typography> */}
            </Box>
            </div>
        )}
      </Authenticator>
    );
  }