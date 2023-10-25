import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUser } from '../shared/models/user.interface';
import { ILoginRequest } from '../shared/models/loginRequest.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/models/userRegister.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<IUser>(this.getLocalStorageUser());
  public userObservable: Observable<IUser>;

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): IUser {
    return this.userSubject.value;
  }

  login(user: ILoginRequest): Observable<IUser> {
    return this.http.post<IUser>(`${environment.baseUrl}user/login`, user).pipe(
      tap({
        next: (user) => {
          console.log(user);
          this.userSubject.next(user);
          this.setLocalStorageUser(user);
          this.toastr.success(`Welcome ${user.name}`, 'login successful');
        },
        error: (error) => {
          this.toastr.error(error.error);
        },
      })
    );
  }

  logout() {
    this.userSubject.next(new IUser());
    localStorage.removeItem('user_food');
    window.location.reload();
  }

  register(user: IUserRegister): Observable<IUser> {
    return this.http
      .post<IUser>(`${environment.baseUrl}user/register`, user)
      .pipe(
        tap({
          next: (user) => {
            this.userSubject.next(user);
            this.setLocalStorageUser(user);
            this.toastr.success('Register successful!', `Welcome ${user.name}`);
          },
          error: (error) => {
            this.toastr.error(error.error);
          },
        })
      );
  }

  setLocalStorageUser(user: IUser) {
    localStorage.setItem('user_food', JSON.stringify(user));
  }

  getLocalStorageUser(): IUser {
    const userJson = localStorage.getItem('user_food');
    if (userJson) return JSON.parse(userJson) as IUser;
    return new IUser();
  }
}
