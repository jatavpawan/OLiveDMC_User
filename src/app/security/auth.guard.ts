import { AuthenticationService } from './../providers/authentication/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, RoutesRecognized, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
// import { RoutesRecognized } from '#angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { ShareService } from '../providers/sharedService/share.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthenticationService,
    private shareService: ShareService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    debugger;
    if (this.auth.isLoggedIn()) {
      let userData = JSON.parse(this.auth.getUserdata());
      if (userData.roleId == 1) {
        console.log("Admin");
        return true;
      }
      else {
        console.log("User")
        if (state.url.includes("private") == true) {
          alert("Please Sign with Admin");
          this.router.navigate(["/login"]);
          return false;
        }
        else {
        this.shareService.userLOggedInAction(true);
          return true;
        }
      }
    } else {
      this.shareService.userLOggedInAction(false);
      this.router.navigate(["/login"]);
      return false;
    }
  }

}
