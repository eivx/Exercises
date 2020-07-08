import React from "react";

const TotalDisplay = ({ course }) => {
  const totalArr = [];
  for (let i = 0; i < course.parts.length; i++) {
    totalArr.push(course.parts[i].exercises);
  }
  return <b>total of {totalArr.reduce((a, b) => a + b)} exercise</b>;
};
const ClassNameDisplay = ({ course }) => {
  return <h2>{course.name}</h2>;
};
const PartDisplay = ({ course }) => {
  return course.parts.map((note) => (
    <p key={note.id}>
      {note.name} {note.exercises}
    </p>
  ));
};
const Course = ({ course }) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      <ClassNameDisplay course={course[0]} />
      <PartDisplay course={course[0]} />
      <TotalDisplay course={course[0]} />
      <ClassNameDisplay course={course[1]} />
      <PartDisplay course={course[1]} />
      <TotalDisplay course={course[1]} />
    </div>
  );
};

export default Course;
