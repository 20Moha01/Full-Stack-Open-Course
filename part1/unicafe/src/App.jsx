import { useState } from "react";

const Header = ({ title }) => (
  <h2>
    <strong>{title}</strong>
  </h2>
);

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({
  goodCount,
  neutralCount,
  badCount,
  totalCount,
  averageCount,
}) => {
  return (
    <>
      <table>
        <tbody>
          <StatisticLine text="good" value={goodCount} />
          <StatisticLine text="neutral" value={neutralCount} />
          <StatisticLine text="bad" value={badCount} />
          <StatisticLine text="all" value={totalCount} />
          <StatisticLine text="average" value={averageCount / totalCount} />
          <StatisticLine
            text="positive"
            value={`${(goodCount / totalCount) * 100} %`}
          />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);

  const sendFeedback = (feedbackType) => {
    if (feedbackType == "good") {
      setAverage(average + 1);
      setGood(good + 1);
    } else if (feedbackType == "neutral") {
      setNeutral(neutral + 1);
    } else {
      setBad(bad + 1);
      setAverage(average - 1);
    }
    setTotal(total + 1);
  };

  return (
    <>
      <Header title="give feedback" />
      <Button handleClick={() => sendFeedback("good")} text="good" />
      <Button handleClick={() => sendFeedback("neutral")} text="neutral" />
      <Button handleClick={() => sendFeedback("bad")} text="bad" />
      <Header title="statistics" />
      {total != 0 ? (
        <Statistics
          goodCount={good}
          neutralCount={neutral}
          badCount={bad}
          totalCount={total}
          averageCount={average}
        />
      ) : (
        "No feedback given"
      )}
    </>
  );
};

export default App;
