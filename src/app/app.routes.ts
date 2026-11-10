import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { LoginForm } from './auth/login-form/login-form';
import { RegisterForm } from './auth/register-form/register-form';

export const routes: Routes = [
    {
        path: '',
        component: Layout,
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'dashboard', loadComponent: () => import('./page/dashboard/dashboard').then((c)=> c.Dashboard)},
            {path: 'users', loadComponent: () => import('./features/users/components/user-list').then((u) => u.UserList)},
            {path: 'roles', loadComponent: () => import('./features/roles/components/role-list').then((r) => r.RoleList)},
            {path: 'admissionExam', loadComponent: () => import('./features/admission-exam/components/admission-exam').then(ae => ae.AdmissionExam)},
            {path: 'admissionExam/:careerId', loadComponent: () => import('./features/admission-exam/components/admission-exam').then(ae => ae.AdmissionExam)}
            
        ]
    },
    {
        path: 'login', component: LoginForm
    },
    {
        path: 'login/:status', component: LoginForm
    },
    {
        path: 'login/:status/:careerId', component: LoginForm
    },
    {
        path: 'register', component: RegisterForm
    },
    {
        path: 'register/:status', component: RegisterForm
    },
    {
        path: 'register/:status/:careerId', component: RegisterForm
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    },
];
