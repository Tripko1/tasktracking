import React from "react";
import "./Board.css";
import BoardList from "./BoardList/BoardList";
import Create from "../../../../components/SelectedProject/CreateCheckList/CreateCheckList";

const Board = props => {

    const board_list = props.checklists.map(checklist => {
        return <BoardList
            key={checklist.id}
            checklistName={checklist.title}
            checklistId={checklist.id}
            token={props.token}
            loadingChecklist={props.loadingChecklist}
            onUpdateChecklist={props.onUpdateChecklist}
            onDeleteChecklist={props.onDeleteChecklist}
            openTaskModal={props.openTaskModal}
            tasks={checklist.tasks}
            onChangeChecklist={props.onChangeChecklist}
            checklists={props.checklists}
            projectId={props.projectId}
        />
    }
    )
    return (
        <div className="board">
            {board_list}
            <Create
                show={props.show}
                openModal={props.openModal}
            />
        </div>
    )
}

export default Board;