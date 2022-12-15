import { Injectable } from '@angular/core';
import {Joke} from '../data/joke'
import { HttpClient} from '@angular/common/http';





@Injectable({
  providedIn: 'root'
})
export class JokeGeneratorService {
  //The joke generator service calls to an API to request 10 jokes.
  private jokes: Joke[] = [];
  private requestURL:string = 'https://v2.jokeapi.dev/joke/Programming?type=twopart&amount=10';
  private idx: number = 0; //idx of the current joke being displayed
  private status: string = ""; //the status of the service, and what it is currently doing/has Successfully done
  constructor(private http: HttpClient) { }


  generateJokes(){
    this.status = "Generating jokess from API..."
    let jokeResponse = this.http.get(this.requestURL).toPromise();
    jokeResponse.then((data: any)=>{
      for (var joke of data.jokes){
        this.jokes.push(new Joke(joke));
      }
    }).then(()=>{
      this.status = "Successfully generated jokes!"
      if (this.idx == -1){
        this.idx = 0;
      }
    })
    ;
  }

  discardJokes(){
    this.jokes.length = 0; //discards all jokes and references to jokes
    this.idx = -1;
    this.status = "Discarded all jokes!"
  }

  moveIdx(val:number){
    console.log("Call to moveidc")
    console.log(this.idx)
    if (this.idx == -1){
      return;
    }
    this.idx += val
    if (this.idx > this.jokes.length - 1){
      this.idx =  this.idx % (this.jokes.length)
    }
    else if(this.idx < 0){
      this.idx += this.jokes.length
    }
        console.log(this.idx)
  }

  moveCurrentJoke(){
    var joke = this.getCurrentJoke()
    if (joke){
      this.moveIdx(1);
    }
    return joke

  }

  getCurrentJoke(){
    if (this.jokes[this.idx] != undefined){
      return this.jokes[this.idx]
    }
    return null
  }

  revealCurrentJoke(){
    if (this.jokes[this.idx] != undefined){
      this.jokes[this.idx].revealed = true;
    }
  }

  favoriteCurrentJoke(){
    if (this.jokes[this.idx] != undefined){
      this.jokes[this.idx].favorited = true;
    }
  }

  unfavoriteCurrentJoke(){
    if (this.jokes[this.idx] != undefined){
      this.jokes[this.idx].favorited = false;
    }
  }
  unfavoriteJoke(jokeId:number){
    this.jokes.forEach((joke, index) => {
      if (joke.id == jokeId){
        joke.favorited = false;
      }
    })
  }

  get CurrentJokeSetup(){
    if (this.jokes[this.idx] != undefined){
      return this.jokes[this.idx].setup
    }
    return "No joke is currently loaded"
  }
  get CurrentJokeDelivery(){
    if (this.jokes[this.idx] != undefined){
      if (this.jokes[this.idx].revealed){
        return this.jokes[this.idx].delivery
      }
      else{
        return ""
      }
    }
    return ""
  }

  get length(){
    return this.jokes.length
  }

  get activeIndex(){
    if (this.jokes.length == 0){
      return -1
    }
    return this.idx
  }
  get statusString(){
    return this.status
  }

  get isFavorite(){
    if (this.jokes[this.idx] != undefined){
      return this.jokes[this.idx].favorited
    }
    return false
  }




}
