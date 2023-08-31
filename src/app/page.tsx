"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TypographyH1 } from "./(components)/Typography";
import { ImBin } from "react-icons/im";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
    <div className="my-4 p-4 border-2 h-screen max-w-4xl mx-auto">
      {/* Render Todos */}
      <TypographyH1 className="text-center" text="Todo List" />

      <form
        onSubmit={submitForm}
        className="max-w-xl mx-auto border-2 p-4 rounded-md"
      >
        <div className="flex gap-4 my-4 ">
          <Input
            value={todo.title}
            name="title"
            onChange={handleInputChange}
            type="text"
            placeholder="Email"
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
              <div className="flex flex-end items-center justify-between my-2 bg-gray-200 p-2 rounded-md ">
                {todo.title}{" "}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" asChild>
                      <button>
                        <ImBin />
                      </button>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will delete your todo
                        and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          handleDelete(index);
                        }}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
