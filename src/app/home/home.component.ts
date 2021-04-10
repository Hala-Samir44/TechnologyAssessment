import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isFavorite = false;
  constructor(private HttpClient: HttpClient, private activeRoute: ActivatedRoute) {
    this.isFavorite = activeRoute.snapshot.params.isFavorite;
    this.apiKey = localStorage.getItem("apiKey")??"";
  }
  xx: any;
  movies: any = [];
  total_pages: number = 1;
  moviesNo = 5;
  pageNo = 1;

  apiKey="";
  filterd: string = "top_rated";
  mov: any;
  ngOnInit(): void {
    this.bringMovies(this.pageNo, this.filterd);

  }
  bringMovies(Pno: number, filterd: string) {
    if (this.isFavorite) {
      this.filterd = "My Favourite Movies";
      var favirIds = JSON.parse(localStorage.getItem("FavorMovies") ?? '');
      for (let i = 0; i < favirIds.length; i++) {
        this.HttpClient.get('https://api.themoviedb.org/3/movie/' + favirIds[i] + '?api_key='+this.apiKey+'&page=' + Pno)
          .subscribe((result: any) => {
            console.log("result", result);
            this.movies.push(result);
          })
      }
    } else {
      if (Pno > 0 && Pno <= this.total_pages) {
        this.HttpClient.get('https://api.themoviedb.org/3/movie/' + filterd + '?api_key='+this.apiKey+'&page=' + Pno)
          .subscribe((result: any) => {
            this.xx = result;
            this.movies = result['results'];
            console.log("lk", this.movies);
            this.filterd = filterd;
            this.total_pages = Math.ceil(this.movies.length / 6);
            this.pageNo = Pno;
          })
      }
    }

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

  numSequence(n: number): Array<number> {
    return Array(n);
  }
}
