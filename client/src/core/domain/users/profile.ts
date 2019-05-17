import { BaseDomain } from 'core/domain/common'

export class Profile extends BaseDomain {
  constructor (
    public avatar: string,
    public fullName: string,
    public address: string,
    public city: string,
    public state: string,
    public zip: string,
    public region: string,
    public banner: string,
    public tagLine: string,
    public creationDate: number,
    public email?: string | null,
    public birthday?: number,
    public webUrl?: string,
    public companyName?: string,
    public twitterId?: string
  ) {
    super()

  }

}
