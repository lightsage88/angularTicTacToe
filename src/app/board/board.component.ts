import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares: any[]
  xIsNext: boolean;
  winner: string;
  
  //constructor runs immediately when class is created, dont generally do much but inject dependencies
  constructor() { }

  //lifecycle hook for intitial work that needs to be done in a component
  ngOnInit(): void {
    this.newGame();
  }

  //newgame's responsibility to set up initial values when starting a new game
  newGame() {
    this.squares = Array(9).fill(null)
    this.winner = null;
    this.xIsNext = true;
  }

  //create a computed-property by using a typescript 'getter', we call the property player.
  //If xIsNext is true, then next player will be X, otherwise it will be O
  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }
  
    this.winner = this.calculateWinner(); 
  }

  calculateWinner() {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];

    for(let i = 0; i < lines.length; i++) {
      const [a,b,c] = lines[i]
      if(
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a]
      }
    }
    return null;
  }
}
