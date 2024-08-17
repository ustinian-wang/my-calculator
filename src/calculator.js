import { isString } from "@ustinian-wang/kit";
import { DEFAULT_VALUE, KeypadDef, KeypadTypeDef } from "./constants";

/**
 *
 * @param {string} [value='0']
 * @return {boolean}
 */
export function isValidInput( value ) {
    let arr = value.split( "." );
    if ( isString( arr[0] ) ) {
        return arr[0].length < 22
    }
    if ( isString( arr[1] ) ) {
        return arr[1].length < 22;
    }
    return false;
}

export function isDefaultValue(value){
    return value === KeypadDef[KeypadTypeDef.K0];
}

/**
 * @description
 * @param {string} left
 * @param {string} opt
 * @param {string} right
 * @return {string}
 */
export function calculate(left, opt, right){
    left = parseFloat(left) || 0;
    right = parseFloat(right) || 0;
    if(opt === KeypadDef[KeypadTypeDef.PLUS]){
        return (left + right) + "";
    }else if(opt === KeypadDef[KeypadTypeDef.MINUS]){
        return (left - right) + "";
    }else if(opt === KeypadDef[KeypadTypeDef.MULTIPLY]){
        return (left * right) + "";
    }else if(opt === KeypadDef[KeypadTypeDef.DIVIDE]){
        return (left / right) + "";
    }
    return DEFAULT_VALUE
}
