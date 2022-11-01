import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Card, CardText, Container } from "reactstrap";

function App() {
  const quotesArrUrl =
    "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

  const [quote, setQuote] = useState("me");

  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = () => {
    let url = quotesArrUrl;
    fetch(url)
      .then((response) => response.json())
      .then((arr) => {
        let quotesArr = arr.quotes;
        let randomInt = Math.floor(quotesArr.length * Math.random());
        let randomQuote = quotesArr[randomInt];

        setQuote(randomQuote.quote);
        setAuthor(randomQuote.author);
      });
  };
  const handleClick = () => {
    fetchQuote();
  };

  const tweet = `${quote} \n --${author}`;
  return (
    <div className="App">
      <header className="App-header ">
        <div id="quote-box" className="container">
          <Container className="">
            <Card
              color="secondary"
              style={{
                width: "100%",
              }}
              body
            >
              <CardText>
                <div className="row">
                  <p id="text">"{quote}"</p>
                </div>
                <div className="row justify-content-md-center">
                  <div className="float-end col-md-6">
                    <p className="text-end" id="author">
                      -{author}
                    </p>
                  </div>{" "}
                </div>
              </CardText>
              <Row>
                <Col>
                  <a
                    id="tweet-quote"
                    className="btn btn-social-icon btn-twitter"
                    target="_blank"
                    rel="noreferrer"
                    href={encodeURI(
                      `http://twitter.com/intent/tweet?text=${tweet}`
                    )}
                  >
                    <i className=" fa fa-twitter"></i>
                  </a>
                </Col>
                <Col>
                  <Button color="primary" id="new-quote" onClick={handleClick}>
                    New Quote
                  </Button>
                </Col>
              </Row>
            </Card>
          </Container>
        </div>
      </header>
    </div>
  );
}

export default App;
