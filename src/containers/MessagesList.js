import { connect } from "react-redux";
import MessagesListComponent from "../components/MessagesList";

const mapStateToProps = state => ({
  messages: state.messages
});

export const MessagesList = connect(
  mapStateToProps,
  {}
)(MessagesListComponent);
