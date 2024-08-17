import "./keypad.scss";

export default function Keyboard({char="", orange=false, onClick}){

    return (
        <div className={`f_keypad ${orange ? 'f_color_orange' : ''}`} onClick={onClick}>{char}</div>
    )
}