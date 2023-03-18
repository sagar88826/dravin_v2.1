export const loginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });
    const loginResponse = await fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const log = await loginResponse.json();
    console.log(log);
    dispatch({
      type: "loginSuccess",
      payload: log,
    });
  } catch (error) {
    dispatch({
      type: "loginFailure",
      payload: error.response.log.message,
    });
  }
};

export const loadingUserAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadUserRequest",
    });
    const response = await fetch("user/my-profile");
    const data = await response.json();
    console.log(data);
    dispatch({
      type: "loadUserSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "loadUserFailure",
      payload: error.response,
    });
  }
};
