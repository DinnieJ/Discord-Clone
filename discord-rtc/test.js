const message = [
    { user_id: '1', content: 'Hello 2' },
    { user_id: '1', content: 'Hello 3' },
    { user_id: '2', content: 'Hello 1' },
    { user_id: '2', content: 'How Are you ?' },
    { user_id: '1', content: 'Pretty good' },
    { user_id: '3', content: 'Me too' },
]

const test = [
    {user_id: 1, messages: [
        { content: 'Hello' }
    ]}
]

const reduceMessages = message.reduce((prev, current) => {
    if(prev.length == 0 || prev[prev.length - 1].user_id !== current.user_id) {
        prev.push({ user_id: current.user_id, messages: [current.content] })
    } else {
        prev[prev.length - 1].messages.push(current.content)
    }
    return prev
},[])

console.log(reduceMessages)