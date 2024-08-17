import "./keyboard.scss";
import Keypad from "../Keypad/Keypad.jsx";
import {KeypadDef, KeypadTypeDef} from "../../constants.js";
export function Keyboard(props){

    let optTypeList = [
        KeypadTypeDef.PLUS,
        KeypadTypeDef.MINUS,
        KeypadTypeDef.MULTIPLY,
        KeypadTypeDef.DIVIDE,
        KeypadTypeDef.EQUALS
    ]
    let optList = optTypeList.map((type, )=>{
        return (
            <div className="f_row">
                <Keypad key={type} char={KeypadDef[type]} orange={true} onClick={()=>props.onClick(type)}/>
            </div>
        )
    })
    let specOfOptTypeList = [
        KeypadTypeDef.AC,
        KeypadTypeDef.NEGATIVE_POSITIVE,
        KeypadTypeDef.PERCENT
    ]
    let specOfOptList = specOfOptTypeList.map(type=>{
        return (<Keypad key={type} char={KeypadDef[type]} onClick={()=>props.onClick(type)}/>
        )
    })

    let numOfOptTypeList = [
        KeypadTypeDef.K1,
        KeypadTypeDef.K2,
        KeypadTypeDef.K3,
        KeypadTypeDef.K4,
        KeypadTypeDef.K5,
        KeypadTypeDef.K6,
        KeypadTypeDef.K7,
        KeypadTypeDef.K8,
        KeypadTypeDef.K9,
    ]
    let numOfOptList = numOfOptTypeList.map(type=>{
        return (<Keypad key={type} style={{'width':'80px','height':'80px'}} char={KeypadDef[type]} onClick={()=>props.onClick(type)}/>
        )
    })

    return (
        <div className="f_keyboard">
            <div className="f_left">
                <div className="f_left_opt">{specOfOptList}</div>
                <div className="f_left_number">{numOfOptList}</div>
                <div className="f_left_rest">
                    <div className='f_left_rest_left'>
                        <Keypad key={KeypadTypeDef.K0} char={KeypadDef[KeypadTypeDef.K0]} onClick={()=>props.onClick(KeypadTypeDef.K0)}></Keypad>
                    </div>
                    <div className='f_left_rest_right'>
                        <Keypad key={KeypadTypeDef.DOT} char={KeypadDef[KeypadTypeDef.DOT]} onClick={()=>props.onClick(KeypadTypeDef.DOT)}></Keypad>
                    </div>
                </div>

            </div>
            <div className="f_right">
                {optList}
            </div>
        </div>
    )
}

export function isNumberKey (type){
    let numOfOptTypeList = [
        KeypadTypeDef.K1,
        KeypadTypeDef.K2,
        KeypadTypeDef.K3,
        KeypadTypeDef.K4,
        KeypadTypeDef.K5,
        KeypadTypeDef.K6,
        KeypadTypeDef.K7,
        KeypadTypeDef.K8,
        KeypadTypeDef.K9,

        KeypadTypeDef.K0
    ]
    return numOfOptTypeList.includes(type);
}

export function isOptKey(type){
    return [
        KeypadTypeDef.PLUS,
        KeypadTypeDef.MINUS,
        KeypadTypeDef.MULTIPLY,
        KeypadTypeDef.DIVIDE,
    ].includes(type);
}