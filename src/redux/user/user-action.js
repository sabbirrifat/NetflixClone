const addUser = (user) => ({
    type : 'SET_CURRENT_USER',
    payload: user
})

export default addUser