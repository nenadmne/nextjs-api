import { useRef } from "react";

function HomePage() {
  const emailInputRef = useRef(null);
  const feedbackInputRef = useRef(null);

  const submitHandler = async (event) => {
    event.preventDefault();

    const data = {
      email: emailInputRef.current.value,
      feedback: feedbackInputRef.current.value,
    };

    const request = await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const requestData = await request.json();
    console.log(requestData);
  };
  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email"> Your email address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback"> Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef} />
        </div>
        <button> Submit </button>
      </form>
    </div>
  );
}

export default HomePage;
