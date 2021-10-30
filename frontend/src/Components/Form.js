import React, { useState } from "react";

function Form() {
  const HOST = "http://localhost:5000";
  const [ccCount, setCcCount] = useState([]);
  const [bccCount, setBccCount] = useState([]);

  const getCC = (initialCC) => {
    let newCC = initialCC;
    ccCount.forEach((el) => {
      if (el !== "") newCC += "," + el;
    });
    return newCC;
  };

  const getBCC = (initialBCC) => {
    let newBCC = initialBCC;
    bccCount.forEach((el) => {
      if (el !== "") newBCC += "," + el;
    });
    return newBCC;
  };

  const showError = (txt) => {
    document.getElementById("errorText").innerHTML = txt;
    document.getElementById("errorText").classList.add("fw-bolder");
    document.getElementById("errorText").classList.add("fs-4");
    document.getElementById("errorText").classList.add("text-danger");
    document.getElementById("successText").innerText = "";
  };

  const showSuccess = (txt) => {
    document.getElementById("successText").innerHTML = txt;
    document.getElementById("successText").classList.add("fw-bolder");
    document.getElementById("successText").classList.add("fs-4");
    document.getElementById("successText").classList.add("text-success");
    document.getElementById("errorText").innerText = "";
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const btn = document.getElementById("submit-button");

    // Getting form data
    const form = document.getElementById("mailForm");
    let formData = {};
    for (var i = 0; i < form.elements.length; i++) {
      var el = form.elements[i];
      if (el.name !== "") formData[el.name] = el.value;
    }

    // Checking for empty fields
    for (const key in formData) {
      if (key !== "cc" && key !== "bcc") {
        if (formData[key] === "") {
          showError("Enter all details");
          return;
        }
      }
    }

    btn.innerHTML = "Sending...";

    // Formatting Data
    let finalData = {};
    finalData["name"] = formData["name"];
    finalData["user"] = formData["email-sender"];
    finalData["pass"] = formData["password-sender"];
    finalData["subject"] = formData["subject"];
    finalData["toList"] = formData["email-receiver"];
    finalData["ccList"] = getCC(formData["cc"]);
    finalData["bccList"] = getBCC(formData["bcc"]);
    finalData["text"] = formData["message"];

    try {
      // Sending Request
      const response = await fetch(HOST + "/send_mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });
      const json = await response.json();
      if (json.error) showError(json.error);
      else {
        form.reset();
        setCcCount([]);
        setBccCount([]);
        showSuccess(json.success);
      }
    } catch (e) {
      showError("Some error occurred");
    } finally {
      btn.innerHTML = "Submit";
      window.scrollTo(0, 0);
    }
  };

  const addCCCount = () => {
    setCcCount([...ccCount, ""]);
  };

  const removeCCCount = (i) => {
    setCcCount([
      ...ccCount.slice(0, i),
      ...ccCount.slice(i + 1, ccCount.length),
    ]);
  };

  const ccChange = (i, e) => {
    setCcCount([
      ...ccCount.slice(0, i),
      e.target.value,
      ...ccCount.slice(i + 1, ccCount.length),
    ]);
  };

  const addBCCCount = () => {
    setBccCount([...bccCount, ""]);
  };

  const removeBCCCount = (i) => {
    setBccCount([
      ...bccCount.slice(0, i),
      ...bccCount.slice(i + 1, bccCount.length),
    ]);
  };

  const bccChange = (i, e) => {
    setBccCount([
      ...bccCount.slice(0, i),
      e.target.value,
      ...bccCount.slice(i + 1, bccCount.length),
    ]);
  };

  return (
    <div className="container">
      <div id="status">
        <p id="errorText"></p>
        <p id="successText"></p>
      </div>
      <form id="mailForm" onSubmit={submitForm}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label d-flex">
            Your Name on Email
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            name="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label d-flex">
            Your email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email-sender"
            aria-describedby="emailHelp"
            name="email-sender"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label d-flex">
            Your password
          </label>
          <input
            type="password"
            className="form-control"
            id="password-sender"
            name="password-sender"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label d-flex">
            Receiver's email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email-receiver"
            aria-describedby="emailHelp"
            name="email-receiver"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label d-flex">
            CC
          </label>
          <input
            type="email"
            className="form-control"
            id="cc"
            aria-describedby="emailHelp"
            name="cc"
          />
          <span
            className="suffixSpan btn btn-success text-start mt-2"
            onClick={addCCCount}
          >
            +
          </span>
          {ccCount.map((x, i) => (
            <div className="formItem" key={i}>
              <h3> </h3>
              <input
                type="email"
                placeholder="Enter cc if any"
                className="prefixInput"
                value={x}
                onChange={(e) => ccChange(i, e)}
              />
              <span
                className="suffixSpan btn btn-danger mx-2"
                onClick={() => removeCCCount(i)}
              >
                -
              </span>
            </div>
          ))}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label d-flex">
            BCC
          </label>
          <input
            type="email"
            className="form-control"
            id="bcc"
            aria-describedby="emailHelp"
            name="bcc"
          />
          <span
            className="suffixSpan btn btn-success mt-2"
            onClick={addBCCCount}
          >
            +
          </span>
          {bccCount.map((x, i) => (
            <div className="formItem" key={i}>
              <h3> </h3>
              <input
                type="email"
                placeholder="Enter bcc if any"
                className="prefixInput"
                value={x}
                onChange={(e) => bccChange(i, e)}
              />
              <span
                className="suffixSpan btn btn-danger mx-2"
                onClick={() => removeBCCCount(i)}
              >
                -
              </span>
            </div>
          ))}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label d-flex">
            Subject
          </label>
          <input
            type="text"
            className="form-control"
            id="subject"
            aria-describedby="emailHelp"
            name="subject"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputMessage" className="form-label d-flex">
            Your message
          </label>
          <input
            type="text"
            className="form-control"
            id="message"
            name="message"
          />
        </div>
        <div className="d-flex">
          <button className="btn btn-primary" id="submit-button">
            Submit
          </button>
          <button type="reset" className="btn btn-primary mx-4">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
