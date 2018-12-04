import React from "react";
import PropTypes from "prop-types";

const AddMessage = props => {
  let input = null;

  const setTextInputRef = el => {
    input = el;
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      props.dispatch(input.value, "Me");
      input.value = "";
    }
  };

  return (
    <section id="new-message">
      <input type="text" onKeyPress={handleKeyPress} ref={setTextInputRef} />
    </section>
  );
};

AddMessage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default AddMessage;
