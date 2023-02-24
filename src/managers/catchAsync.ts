// import logger from '../../logs/logger';

type asyncFunction = (formData: object) => any;

export const catchPostAsync = (fn: asyncFunction)=> (formData:object)=>{
    fn(formData).catch((err: Error) => {
        // logger.error(err.message);
        console.log(err)
    });
    // create an error controller to toast/log all the errors (have diff prod n dev error messages)
};
