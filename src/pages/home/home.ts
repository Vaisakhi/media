import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StreamingMedia, StreamingVideoOptions,StreamingAudioOptions  } from '@ionic-native/streaming-media';
import { Clipboard } from '@ionic-native/clipboard';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';


//google plus client id:523675779172-8qib11e33ugbjapm43he6nolbvfan0be.apps.googleusercontent.com
//reversed client id: com.googleusercontent.apps.523675779172-8qib11e33ugbjapm43he6nolbvfan0be
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
text :string;
  constructor(public navCtrl: NavController,private fb: Facebook,private googlePlus: GooglePlus,private clipboard: Clipboard,private streamingMedia: StreamingMedia) {

  }
  Clipboard(){
    this.clipboard.copy(this.text);

this.clipboard.paste().then(
   (resolve: string) => {
      alert(resolve);
    },
    (reject: string) => {
      alert('Error: ' + reject);
    }
  );
  }
  startVideo() {
    let options: StreamingVideoOptions = {
      successCallback: () => { alert('Finished Video') },
      errorCallback: (e) => { alert('Error: '+ e) },
      orientation: 'portrait'
    };
 
    // http://www.sample-videos.com/
    this.streamingMedia.playVideo('http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_30mb.mp4', options);
  }
 
  startAudio() {
    let options: StreamingAudioOptions = {
      successCallback: () => { alert('Finished Audio') },
      errorCallback: (e) => {alert('Error: '+ e) },
      initFullscreen: false // iOS only!
    };
 
    //http://soundbible.com/2196-Baby-Music-Box.html
    this.streamingMedia.playAudio('http://soundbible.com/grab.php?id=2196&type=mp3', options);
  }
 
  stopAudio() {
    this.streamingMedia.stopAudio();
  }
  googleplus(){
    this.googlePlus.login({})
  .then(res => alert(res))
  .catch(err => alert(err));
  }
//1639924172734827

facebook(){
  this.fb.login(['public_profile', 'user_friends', 'email'])
  .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
  .catch(e => console.log('Error logging into Facebook', e));

}
}
