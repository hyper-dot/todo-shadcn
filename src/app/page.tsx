"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TypographyH2 } from "./(components)/Typography";

import { AlertDialogDemo } from "./(components)/AlertDialog";
import { Calendar } from "@/components/ui/calendar";
import { SlCalender } from "react-icons/sl";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  // Toast
  const { toast } = useToast();

  // Single todo
  const [todo, setTodo] = useState({
    title: "",
    completed: false,
    date: Date.now(),
  });

  // Todos array
  const [todos, setTodos] = useState([
    { title: "hello", completed: true, date: 1693530289886 },
    { title: "Go to shop", completed: false, date: 1693530289886 },
  ]);

  // Date
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  // Calendar visibility
  const [calenderShow, setCalenderShow] = useState(false);

  // Handles todo title changes
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  }

  // Handle title changes
  function handleDateChange(e: any) {
    setDate(e);
    setTodo({ ...todo, date: e });
  }

  // Delete todo
  function handleDelete(index: number) {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1); // Remove the todo at the specified index
    setTodos(updatedTodos);

    toast({
      title: "Deleted Todo Successfully !",
      // description: "Please enter a valid title",
    });
  }

  // Submit form
  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(todo);
    if (todo.title.trim() !== "") {
      setTodos([...todos, todo]);
      setTodo({
        title: "",
        completed: false,
        date: 0,
      });
      toast({
        title: "Added todo Successfully!",
        // description: "Please enter a valid title",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid todo !",
        description: "Please enter a valid title",
      });
    }
    setTodo({ title: "", completed: todo.completed, date: 0 });
  }

  // convert raw date to readable date
  function readAbleDate(timestamp: number) {
    const dateObj = new Date(timestamp);
    const humanFormat = dateObj.toDateString();
    return humanFormat;
  }

  return (
    <div className="my-4 p-4 h-screen max-w-4xl mx-auto rounded-md ">
      {/* Render Todos */}
      <TypographyH2 className="text-center my-4" text="Todo List" />

      <form
        onSubmit={submitForm}
        className="max-w-xl mx-auto border-2 p-4 rounded-md "
      >
        <div className="flex gap-4 my-4  flex-col">
          <div className="flex gap-2">
            <Input
              value={todo.title}
              name="title"
              onChange={handleInputChange}
              type="text"
              placeholder="Todo"
            />
            <Button variant="outline" asChild>
              <button
                type="button"
                className="inline outline-none"
                onClick={() => {
                  setCalenderShow(!calenderShow);
                }}
              >
                <SlCalender className="inline-block" />
              </button>
            </Button>
          </div>

          <div className="max-w-fit">
            {calenderShow && (
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => {
                  handleDateChange(date);
                }}
                className="rounded-md border"
              />
            )}
          </div>

          <Button asChild>
            <button type="submit">Add</button>
          </Button>
        </div>

        {/* completed checkbox */}
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
            <li
              className=" flex flex-end items-center justify-between my-2 bg-gray-100 p-2 rounded-md "
              key={index}
            >
              <div className="flex flex-col gap-4">
                <span className={todo.completed ? "line-through" : ""}>
                  <span className="font-semibold">{todo.title}</span>
                </span>

                <span className="text-sm text-gray-700">
                  {readAbleDate(todo.date)}
                </span>
              </div>
              <div className="flex gap-2">
                <AlertDialogDemo text="Delete" action={handleDelete} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
