import { validate, ValidationError } from 'class-validator';

export const handleError = (errors: ValidationError[]) : string => {
    return errors.map((error:ValidationError)=>Object.values(error.constraints)).join(' ');
}