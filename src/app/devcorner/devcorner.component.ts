import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-devcorner',
  templateUrl: './devcorner.component.html',
  styleUrls: ['./devcorner.component.css']
})
export class DevcornerComponent implements OnInit {

  current:any[] = [
    {
        heading:"Test Heading",
        subsections:[
            {image:{src:"https://www.jqueryscript.net/images/Simplest-Responsive-jQuery-Image-Lightbox-Plugin-simple-lightbox.jpg",alt:"test image"}},
            "test paragraph"
        ]
    }
  ];

  text:string="";

  constructor(private forms:FormsModule) { }

  ngOnInit() {
  }

  printStuff(){
    console.log(this.current);
    this.text = JSON.stringify(this.current)
  }

}
