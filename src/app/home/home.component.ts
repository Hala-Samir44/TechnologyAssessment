import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
isAll=false;
  constructor(private HttpClient: HttpClient,private activeRoute:ActivatedRoute) {
    this.isAll =activeRoute.snapshot.params.isAll;
   }
xx:any;
students:any;
total_pages:number=1;
studentsNo=5;
pageNo=1;

  ngOnInit(): void {
    this.bringStudent(this.pageNo,this.studentsNo)
  }
  bringStudent(Pno:number,Sno:number){
    if(Pno>0 && Pno <= this.total_pages){
      this.HttpClient.get('https://reqres.in/api/users?page='+Pno+'&per_page='+Sno)
      .subscribe((result: any) => {
        this.xx = result;
        this.students =  result['data'];
        this.total_pages =  result['total_pages'];
        this.studentsNo = Sno;
        this.pageNo = Pno;
      })
    }
  }

  goToStudentDetail(id:number){

  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }
}
