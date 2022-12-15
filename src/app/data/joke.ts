export class Joke{
	setup: string;
  delivery: string;
  revealed = false;
	favorited = false;
	id: number;
	constructor(object: any) {
    this.setup = object.setup;
    this.delivery = object.delivery;
		this.id = object.id;
	}
}
