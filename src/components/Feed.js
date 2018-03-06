import React, { Component } from "react";
import reply from "../assets/iconmonstr-speech-bubble-15-240.png";
import share from "../assets/iconmonstr-share-1-240.png";
import like from "../assets/iconmonstr-favorite-3-240.png";

class Feed extends Component {
  render() {
    return (
      <div className="container">
        <ol className="feed--list">
          <li className="feed--list-item">
            <div>
              <div className="feed--avatar" />
            </div>
            <div>
              <div className="feed--user">
                <span className="feed--username">@username</span>
                <span className="feed--date">{" - "}1h ago</span>
              </div>
              <div>
                <span className="feed--message">
                  I live my life one quarter mile at a time.
                </span>
              </div>
              <ul className="feed--list-item--actions">
                <li>
                  <img src={reply} alt="reply" />3
                </li>
                <li>
                  <img src={share} alt="share" />9
                </li>
                <li>
                  <img src={like} alt="like" />20
                </li>
              </ul>
            </div>
          </li>

          <li className="feed--list-item">
            <div>
              <div className="feed--avatar" />
            </div>
            <div>
              <div className="feed--user">
                <span className="feed--username">@username</span>
                <span className="feed--date">{" - "}Mar 3, 2018</span>
              </div>
              <div>
                <span className="feed--message">
                  Que mas carne ni mas carne, asi viene el sandwich, man!
                </span>
              </div>
              <ul className="feed--list-item--actions">
                <li>
                  <img src={reply} alt="reply" />1000
                </li>
                <li>
                  <img src={share} alt="share" />2000
                </li>
                <li>
                  <img src={like} alt="like" />9000
                </li>
              </ul>
            </div>
          </li>

          <li className="feed--list-item">
            <div>
              <div className="feed--avatar" />
            </div>
            <div>
              <div className="feed--user">
                <span className="feed--username">@username</span>
                <span className="feed--date">{" - "}Mar 3, 2018</span>
              </div>
              <div>
                <span className="feed--message">Hello World!</span>
              </div>
              <ul className="feed--list-item--actions">
                <li>
                  <img src={reply} alt="reply" />9
                </li>
                <li>
                  <img src={share} alt="share" />20
                </li>
                <li>
                  <img src={like} alt="like" />3
                </li>
              </ul>
            </div>
          </li>

          <li className="feed--list-item">
            <div>
              <div className="feed--avatar" />
            </div>
            <div>
              <div className="feed--user">
                <span className="feed--username">@username</span>
                <span className="feed--date">{" - "}Mar 3, 2018</span>
              </div>
              <div>
                <span className="feed--message">
                  It's not who I am underneath, but what I do that defines me.
                </span>
              </div>
              <ul className="feed--list-item--actions">
                <li>
                  <img src={reply} alt="reply" />
                  <span>91</span>
                </li>
                <li>
                  <img src={share} alt="share" />
                  <span>50</span>
                </li>
                <li>
                  <img src={like} alt="like" />
                  <span>800</span>
                </li>
              </ul>
            </div>
          </li>

          <li className="feed--list-item">
            <div>
              <div className="feed--avatar" />
            </div>
            <div>
              <div className="feed--user">
                <span className="feed--username">@username</span>
                <span className="feed--date">{" - "}Mar 3, 2018</span>
              </div>
              <div>
                <span className="feed--message">First post</span>
              </div>
              <ul className="feed--list-item--actions">
                <li>
                  <img src={reply} alt="reply" />1
                </li>
                <li>
                  <img src={share} alt="share" />0
                </li>
                <li>
                  <img src={like} alt="like" />2
                </li>
              </ul>
            </div>
          </li>
        </ol>
      </div>
    );
  }
}

export default Feed;
