/* eslint-disable no-magic-numbers */
import axios from 'axios'

// eslint-disable-next-line no-console
const logError = err => console.log(err.message)

export const getFineByIdentifier = (identifier, setData) => {
    axios
        .get(`http://localhost:3001/fines/${identifier}`, {})
        .then(res => {
            setData(res.data)
        })
        .catch(err => {
            logError(err)
        })
}
