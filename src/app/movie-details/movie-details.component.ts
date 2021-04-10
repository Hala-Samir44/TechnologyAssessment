import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movieID:number=0;
movieDetail:any;
movie:any;
apiKey="";
  constructor(private HttpClient: HttpClient,private activeRoute:ActivatedRoute)  {
    this.movieID =activeRoute.snapshot.params.id;
    this.apiKey = localStorage.getItem("apiKey")??"";
   }

  ngOnInit(): void {
    this.bringMovieDetail();
  }

  bringMovieDetail(){
    this.HttpClient.get('https://api.themoviedb.org/3/movie/'+this.movieID+'?api_key='+this.apiKey)
    .subscribe((result: any) => {
      this.movie = result;
       this.movieDetail =result;
      console.log("xx",this.movie);
      console.log("YY",this.movieDetail);
    })
  }

  
  isLiked(movId: number): boolean {
    var LikedMovies: number[] = JSON.parse(localStorage.getItem("LikedMovies") ?? '');
    return LikedMovies?.includes(movId);
  }
  isFavor(movId: number): boolean {
    var FavorMovies: number[] = JSON.parse(localStorage.getItem("FavorMovies") ?? '');
    return FavorMovies?.includes(movId);
  }

  LikedOrNot(like: boolean, movId: number) {
    var LikedMovies: number[] = JSON.parse(localStorage.getItem("LikedMovies") ?? '');
    if (!like) {
      LikedMovies = LikedMovies.filter(i => i != movId);
    } else {
      LikedMovies.push(movId);
    }
    localStorage.setItem("LikedMovies", JSON.stringify(LikedMovies));
  }

  FavorOrNot(favor: boolean, movId: number) {
    var FavorMovies: number[] = JSON.parse(localStorage.getItem("FavorMovies") ?? '');
    if (!favor) {
      FavorMovies = FavorMovies.filter(i => i != movId);
    } else {
      FavorMovies.push(movId);
    }
    localStorage.setItem("FavorMovies", JSON.stringify(FavorMovies));
  }


}
