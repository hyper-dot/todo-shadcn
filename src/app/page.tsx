"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TypographyH1 } from "./(components)/Typography";
import { ImBin } from "react-icons/im";
import { BsPencilSquare } from "react-icons/bs";

import { AlertDialogDemo } from "./(components)/AlertDialog";
import { DialogDemo } from "./(components)/Dialoge";

export default function Home() {
  const [todo, setTodo] = useState({
    title: "",
    completed: false,
  });
  const [todos, setTodos] = useState([
    { title: "hello", completed: true },
    { title: "Go to shop", completed: false },
  ]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  }

  function handleDelete(index: number) {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1); // Remove the todo at the specified index
    setTodos(updatedTodos);
  }

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(todo);
    if (todo.title.trim() !== "") {
      setTodos([...todos, todo]);
      setTodo({
        title: "",
        completed: false,
      });
    }
    setTodo({ title: "", completed: todo.completed });
  }

  return (
    <div className="my-4 p-4 h-screen max-w-4xl mx-auto rounded-md bg-gray-200">
      {/* Render Todos */}
      <TypographyH1 className="text-center my-4" text="Todo List" />

      <form
        onSubmit={submitForm}
        className="max-w-xl mx-auto border-2 p-4 rounded-md bg-gray-100"
      >
        <div className="flex gap-4 my-4 ">
          <Input
            value={todo.title}
            name="title"
            onChange={handleInputChange}
            type="text"
            placeholder="Todo"
          />
          <Button asChild>
            <button type="submit">Add</button>
          </Button>
        </div>

        <div className="flex gap-4 items-center">
          <Checkbox
            onCheckedChange={() => {
              todo.completed = !todo.completed;
            }}
            id="completed"
          />
          <label htmlFor="completed">Completed</label>
        </div>
      </form>

      <div className="h-40 max-w-xl mx-auto my-4 p-4">
        {/* Render Todos */}
        <ol>
          {todos.map((todo, index) => (
            <li className={todo.completed ? "line-through" : ""} key={index}>
              <div className="flex flex-end items-center justify-between my-2 bg-gray-100 p-2 rounded-md ">
                <span>{todo.title}</span>
                <div className="flex gap-2">
                  <DialogDemo text={<BsPencilSquare />} />
                  <AlertDialogDemo text={<ImBin />} action={handleDelete} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
