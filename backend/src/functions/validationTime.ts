import { CustomError } from 'express-handler-errors';

export function validationTime(initialTime: string, endTime: string) {
    const initialFormat = Number(initialTime.replace(/[^0-9]/g, ''));
    const endFormat = Number(endTime.replace(/[^0-9]/g, ''));
    const interval = endFormat - initialFormat;

    let valid: boolean = true;
    let msg!: string;

    if (initialTime.length !== 5 || endTime.length !== 5) {
        valid = false;
        msg = "Date need be 'HH:mm' format";
    } else if (initialFormat > endFormat) {
        valid = false;
        msg = 'End time cannot be less than initial time';
    } else if (interval < 15) {
        valid = false;
        msg = 'Must have a break of at least 15 minutes';
    }
    if (!valid) {
        throw new CustomError({
            code: 'VALIDATION_FAILS',
            message: msg,
            status: 400,
          }); 
    }
    
    return valid;
}