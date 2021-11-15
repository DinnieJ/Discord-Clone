export default abstract class BaseResponse {
    protected data: any = null
    constructor(data) {
        this.data = data
        return this.toJSON()
    }

    protected abstract toJSON();
}