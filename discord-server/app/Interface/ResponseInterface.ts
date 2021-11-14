export interface ResponseInterface {
    success: boolean
    status: number,
    data: Object,
    error: {
        error_code: string,
        error_message: string
    },
    response_time: string
}