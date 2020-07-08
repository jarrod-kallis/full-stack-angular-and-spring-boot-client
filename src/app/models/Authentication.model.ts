export class Authentication {
  constructor(
    public authenticated: boolean = false,
    public username: string = '',
    public password: string = '',
    public token: string = ''
  ) { }
}
