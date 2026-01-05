import Courses from "./components/Course";
import COURSES_DATA from "./CourseData";

const App = () => {
  return (
    <>
      <h1><strong>Web development curriculum</strong></h1>
      <Courses courses={COURSES_DATA} />
    </>
  );
};

export default App;
