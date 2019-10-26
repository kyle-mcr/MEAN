import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  cakes: any = [{ baker: "",  url: "" }];
  cake: any = { baker: "", 
  url: "",
  ratings: { rating: "", comment: "" }
};
  myobjects: any = [{ rating: "", comment: "" }];
  myobj: any = { rating: "", comment: "" };
  avg: number;
  
  constructor(
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  ngOnInit() {
    this.getAllCakes()
    this.getAllObjects()
  }

  getAllObjects() {
    let observable = this.http.findAll()
    observable.subscribe(data => {
      this.myobjects = data;
    })
  }
  
  getAllCakes() {
    let observable = this.http.findAllcakes()
    observable.subscribe(data => {
      console.log(data);
      this.cakes = data;
    })
  }

  deleteCake(x) {
    let observable = this.http.deleteCake(x);
    observable.subscribe(data => {
      console.log(data)
      this.getAllCakes()
    })
  }
  ratingShow(id) {
    let observable = this.http.findOne(id);
    observable.subscribe(data => {
      this.myobj = data;
      console.log(this.myobj);
      this.cakeShow(id)
    })
  }
  cakeShow(id) {
    let observable = this.http.findOnecake(id);
    observable.subscribe(data => {
      this.cake = data;
      console.log(this.cake);
    })
  }
  submitForm1() {
    let observable = this.http.createCake(this.cake);
    observable.subscribe(data => {
      console.log(data);
    })
  }

  rate() {
    let observable = this.http.create(this.myobj);
    observable.subscribe(data => {
      console.log(data);
      this.getAllObjects()
      
    })
  }
}