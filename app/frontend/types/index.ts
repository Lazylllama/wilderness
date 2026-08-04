export type FlashData = {
  notice?: string
  alert?: string
}
export type User = {
  id: number
  name: string
  email: string
  slack_id: string|null
  verification_status:string|null
}
export type SharedProps = {
  user: User|null
}