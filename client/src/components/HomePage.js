import React, { useState, useEffect } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { connect } from 'react-redux'
import NavBarComponent from './NavBarComponent';

// import getApod from '../services/getApod'

function HomePage(props) {
  const [picture, setPicture] = useState('picture is loading...');
  const token = props.auth.stsTokenManager.accessToken;
  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:8080/picture/getApod', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then(
        (picture) => picture.json()).then((picture) => {
          debugger
          setPicture(picture)
        }).catch(err => { return err })
    }
    fetchData();
  }, []);


  const logout = async () => {
    const response = await firebase.logout()
    console.log(response)
  }
  const firebase = useFirebase()
  return (
    <div>
      <NavBarComponent></NavBarComponent>

      {
        picture.pictureApi ?
          picture.pictureApi.media_type === "image" ?
            <img alt="imageApod" src={picture.pictureApi.url} width="20%" />
            :
            <iframe src={picture.pictureApi.url}
              frameBorder='0'
              allow='autoplay; encrypted-media'
              allowFullScreen
              width="100%"
              height="100vh" />
          :
              ""
      }
      {/* <button onClick={logout}>logout</button> */}

    </div>
  );
};

const enhance = connect(
  // Map redux state to component props
  ({ firebase: { auth, profile } }) => ({
    auth,
    profile
  })
)(HomePage)


export default enhance