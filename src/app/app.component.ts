import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'MesProduits';

  constructor (public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.loadToken();
    if (this.authService.getToken()==null || this.authService.isTokenExpired())
      this.router.navigate(['/login']);
    this.authService.saveToken(this.authService.getToken());
    /*let isloggedin: string;
    let loggedUser:string;
    isloggedin = localStorage.getItem('isloggedIn') !;
    loggedUser = localStorage.getItem('loggedUser') !;
    if (isloggedin!="true" || !loggedUser)
      this.router.navigate(['/login']);
    else
      this.authService.setLoggedUserFromLocalStorage(loggedUser);*/
  }

  onLogout(){
    this.authService.logout();
  }
}
