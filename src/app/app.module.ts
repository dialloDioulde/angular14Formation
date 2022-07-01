import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { MatSliderModule } from '@angular/material/slider';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";

import { ReactiveFormsModule, FormsModule  } from "@angular/forms";

import {RouterModule, Routes} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {AuthGuard} from "./shared/auth.guard";
import {RegisterLoginGuard} from "./shared/register-login.guard";
import {UserRoleGuard} from "./shared/user-role.guard";
import {Role} from "./models/role";
import { PostComponent } from './components/post/post.component';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent, canActivate: [RegisterLoginGuard], },
  { path: 'login', component: LoginComponent, canActivate: [RegisterLoginGuard], },
  { path: 'user-profile/:id', component: UserProfileComponent, canActivate: [UserRoleGuard], data: { roles: [Role.User] },},
  { path: 'posts', component: PostComponent, canActivate: [AuthGuard]},

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    UserProfileComponent,
    PostComponent,
    DialogComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatSliderModule,
        MatToolbarModule,
        MatButtonModule,
        [RouterModule.forRoot(routes)],
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
        MatDialogModule,
        HttpClientModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
    ],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
