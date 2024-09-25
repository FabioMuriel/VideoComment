export class GenericResponse<T> {
    status: boolean;
    message: string;
    errors?: string[];
    data?: T;

    public static create<T>(params: Partial<GenericResponse<T>>): GenericResponse<T> {
        const response = new GenericResponse<T>();
        Object.assign(response, params);
        return response;
    }
}
