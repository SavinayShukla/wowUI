import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ResultsComponent } from './pages/results/results.component';
import { FeatureComponent } from './pages/feature/feature.component';
import { ResultcardComponent } from './cards/resultcard/resultcard.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { cardSelectedGuardGuard } from './guards/card-selected-guard.guard';
import { authGuard } from './guards/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { profileGuardGuard } from './guards/profile-guard.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'any', component: NotFoundComponent, pathMatch: 'full'},
    {
        path: 'home', component: HomeComponent,
        children: [{ path: '', component: FeatureComponent, pathMatch: 'full' },
                   { path: 'results', component: ResultsComponent, pathMatch: 'full', 
                            children: [{ path: '', component: ResultcardComponent, pathMatch: 'full' }]},

                   { path: 'payment', component: PaymentComponent, canActivate: [authGuard, cardSelectedGuardGuard, profileGuardGuard], pathMatch: 'full'},
                   { path: 'profile', component: ProfileComponent, canActivate: [authGuard], pathMatch: 'full'},
                   { path: 'orders', component: OrdersComponent, canActivate: [authGuard], pathMatch: 'full'}
                  ]
    },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'logout', redirectTo: 'home', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent, pathMatch: 'full' },
    { path: 'user/verify/:uidb64/:token', component: VerifyEmailComponent, pathMatch: 'full' },
    { path: 'user/new-password/:uidb64/:token', component: NewPasswordComponent, pathMatch: 'full' },
    { path: '**', redirectTo: 'any' }
    
];
