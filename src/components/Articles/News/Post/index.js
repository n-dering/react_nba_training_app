import React, { Component } from "react";
import axios from "axios";
import { URL } from "../../../../config";

import styles from "../../articles.css";
import { render } from "react-dom";

import Header from "./header";
import Body from "./body";

class NewsArticles extends Component {
  state = {
    article: [],
    team: [],
  };

  componentDidMount() {
    axios
      .get(`${URL}/articles?id=${this.props.match.params.id}`)
      .then((res) => {
        let article = res.data[0];

        axios.get(`${URL}/teams?id=${article.team}`).then((res) => {
          this.setState({
            article,
            team: res.data,
          });
        });
      });
  }

  render() {
    const article = this.state.article;
    const team = this.state.team;

    return (
      <div className={styles.articleWrapper}>
        <Header Team={team[0]} author={article.author} date={article.date} />
        <Body />
      </div>
    );
  }
}

export default NewsArticles;
