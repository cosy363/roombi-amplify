import { Amplify, Auth } from 'aws-amplify';
import { API } from 'aws-amplify';
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


import {  BrowserRouter, Route, Routes } from 'react-router-dom'
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { post } from 'axios'  
import axios from 'axios';


function calculateValue(value) {
    return Math.round(value**1.1)*1000;
  }
  
function valueLabelFormat(value) {
    const units = ['원'];
  
    let scaledValue = value;
  
  
    return `${scaledValue} ${units[0]}`;
  }


  
export default function Home() {
    const [value, setValue] = React.useState(10);
  
    const movePage = useNavigate();

    const handleChange2 = (event, newValue) => {
      if (typeof newValue === 'number') {
        setValue(newValue);
      }
    };
  
    const [typestate, typesetState] = React.useState({
      소파: true,의자: false,옷장: false,러그: false,책상: false,선반: false,수납장: false,침대: false,조명: false,
      Black: true,White: false, Wood: false, Red: false, Green: false, Blue: false
    });
  
    const handleChange = (event) => {
      typesetState({
        ...typestate,
        [event.target.name]: event.target.checked,
      });
    };
  
    const {소파,의자,옷장,러그,책상,선반,수납장,침대,조명} = typestate;
    const error1 = [소파,의자,옷장,러그,책상,선반,수납장,침대,조명].filter((v) => v).length <= 3;
  
    const {Black, White, Wood, Red, Green, Blue} = typestate;
    const error2 = [Black, White, Wood, Red, Green, Blue].filter((v) => v).length === 0;
    
    const userinfo = Auth.user.username
    
    function convert_list(list){
        var arr = []; 

        for(let index = 0; index < list.length; index++) {
            if(list[index] === true) {
                arr.push(index+1)
            }
        }
        return arr
    }

    function generate(user,fp,cp,money) {
        if(!error1 & !error2){
            
        axios.post( 'http://127.0.0.1:5006/combination/getcombination', 
            { 
            user_id: user, 
            furniture_preference: fp,
            color_preference: cp,    
	        money: money
            }, 
            { 
            headers:{ 
                'Content-type': 'application/json', 
                'Accept': 'application/json' 
                } 
                } 
            ) 
            .then(function(response) {
                var r = response.data
                console.log("");
                console.log("RESPONSE : " + r);
                console.log("");
                movePage('/result', { state: { data: r} })

            })
            .catch(function(error) {
                console.log("");
                console.log("ERROR : " + JSON.stringify(error));
                console.log("");
            });
        }
      }


    return (
      <Authenticator signUpAttributes={[
        'email',
      ]} variation="modal">
        {({ signOut, user }) => (

          <div>
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