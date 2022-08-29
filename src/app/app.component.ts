import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { initializeApp } from "firebase/app";
import { deleteToken, getMessaging, getToken, isSupported, onMessage} from "firebase/messaging";
import { notificationService } from './service/notification.service';

//firebaseConfig
const firebaseConfig = {
  apiKey: "AIzaSyAPP5OiuGNVdUMlqWlzwB_YD5QUrz49_aw",
  authDomain: "demonoti-a9620.firebaseapp.com",
  projectId: "demonoti-a9620",
  storageBucket: "demonoti-a9620.appspot.com",
  messagingSenderId: "290295382590",
  appId: "1:290295382590:web:70d10d9d2e8699b19e076f",
  measurementId: "G-PXD7JCEEHK"
};


const app = initializeApp(firebaseConfig);

// Firebase cloud message web push Key pair
const fcmPublickey = "BLbGCSH8WrCmpBV_nhhYQJPCkKJZXbw8Bt2NQcpHNVxDISPqt0b8Tv6HtqrOzALlIoJ1JMLKZZxabSZwd45AYQo"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'demoNoti';
  message : any =null;
  token : String | undefined;
  email = new FormControl(null);

  constructor(private notiService: notificationService){}

  ngOnInit(){
    // if(this.isNotificationGranted()){
    // this.tokenRequest();
    // }
    this.listen();
  }

  async requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      this.tokenRequest();
    }
  }
  )
}

//Listen notification from firebase
async listen () {
  const messaging = await isSupported() ? getMessaging(app) : null;
  if(messaging){
  onMessage(messaging, (payload) => {
    let title : string;
    let body : string;
    let imageurl : string;
    console.log('Message received. ', payload);
    this.message=payload;
    title = payload.notification?.title !== undefined ? payload.notification.title : '';
    body = payload.notification?.body !== undefined ? payload.notification.body : '';
    imageurl = payload.notification?.image !== undefined ? payload.notification.image : '';
    const notification = new Notification(title, {body : body , icon : imageurl});
  });

}
}

isNotificationGranted(){
  return Notification.permission === 'granted'
}
// Pure token request function
tokenRequest(){
    console.log('getting token')
    const messaging = getMessaging();
    getToken(messaging, {vapidKey: fcmPublickey }).then(
    (token) => {
      if (token) {
        console.log("Token Got : " + token);
        this.token = token
      } else {
        console.log("Token not found please add one");
      }
    }
  ).catch((err) => {
    console.error(err)
  })
}

  login(){
    console.log('getting token')
    const messaging = getMessaging();
    getToken(messaging, {vapidKey: fcmPublickey }).then(
    (token) => {
      if (token) {
        console.log("Token Got : " + token);
        let tokenInfo = {
          token : token,
          email : this.email.value
        }
        this.notiService.subscibeToDB(tokenInfo)
      } else {
        console.log("Token not found please add one");
      }
    }
  ).catch((err) => {
    console.error(err)
  })
}
}



