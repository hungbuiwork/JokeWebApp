import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import * as handTrack from 'handtrackjs';
import { PredictionEvent } from '../prediction-event';

@Component({
  selector: 'app-handtracker',
  templateUrl: './handtracker.component.html',
  styleUrls: ['./handtracker.component.css']
})
export class HandtrackerComponent implements OnInit {
  @Output() onPrediction = new EventEmitter<PredictionEvent>();
  @ViewChild('htvideo') video: ElementRef;

  /*
  SAMPLERATE determines the rate at which detection occurs (in milliseconds)
  500, or one half second is about right, but feel free to experiment with faster
  or slower rates
  */
  SAMPLERATE: number = 100;

  detectedGesture: string = "None"
  width: string = "400"
  height: string = "400"

  private model: any = null;
  private runInterval: any = null;

  //handTracker model
  private modelParams = {
    flipHorizontal: false, // flip e.g for video
    maxNumBoxes: 20, // maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppression
    scoreThreshold: 0.63, // confidence threshold for predictions.
  };

  private startOpenHandPos: any;//start hand position(to track swiping)
  private currOpenHandPos: any; //current hand position(to track swiping)
  private recentOpenHandTime: any;//stores the recentmost time in which a hand was opened(for swiping functionality)
  private swipeDir: any;          //stores what the current swiping direction is
  private previouslyEmitted: any; //stores previously emitted event string
  public status:string = "Loading Page Components...";

  constructor() {
  }

  ngOnInit(): void {
    handTrack.load(this.modelParams).then((lmodel: any) => {
      this.model = lmodel;
      console.log("Loaded");
      this.status = "Successfully Loaded";
    });
  }

  ngOnDestroy(): void {
    this.model.dispose();
  }

  startVideo(): Promise<any> {
    this.status = "Loading Video"
    return handTrack.startVideo(this.video.nativeElement).then(function(status: any) {
      return status;
    }, (err: any) => { return err; })
    .then(this.status = "Video Successfully Loaded");
  }

  startDetection() {
    this.startVideo().then(() => {
      //The default size set in the library is 20px. Change here or use styling
      //to hide if video is not desired in UI.
      this.video.nativeElement.style.height = "200px"
      this.status = "Started Predictions";
      console.log("starting predictions");
      this.runInterval = setInterval(() => {
        this.runDetection();
      }, this.SAMPLERATE);
    }, (err: any) => { console.log(err); });
  }

  stopDetection() {
    this.status = "Stopped Predictions";
    console.log("stopping predictions");
    clearInterval(this.runInterval);
    handTrack.stopVideo(this.video.nativeElement);
  }

  /*
    runDetection demonstrates how to capture predictions from the handTrack library.
    It is not feature complete! Feel free to change/modify/delete whatever you need
    to meet your desired set of interactions
  */
  runDetection() {
    if (this.model != null) {
      let predictions = this.model.detect(this.video.nativeElement).then((predictions: any) => {
        if (predictions.length <= 0) return;

        let openhands = 0;
        let closedhands = 0;
        let pointing = 0;
        let pinching = 0;
        for (let p of predictions) {
          if (p.label == 'open') {
            openhands++;
            //For swiping functionality and detecting movement
            this.startOpenHandPos = this.currOpenHandPos;
            this.currOpenHandPos = p.bbox;
          }

          if (p.label == 'closed') closedhands++;
          if (p.label == 'point') pointing++;
          if (p.label == 'pinch') pinching++;

        }
        if (openhands == 1) {
          this.recentOpenHandTime = new Date().getTime();
        }
        // These are just a few options! What about one hand open and one hand closed!?


        //This section is for detecting left and right swipes. If enough
        //time has passed since one hand has been on the screen
        //resets the start pos, current pos, times, and swipe directions to allow for
        //other actions to occur
        if (openhands == 0 || openhands == 2 && this.startOpenHandPos != null) {
          let currentTime = new Date().getTime();
          if (currentTime - this.recentOpenHandTime > 500)
          {
            this.startOpenHandPos = null;
            this.currOpenHandPos = null;
            this.recentOpenHandTime = null;
            this.swipeDir = null;
          }
        }
        //////////////////////////////////////////////
        if (this.swipeDir) {
          //if in the process of swiping, just return the swipe direction,
          //no need to emit a new event
          return this.swipeDir
        }

        if (openhands > 1) this.detectedGesture = "Two Open Hands";
        else if (openhands == 1) {
          this.detectedGesture = "Open Hand";
        }

        if (closedhands > 1) this.detectedGesture = "Two Closed Hands";
        else if (closedhands == 1) this.detectedGesture = "Closed Hand";

        if (pointing > 1) this.detectedGesture = "Two Hands Pointing";
        else if (pointing == 1) this.detectedGesture = "Hand Pointing";

        if (openhands == 0 && closedhands == 0 && pointing == 0 && pinching == 0)
          this.detectedGesture = "None";

        //Next two lines detect whether we are swiping left or right
        if (openhands == 1 && this.startOpenHandPos && this.startOpenHandPos[0] > this.currOpenHandPos[0]) {
          //Once swiping direction has been set, it cannot be changed until time has passed
          //with no open hand on the screen
          this.swipeDir = "Swiping right";
          this.detectedGesture = "Swiping right";
        }
        else if (openhands == 1 && this.startOpenHandPos && this.currOpenHandPos[0] > this.startOpenHandPos[0]) {
          this.swipeDir = "Swiping Left";
          this.detectedGesture = "Swiping left";
        }

        if (this.previouslyEmitted != this.detectedGesture){
          //IMPORTANT: ONLY EMIT STUFF THAT IS NEW! Prevents repeated gestures being emitted.
          this.previouslyEmitted = this.detectedGesture;
          this.onPrediction.emit(new PredictionEvent(this.detectedGesture));
        }


      }, (err: any) => {
        console.log("ERROR")
        console.log(err)
      });
    } else {
      console.log("no model")
    }
  }
}
