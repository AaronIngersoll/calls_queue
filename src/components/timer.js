import React, { Component } from "react";
import axios from "axios";

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
      showComponent: false
    };
  }

  componentDidMount() {
    this.getQueue();
    this.interval = setInterval(() => {
      this.getQueue();
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  getQueue() {
    var url = "https://aldermarketing.com/five9/queue";

    axios
      .get(url)
      .then(response => {
        this.setState({
          data: response.data.filter(item => item.skill_name === "Inbound")
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentShow() {
    let calls = this.state.data.map(data => data.calls_in_queue);
    this.setState({
      showComponent: calls === 0 ? true : false
    });
  }

  render() {
    return (
      <div>
        {console.log(this.state.data)}
        {this.state.showComponent
          ? this.state.data.map(data => (
              <h6 className="queue_waite_time">
                {data.current_longest_queue_time.slice(0, 8)}
              </h6>
            ))
          : null}
      </div>
    );
  }
}
