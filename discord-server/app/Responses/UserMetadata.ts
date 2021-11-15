import BaseResponse from './BaseResponse'

export default class UserMetadataResponse extends BaseResponse {
  public toJSON(): any {
    return {
      id: this.data.id,
      username: this.data.username,
      name: this.data.name,
      config: this.data.config,
      dms: this.getDms(),
    }
  }

  public getDms(): any {
    this.data.dms = this.data.dms1.concat(this.data.dms2)
    return this.data.dms.reduce((prev, current) => {
      if (current.user_one === this.data.id) {
        prev.push({
          id: current.id,
          dm_user_id: current.user_two,
          dm_user_username: current.userTwoData.username,
          dm_user_name: current.userTwoData.name,
          status: current.status,
        })
      } else {
        prev.push({
          id: current.id,
          dm_user_id: current.user_one,
          dm_user_username: current.userOneData.username,
          dm_user_name: current.userOneData.name,
          status: current.status,
        })
      }
      return prev
    }, [])
  }
}
