import { Component, Input } from '@angular/core';
import { JokeGeneratorService } from '../../services/joke-generator.service'
import { Joke } from '../../data/joke'
@Component({
  selector: 'app-jokes-generating-interface',
  templateUrl: './jokes-generating-interface.component.html',
  styleUrls: ['./jokes-generating-interface.component.css']
})
export class JokesGeneratingInterfaceComponent {
  mode: string = "search"; //either "search" "favorites", toggles between two tabs
  favorites: Map<number, Joke> = new Map();
  favoriteValues: Joke[] = [];
  feedbackString: string = "";
  constructor(public jokeService: JokeGeneratorService) {
    jokeService.generateJokes();
  }

  favorite(joke = this.jokeService.getCurrentJoke()) { //adds a joke to favorite list
    if (joke == null) {
      this.feedbackString = "There is no joke to favorite"
      return
    }
    else if (this.favorites.has(joke.id)) {
      this.favorites.delete(joke.id);
      this.favoriteValues = this.favoriteValues.filter(fav => fav.id != joke ?.id);
      this.jokeService.unfavoriteJoke(joke.id);
      this.feedbackString = "Removed joke from favorites"
      return
    }
    else {
      this.favorites.set(joke.id, joke);
      this.favoriteValues.push(joke);
      this.jokeService.favoriteCurrentJoke();
      this.feedbackString = "Added current joke to you favorites!!"
    }
  }

  indexString() {
    return `${this.jokeService.activeIndex + 1}/${this.jokeService.length}`
  }

  next() {
    this.jokeService.moveIdx(1);
    this.feedbackString = " ";
  }
  prev() {
    this.jokeService.moveIdx(-1);
    this.feedbackString = " ";
  }
  public discardAll() {
    this.jokeService.discardJokes();
        this.feedbackString = "";
  }

  generateJokes() {
    this.jokeService.generateJokes();
    this.feedbackString = "";
  }

  reveal() {
    this.jokeService.revealCurrentJoke()
  }
  zoom() {
    var jokes = document.getElementsByClassName('joke');
    jokes[0].classList.add("zoomed");
    jokes[1].classList.add("zoomed");
  }
  unzoom() {
    var jokes = document.getElementsByClassName('joke');
    jokes[0].classList.remove("zoomed");
    jokes[1].classList.remove("zoomed");

  }

  get setup() {
    return this.jokeService.CurrentJokeSetup
  }

  get delivery() {
    return this.jokeService.CurrentJokeDelivery
  }

  get status() {
    return this.jokeService.statusString
  }

  get favorited() {
    return this.jokeService.isFavorite;
  }
}
