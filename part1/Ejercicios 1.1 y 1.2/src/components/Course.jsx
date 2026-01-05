const Header = ({ courseName }) => {
  return <h3>{courseName}</h3>;
};

const Part = ({ title, numberOfExercises }) => {
  return (
    <p>
      {title} {numberOfExercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => {
        const { id, name, exercises } = part;
        return <Part key={id} title={name} numberOfExercises={exercises} />;
      })}
    </>
  );
};

const Total = ({ parts }) => {
  return (
    <p>
      <strong>
        total of {parts.reduce((acc, part) => acc + part.exercises, 0)}{" "}
        exercises
      </strong>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

const Courses = ({ courses }) => {
  return (
    <>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </>
  );
};

export default Courses;
