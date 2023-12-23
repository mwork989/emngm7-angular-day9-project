import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { changeDivSize } from './changeDivSize';
import { balloonEffect } from './ballooneffect';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css'],
  animations:[changeDivSize,balloonEffect,

    trigger("EnterLeave", [
      state("flyIn", style({ transform: "translateX(0)" })),
      transition(":enter", [
        style({ transform: "translateX(-100%)" }),
        animate("0.5s 300ms ease-in")
      ]),
      transition(":leave", [
        animate("0.3s ease-out", style({ transform: "translateX(100%)" }))
      ])
    ])
  ]
})
export class AnimationComponent {
  public currentState :string;
  public currentStateofBalloon:string;
  public listItem :any[];
  public list_order: number;
  
  constructor(){
    this.currentState = "initial";
    this.currentStateofBalloon ='initial';
    this.listItem  = [];
    this.list_order = 1
  }

  public  changeState() {
    this.currentState = this.currentState === "initial" ? "final" : "initial";
  
  }

  public changeStateBalloon(){
    this.currentStateofBalloon = this.currentStateofBalloon === "initial" ? "final" : "initial";
  }

  public addItem():void {
    var listitem = "ListItem " + this.list_order;
    this.list_order++;
    this.listItem.push(listitem);
  }
  public removeItem():void {
    this.listItem.length -= 1;
  }

}
