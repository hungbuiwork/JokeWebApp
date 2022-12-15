import { Component, OnInit , ViewChild} from '@angular/core';
import { PredictionEvent } from '../prediction-event';
import { JokesGeneratingInterfaceComponent} from '../components/jokes-generating-interface/jokes-generating-interface.component'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @ViewChild(JokesGeneratingInterfaceComponent) jokesInterface: JokesGeneratingInterfaceComponent;
  gesture: String = ""; //the current gesture received
  viewImageSources = false; //A toggle to show credits for images
  constructor() {
  }

  ngOnInit(): void {
  }

  prediction(event: PredictionEvent){
    //upon receiving an event, call the corresponding function
    this.gesture = event.getPrediction();
    console.log(`EVENT RECEIVED: ${this.gesture}`);

    if (this.gesture == "Swiping left"){
      this.jokesInterface.prev();
    }
    else if (this.gesture == "Swiping right"){
      this.jokesInterface.next();
    }
    else if (this.gesture == "Closed Hand"){
      this.jokesInterface.reveal();
    }
    else if (this.gesture == "Two Hands Pointing"){
      this.jokesInterface.discardAll();   //might change later
    }
    else if (this.gesture == "Two Open Hands"){
      this.jokesInterface.generateJokes();
    }
    else if (this.gesture == "Hand Pointing"){
      this.jokesInterface.favorite();
    }
    if(this.gesture == "Two Closed Hands"){
      this.jokesInterface.zoom();
    }
    else{
      this.jokesInterface.unzoom();
    }

    /*
    if (this.previousGesture != this.gesture){
      this.eventAlreadyHandled = false; //if a new gesture is given, allow
    }
    if (!this.eventAlreadyHandled){
        if(this.gesture = "Swiping Right"){
          this.jokesInterface.next();
        }
        else if (this.gesture = "Swiping Left"){
          this.jokesInterface.prev();
        }
      this.eventAlreadyHandled = true;
    }
    */

  }

}
