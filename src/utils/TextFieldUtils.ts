
/**
 * Regex reference: https://medium.com/factory-mind/regex-tutorial-a-simple-cheatsheet-by-examples-649dc1c3f285
 * @param text 
 * @returns 
 */
 export function filterNumber(text: string | number) {

    let regex = /[0-9]/g;
    /** Enable to allow "+" at the start */
    //let regex = /^([+]|[0-9])[0-9]*$/;

    /** Returns array of numbers */
    let result = text.toString().match(regex)?.join('');
    return result;

}