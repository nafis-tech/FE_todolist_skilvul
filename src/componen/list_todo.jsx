import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";

class ListTodo extends React.Component {
  render() {
    const { id, title, description, complete, date, des_complete } =
      this.props.sendList;
    return (
      <section className="new-todo-list">
        <div className="descripsi-todo">
          <h2>{title}</h2>
          <p>{description}</p>
          <p className="mt-1">
            {des_complete} {date}
          </p>
        </div>
        <div className="button-todo-list">
          {complete ? (
            ""
          ) : (
            <>
              <button>
                <FiEdit />
              </button>
              <button>
                <FaCheck onClick={this.props.complete} />
              </button>
            </>
          )}
          <button onClick={this.props.delete}>
            <FaRegTrashAlt />
          </button>
        </div>
      </section>
    );
  }
}

export default ListTodo;
