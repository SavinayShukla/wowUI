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

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home', component: HomeComponent,
        children: [{ path: '', component: FeatureComponent, pathMatch: 'full' },
                   { path: 'results', component: ResultsComponent, pathMatch: 'full', children: [{ path: '', component: ResultcardComponent, pathMatch: 'full' }]},
                   { path: 'payment', component: PaymentComponent, pathMatch: 'full'},
                   { path: 'profile', component: ProfileComponent, pathMatch: 'full'},
                   { path: 'orders', component: OrdersComponent, pathMatch: 'full'}
                  ]
    },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'logout', redirectTo: 'home', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent, pathMatch: 'full' }
];
