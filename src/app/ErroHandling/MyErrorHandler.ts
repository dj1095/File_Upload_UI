export class MyErrorHandler {
    handleError(error: any) {
        if (error.error) {
            alert(error.error.message);
        } else {
            alert(error.message);
        }
    }
}