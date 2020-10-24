import React, { useState,useEffect } from 'react';
import "./BoardList.css";
import edit from "../../../../../assets/images/icon/icons8-edit-48.png";
import Button from "../../../../../components/UI/Button/Button";
import Card from "./BoardCardItem/BoardCardItem";
import Spinner from "../../../../../components/UI/Spinner/Spinner";
import Aux from "../../../../../hoc/Auxiliary/Auxiliary";
import deleteBtn from "../../../../../assets/images/icon/icons8-delete-bin-48.png";
import plus from "../../../../../assets/images/icon/icons8-edit-node-48.png";

const BoardList = props => {
    const [checklistName, setChecklistName] = useState(props.checklistName);
    const [touchedChecklistName, setTouchedChecklistName] = useState(true);

    useEffect(() => {
        if (checklistName !== props.checklistName){
            setTouchedChecklistName(false);
        }
        else{
            setTouchedChecklistName(true);
        }
    },[checklistName, props.checklistName]);

    const inputHandler = (event) => {
        setChecklistName(event.target.value);
    }

    const submitUpdateChecklist = (event) => {
        event.preventDefault();
        props.onUpdateChecklist(props.token, checklistName, props.checklistId)
    }

    const deleteChecklist = (id) => {
        props.onDeleteChecklist(props.token, id);
    }

    const drop = e => {
        e.preventDefault();
        const card_id = e.dataTransfer.getData('card_id');
        const card = document.getElementById(card_id);
        card.style.display = 'block';

        const p = e.pageY - 225;
        const position = Math.floor((p / 40));

        const param = props.projectId + "." + props.checklistId;
        let list = document.getElementById(String(param))
        list.insertBefore(card, list.childNodes[position])

        const taskId = card_id.split(" ")[0];
        const cId = props.checklists.findIndex(el => el.id === card_id.split(" ")[1])
        const index = props.checklists[cId].tasks.data.findIndex(el => el.id === taskId);

        const data = {
            newChecklistId: props.checklistId,
            oldChecklistId: card_id.split(" ")[1],
            title: props.checklists[cId].tasks.data[index].title,
            desc: props.checklists[cId].tasks.data[index].description,
            taskId: taskId,
            position: position
        }

        props.onChangeChecklist(props.token, data);
    }

    const dragOver = e => {
        e.preventDefault();
    }


    let header = (
        <Aux>
            <div style={{ height: "30px" }}>
                <img className="board-list-content-img" src={deleteBtn} alt="" onClick={() => deleteChecklist(props.checklistId)} />
            </div>
            <div className="board-list-header">
                <div className="board-list-header-choose">
                    <div>{props.checklistName}</div>
                    <form onSubmit={submitUpdateChecklist} className="board-list-form">
                        <input
                            className="board-list-input"
                            placeholder="Add checklist title"
                            onChange={inputHandler}
                            value={checklistName}
                        />
                        <Button
                            btnType="Success"
                            disabled={touchedChecklistName}
                        >
                            <img src={edit} alt="Edit Checklist name" style={{ height: "20px", width: "20px" }} />
                        </Button>
                    </form>
                </div>
            </div>
            <div
                id={props.projectId + "." + props.checklistId}
                className="board-list-card"
                onDrop={drop}
                onDragOver={dragOver}
            >
                {props.tasks.data.map(task =>
                    <Card
                        key={props.checklistId + " " + task.id}
                        task={task}
                        checklistId={props.checklistId}
                        onChangeChecklist={props.onChangeChecklist}
                    />
                )}
            </div>
            <div className="board-list-add-task" onClick={() => props.openTaskModal(props.checklistId)}>
                <img src={plus} alt="" style={{ height: "20px", width: "20px" }} />
                <span style={{ marginLeft: "5px" }}>Add another card</span>
            </div>
        </Aux>
    )
    if (props.loadingChecklist !== null && props.loadingChecklist === props.checklistId) {
        header = <Spinner />;
    }
    return (
        <div className="board-list">
            <div className="board-list-content">
                {header}
            </div>
        </div>
    )
}

export default BoardList;