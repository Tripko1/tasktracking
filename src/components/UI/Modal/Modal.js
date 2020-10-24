import React from "react";
import "./Modal.css";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

const modal = props => {
    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.cancelModalHandler} />
            <div
                className="Modal"
                style={{
                    trnasform: props.show ? "translateY(0)" : "translateY(-100vh)",
                    opacity: props.show ? "1" : "0",
                    zIndex: props.show ? "500" : "-1",
                }}
            >
                {props.children}
            </div>
        </Aux>
    );
}

export default React.memo(modal, (prevProps, nextProps) => 
  nextProps.show !== prevProps.show || 
  nextProps.children !== prevProps.children
);

