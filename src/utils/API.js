let apiURL = "https://moothy.pythonanywhere.com"

const dev = false

if (dev === true) { apiURL = "http://127.0.0.1:5000" }

export async function fetchAPI({ url, method, body }) {
    try {
        if (method === "post") {
            const response = await fetch(`${apiURL}${url}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

        } else {
            const response = await fetch(`${apiURL}${url}`)

            if (!response.ok) {
                console.log(response)
                throw new Error("Error fetching staff data")
            } else {
                return response.json()
            }
        }
    } catch (error) {
        console.error(error)
    }
}