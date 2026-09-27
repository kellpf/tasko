// @Component({
//   selector: 'app-user-profile',
//   template: `<p>{{ nomeExibido }}</p>`
// })
// export class UserProfileComponent implements OnInit {
//   private userService = inject(UserService);
//   private route = inject(ActivatedRoute);


//   user: any = null;
//   nomeExibido = '';

//   ngOnInit() {
//     const id = this.route.snapshot.paramMap.get('id');
//     this.userService.getUser(id).subscribe(u => {
//       this.user = u;
//       this.nomeExibido = u ? `Usuário: ${u.name}` : 'Carregando...';
//     });
//   }
// }