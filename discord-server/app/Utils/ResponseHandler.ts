import { ResponseContract } from '@ioc:Adonis/Core/Response';
export default class ResponseHandler {
    public static sendResponse(response: ResponseContract, data, status = 200) {
        response.status(200).send({
            success: true,
            status,
            data,
            error: {},
            response_time: new Date().toTimeString()
        })
    }

    public static sendError(response, errorMessage, errCode = "ERR_BAD_REQUEST", status = 400) {
        response.status(status).send({
            success: false,
            status,
            data: {},
            error:{
                error_code: errCode,
                error_message: errorMessage
            },
            response_time: new Date().toTimeString()
        })
    }
}