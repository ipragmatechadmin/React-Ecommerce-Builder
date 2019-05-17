/**
 * User provide data
 *
 * @export
 * @class UserProvider
 */
export class UserProvider {

  constructor (
       public userId: string,
       public email: string,
       public fullName: string,
       public address: string,
       public city: string,
       public state: string,
       public zip: string,
       public region: string,
       public avatar: string,
       public providerId: string,
       public provider: string,
       public accessToken: string
    ) {}
}
