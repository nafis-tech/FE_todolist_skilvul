import React, { useRef } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import "../CSS/todo_item.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import ListTodo from "./list_todo";
import { API_TODO, API_TODO_express } from "../database/API";
import Axios from "axios";

class Todo_List_new extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      complete: false,
    };
    this.titleRef = React.createRef();
    this.descriptionRef = React.createRef();
  }

  componentDidMount() {
    this.getData();
    console.log(this.state.data);
  }
  getData = async () => {
    try {
      const response = await Axios.get(`${API_TODO_express}/todo`);
      this.setState({ data: response.data.payload });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  showData = () => {
    let UnComplate = this.state.data.filter((item) => !item.complete);
    let Complate = this.state.data.filter((item) => item.complete);
    console.log(UnComplate);
    // return (UnComplate.map((item, index) => {
    //   return <ListTodo sendList={item} key={index} />;
    // }))
    if (!this.state.complete) {
      return UnComplate.map((item, index) => {
        return (
          <ListTodo
            sendList={item}
            key={index}
            delete={() => this.onDelete(item.id)}
            complete={() => this.onChekList(item.id)}
          />
        );
      });
    } else if (this.state.complete) {
      return Complate.map((item, index) => {
        return (
          <ListTodo
            sendList={item}
            key={index}
            delete={() => this.onDelete(item.id)}
          />
        );
      });
    }
  };
  onAdd = async () => {
    try {
      let newTitle = this.titleRef.current.value;
      let newDescription = this.descriptionRef.current.value;

      let obj = {
        title: newTitle,
        description: newDescription,
        complete: false,
        des_complete: "Complate at :",
        date: null,
      };

      if (!newTitle || !newDescription) {
        alert("Please fill your activity");
      } else {
        const response = await Axios.post(`${API_TODO_express}/todo`, obj);

        this.titleRef.current.value = "";
        this.descriptionRef.current.value = "";
        this.getData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  onDelete = async (id) => {
    try {
      const response = await Axios.delete(`${API_TODO_express}/todo`, {
        data: { id: id },
      });
      this.getData();
    } catch (error) {
      console.log(error);
    }
  };
  onChekList = (id) => {
    let dataUpdate = {
      id,
      complete: true,
      date: new Date().toLocaleDateString(),
    };

    Axios.patch(`${API_TODO_express}/todo`, dataUpdate)
      .then((res) => {
        console.log(res.data); // Optional: log the response for debugging
        this.getData();
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };
  render() {
    const activity = {
      Title: "Olah Raga",
      descripsi: "Saya akan push up jam 12.00",
    };
    return (
      <div className="main_todo">
        <div className="cont-main-todo">
          <form action="" className="Handle-form">
            <div>
              <h2>Title </h2>
              <Form.Control
                placeholder="Title activity"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                ref={this.titleRef}
                // value={this.refs}
              />
            </div>
            <div>
              <h2>Descriptions </h2>
              <Form.Control
                placeholder="Descriptions activity"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                ref={this.descriptionRef}
                // value={this.refs}
              />
            </div>
            <div className="Form-button">
              <button onClick={this.onAdd}>Add</button>
            </div>
          </form>
          <div className="cont-new-todolist">
            <div className="cont-button-todo">
              <button onClick={() => this.setState({ complete: false })}>
                To Do
              </button>
              <button onClick={() => this.setState({ complete: true })}>
                Completed
              </button>
            </div>
            <div className="cont-todo">{this.showData()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Todo_List_new;
