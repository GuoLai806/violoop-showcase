import { asset } from '../lib/asset'

export type CompanyLogo = {
  name: string
  shortName: string
  logo: string
  logoClass?: string
  current?: boolean
}

export const WORKED_AT_COMPANIES: CompanyLogo[] = [{
  name: 'Violoop',
  shortName: 'VIOLOOP',
  logo: asset('images/violoop/logo-white.png'),
  logoClass: 'max-w-[7.5rem]',
  current: true,
}]

export const CURRENT_COMPANY = WORKED_AT_COMPANIES[0]
export const PAST_COMPANIES: CompanyLogo[] = []
