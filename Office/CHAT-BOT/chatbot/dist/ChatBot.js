"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.string.trim.js");
var _react = require("react");
require("./chatbot.css");
var _ioncChatboatWhite = _interopRequireDefault(require("./icon/ionc-chatboat-white.svg"));
var _ioncChatboat = _interopRequireDefault(require("./icon/ionc-chatboat.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import "../../assets/css/style.css";

const ChatBot = props => {
  const [message, setMessage] = (0, _react.useState)("");
  const AWS = window.AWS;
  AWS.config.region = props.region; // Region
  //   AWS.config.region = process.env.AWS_CHATBOT_REGION;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    // Provide your Pool Id here
    IdentityPoolId: props.AWS_IdentityPoolId
    // IdentifyPoolId: process.env.AWS_CHATBOT_IDENTIFY_POOL_ID,
  });

  var lexruntime = new AWS.LexRuntime();
  var lexUserId = "chatbot-demo" + Date.now();
  var sessionAttributes = {};
  function showHideChat() {
    var x = document.getElementById("chatboatBox");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  function pushChat() {
    // if there is text to be sent...
    var wisdomText = document.getElementById("wisdom");
    if (message && message !== "" && message.trim().length > 0) {
      // disable input to show we're sending it
      var wisdom = message.trim();
      wisdomText.value = "";
      wisdomText.locked = true;

      // send it to the Lex runtime
      var params = {
        botAlias: "$LATEST",
        botName: "BookTrip_dev",
        // botName: "TestingBot_dev",

        inputText: wisdom,
        userId: lexUserId,
        sessionAttributes: sessionAttributes
      };
      showRequest(wisdom);
      lexruntime.postText(params, function (err, data) {
        if (err) {
          console.log(err, err.stack);
          showError("Error:  " + err.message + " (see console for details)");
        }
        if (data) {
          // capture the sessionAttributes for the next cycle
          sessionAttributes = data.sessionAttributes;
          // show response and/or error/dialog status
          showResponse(data);
        }
        // re-enable input
        wisdomText.value = "";
        wisdomText.locked = false;
      });
    }
    // we always cancel form submission
    return false;
  }
  function showRequest(daText) {
    var conversationDiv = document.getElementById("conversation");
    var requestPara = document.createElement("P");
    requestPara.className = "userRequest";
    requestPara.appendChild(document.createTextNode(daText));
    conversationDiv.appendChild(requestPara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
  }
  function showError(daText) {
    var conversationDiv = document.getElementById("conversation");
    var errorPara = document.createElement("P");
    errorPara.className = "lexError";
    errorPara.appendChild(document.createTextNode(daText));
    conversationDiv.appendChild(errorPara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
  }
  function showResponse(lexResponse) {
    console.log(lexResponse);
    var conversationDiv = document.getElementById("conversation");
    var responsePara = document.createElement("P");
    responsePara.className = "lexResponse";
    // console.log('mansur', lexResponse);
    if (lexResponse.message) {
      responsePara.appendChild(document.createTextNode(lexResponse.message));
      responsePara.appendChild(document.createElement("br"));
      //const data = responsePara.createElement('div');
    }

    if (lexResponse.dialogState === "ReadyForFulfillment") {
      responsePara.appendChild(document.createTextNode("Ready for fulfillment"));
      // TODO:  show slot values
    } else {
      //responsePara.appendChild(document.createTextNode());
    }
    conversationDiv.appendChild(responsePara);
    // let data = document.createElement("div");
    // data.innerHTML = `<p>Hi Mansur</p>`;
    //data.appendChild(document.createTextNode());
    // conversationDiv.appendChild(data);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
  }
  return /*#__PURE__*/React.createElement(_react.Fragment, null, /*#__PURE__*/React.createElement("div", {
    id: "chatboatIcon",
    style: {
      position: "fixed",
      bottom: props.Iconbottom ? props.Iconbottom : "15px",
      right: props.Iconright ? props.Iconright : "15px",
      width: props.Iconwidth ? props.Iconwidth : "50px",
      height: props.Iconheight ? props.Iconheight : "50px",
      borderRadius: "50%",
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
      zIndex: "9999",
      backgroundColor: props.IconbackgroundColor ? props.IconbackgroundColor : "linear-gradient(\n              270deg,\n              rgba(0, 163, 218, 1) 0%,\n              rgba(6, 98, 147, 1) 100%\n            )",
      backgroundImage: props.IconbackgroundImage ? "url(".concat(props.IconbackgroundImage, ")") : "url(".concat(_ioncChatboatWhite.default, ")"),
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: props.IconbackgroundSize ? props.IconbackgroundSize : "28px",
      cursor: "pointer"
    },
    onClick: () => {
      showHideChat();
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "chatboat",
    id: "chatboatBox",
    style: {
      display: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "chatboat-header ".concat(props.headerStyle)
    // style={{
    //   backgroundColor: props.headerBackgroundColor
    //     ? props.headerBackgroundColor
    //     : `linear-gradient(
    //   270deg,
    //   rgba(0, 163, 218, 1) 0%,
    //   rgba(6, 98, 147, 1) 100%
    // )`,
    //   // background: props.headerIcon
    //   //   ? `#ffffff ${props.headerIcon}`
    //   //   : `#ffffff url(${chatIcon})`,
    // }}
  }, /*#__PURE__*/React.createElement("h1", null, props.chatBotHeaderText ? props.chatBotHeaderText : "Chatbot"), /*#__PURE__*/React.createElement("p", null, "Online"), /*#__PURE__*/React.createElement("div", {
    class: "btnChatClose",
    onClick: () => {
      showHideChat();
    }
  }, "x")), /*#__PURE__*/React.createElement("div", {
    id: "conversation"
  }), /*#__PURE__*/React.createElement("form", {
    id: "chatform",
    onSubmit: e => {
      e.preventDefault();
      return pushChat();
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "wisdom",
    size: "80",
    onChange: e => {
      setMessage(e.target.value);
    },
    value: message,
    placeholder: "Enter your message..."
  }))));
};
var _default = ChatBot;
exports.default = _default;