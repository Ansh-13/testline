"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Props = {
  post: any;
};

export default function QuizHome({ post }: Props) {
  const [startquiz, setStartQuiz] = useState(false);
  const [question_remaining, setquestion_remaining] = useState(0);
  const [ans_selected, setans_selected] = useState(false);
  const [skip, setskip] = useState(true);

  const [rightans, setrightans] = useState(0);
  const [wrongans, setwrongans] = useState(0);

  const [showResult, setShowResult] = useState(false);

  const [ques, setques] = useState(post.questions);

  // for total number of questions
  let question_length = post.questions.length;

  // handles the start of the quiz
  const handleStartQuiz = () => {
    setStartQuiz(true);
  };

  // for handling the next ques button everytime the user click on it next ques appears

  const handleNextQuestion = () => {
    if (!skip) {
      // for calculating score at the of the test
      if (ans_selected) {
        setrightans(rightans + 1);
      } else {
        setwrongans(wrongans + 1);
      }
    }

    // for checking if any question is skip or not
    setskip(true);

    if (question_remaining !== question_length - 1) {
      //keeps track of the index of questions
      setquestion_remaining((prev) => prev + 1);
    } else {
      // if the number of questions reached at the end then show the result
      setShowResult(true);
    }

    // for checking whether the user the attempt the question or nor
    setans_selected(false);
  };

  return (
    <div>
      {startquiz ? (
        //if user click the button for attempting the quiz
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          {!showResult ? (
            // for displaying question
            <>
              <div
                className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
                key={uuidv4()}
              >
                {
                  <>
                    <h2
                      className="text-lg font-semibold text-gray-800"
                      key={ques[question_remaining].id}
                    >
                      {ques[question_remaining].description}
                    </h2>
                    <div className="mt-4 space-y-2" key={uuidv4()}>
                      {ques[question_remaining].options.map((o: any) => (
                        <>
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name="question"
                              className="w-4 h-4 text-blue-500"
                              value={o.is_correct}
                              //onChange={setans_selected(o.is_correct)}
                              onClick={() => (
                                setans_selected(o.is_correct), setskip(false)
                              )}
                            />
                            <span className="text-gray-700" key={o.id}>
                              {o.description}
                            </span>
                          </label>
                        </>
                      ))}

                      <>
                        <button
                          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                          onClick={handleNextQuestion}
                        >
                          {question_remaining === question_length - 1
                            ? "Finish"
                            : "Next"}
                        </button>
                      </>
                    </div>
                  </>
                }
              </div>
            </>
          ) : (
            //Result showing
            <>
              <div className="text-center">
                <h2 className="text-xl font-semibold">Quiz Complete!</h2>
                <div className="bg-gradient-to-r from-purple-400 to-pink-500 text-white p-6 rounded-lg mt-4">
                  <h3 className="text-2xl font-semibold"></h3>
                  <p className="mt-2">
                    You answered {rightans} out of {question_length} questions
                    correctly.
                  </p>
                  <div className="mt-4">
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ">
                          Performance
                        </span>
                      </div>
                      <div className="flex mb-2 items-center justify-between">
                        <div className="w-full bg-teal-200 rounded-full">
                          <div
                            className="text-center text-xs font-medium leading-none text-teal-100 p-1 leading-tight rounded-l-full"
                            style={{
                              width: `${(rightans / question_length) * 100}%`,
                              backgroundColor: "#2c7be5",
                            }}
                          >
                            {((rightans / question_length) * 100).toFixed(0)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* for reattempting the quiz */}
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-600 transform transition-all duration-200 ease-in-out mt-2"
                >
                  Restart
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        // for starting the quiz
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Welcome to the Quiz!
            </h1>
            <p className="text-gray-600 mb-6">
              Ready to test your knowledge? Click the button below to start.
            </p>

            {/* Start Button */}
            <button
              className="bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-600 transform transition-all duration-200 ease-in-out"
              onClick={handleStartQuiz}
            >
              Start Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
