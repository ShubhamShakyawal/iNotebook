import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

function Noteitem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updatenote } = props;
  return (
    <div className="col-md-6 col-lg-4">
      <div className="card my-3 ">
        <div className="card-body border border-1 rounded">
          <div className="d-flex align-item-center ">
            <h5 className={`card-title text-break`}>{note.title}</h5>
            <i
              className="far fa-trash-alt mx-2"
              onClick={() => {
                props.showAlert("Deleted Successfully", "success");
                deleteNote(note._id);
              }}
            ></i>
            <i
              className="far fa-edit mx-2"
              onClick={() => {
                updatenote(note);
              }}
            ></i>
          </div>
          <p className="card-text text-break">{note.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;