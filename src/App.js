import { isNumberKey, isOptKey, Keyboard } from "./components/Keyboard/Keyboard.js";

import "./App.scss";
import { DEFAULT_VALUE, KeypadDef, KeypadTypeDef } from "./constants";
import { useState } from "react"
import { calculate, isDefaultValue, isValidInput } from "./calculator";
import { isNull } from "@ustinian-wang/kit";
function App() {

    //计算器有状态流转，需要引入状态机
    let statusDef = {
        INPUT: 1,
        OPT: 2,
        END: 3
    }

    // let status = statusDef.INPUT;
    const [status, setStatus] = useState(statusDef.INPUT
    );
    const [value, setValue] = useState(KeypadDef[KeypadTypeDef.K0]);
    const [opt, setOpt] = useState(null);
    const [prev, setPrev] = useState(null);
    // console.log("jser run app")
    function updateValue(value){
        if(isValidInput(value)){
            setValue(value);
        }
    }


    const onClickKeyBoard = (type)=>{
        let char = KeypadDef[type];
        // console.log("jser onClickKeyBoard", 111)
        // console.log("jser status", status);
        if(isNumberKey(type)){// click 0-9
            if(status===statusDef.END){
                setStatus(statusDef.INPUT);
                updateValue(char);
            }else{
                // console.log("jser onClickKeyBoard", 222)
                if(isDefaultValue(value)){
                    // console.log("jser onClickKeyBoard", 333)
                    updateValue(char);
                }else{
                    // console.log("jser onClickKeyBoard", 444)
                    updateValue([value, char].join(""));
                }
            }

        }else if(type === KeypadTypeDef.PERCENT){
            updateValue((value/100)+"");
        }else if(type === KeypadTypeDef.NEGATIVE_POSITIVE){
            updateValue((value*-1)+"");
        }else if(type === KeypadTypeDef.AC){
            setOpt(null);
            setPrev(null);
            updateValue(DEFAULT_VALUE);
        }else if(isOptKey(type)){
            // console.log("jser isOptKey", 111)
            if(isNull(opt)){
                // console.log("jser isOptKey", 222)
                setOpt(char);
                let prevValue = value;
                if(prevValue.endsWith(".")){
                    prevValue = prevValue.replace(".", "");
                }
                setPrev(prevValue);
                updateValue(DEFAULT_VALUE);
            }else{
                //react is single data stream, value is never change
                let finalValue = doEqual(prev, opt, value);
                setOpt(char);
                setPrev(finalValue);
                setValue(DEFAULT_VALUE);
            }

        }else if(type === KeypadTypeDef.EQUALS){
            setStatus(statusDef.END);
            doEqual(prev, opt, value);
        }else if(type === KeypadTypeDef.DOT){
            if(value.includes(char)){
                return;
            }else{
                updateValue([value, char].join(""));
            }
        }

        // console.log("jser onClickKeyBoard", char, type)
    }

    const doEqual = (prev, opt, value)=>{
        if(isNull(opt)){
            return value;
        }else{
            if(isNull(prev)){
                return value;
            }else{
                let finalValue = calculate(prev, opt, value);
                setOpt(null);
                setPrev(null);
                finalValue = (parseFloat(finalValue) || 0) + "";
                // console.log("jser finalValue", finalValue);
                updateValue(finalValue);
                return finalValue;
            }
        }
    }


    return ( <div className='f_app'>
            <div className="f_app_top">
                <div className='f_app_top_prev'>{prev}</div>
                <div className='f_app_top_opt'>{opt}</div>
                <div className='f_app_top_value'>{value}</div>
            </div>
            <div className="f_app_bottom">
                <Keyboard onClick={onClickKeyBoard}></Keyboard>
            </div>
        </div> );
}

export default App;
