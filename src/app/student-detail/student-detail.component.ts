import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {
studentID:number=0;
studentDetail:any;
student:any;
  constructor(private HttpClient: HttpClient,private activeRoute:ActivatedRoute)  {
    this.studentID =activeRoute.snapshot.params.id;
   }

  ngOnInit(): void {
   this.bringStudentDetail();
  }

  bringStudentDetail(){
    this.HttpClient.get('https://reqres.in/api/users/'+this.studentID)
    .subscribe((result: any) => {
      this.student = result;
      this.studentDetail =  result['data'];
      console.log("xx",this.student);
      console.log("YY",this.studentDetail);
    })
  }
}
