import { COURSE } from "./Course";

const Header = (props) => {
  return <h1>{props.courseName}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.title} {props.numberOfExercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <>
      {props.parts.map((part) => {
        const { id, name, exercises } = part;
        return <Part key={id} title={name} numberOfExercises={exercises} />;
      })}
    </>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.total}</p>;
};

const App = () => {
  return (
    <>
      <Header courseName={COURSE.name} />
      <Content parts={COURSE.parts} />
      <Total total={COURSE.total()} />
    </>
  );
};

export default App;
