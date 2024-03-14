import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChangeName}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    function handleEditClick() {
        // setIsEditing(isEditing ? false : true); 
        // setIsEditing(!isEditing); 
        // !!! IMPORTANT TO USE BELOW CODE
        // setIsEditing((editing) => !editing);
        setIsEditing(editing => !editing); // - it is garantee that we allways get the latest value of isEditing

        if(isEditing) {
            onChangeName(symbol, playerName);
        }
    }

    function handleChange(event) {
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    let btnCaption = 'Edit';

    if(isEditing) {
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange} />;
        btnCaption = 'Save';
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span id="payer">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{btnCaption}</button>
        </li>
    )
};