document.getElementById('updateButton').addEventListener('click',updateEntry)
document.getElementById('deleteButton').addEventListener('click',deleteEntry)

async function updateEntry() {
    try {
        const response = await fetch('updateEntry', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: document.getElementsByName("name")[0].value,
                type: document.getElementsByName("type")[0].value,
                food: document.getElementsByName("food")[0].value,
                taste: document.getElementsByName("taste")[0].value,
                price: document.getElementsByName("price")[0].value,
                aka: document.getElementsByName("aka")[0].value,
                features: document.getElementsByName("features")[0].value,
                image: document.getElementsByName("image")[0].value
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err) {
        console.log(err)
    }
}

async function deleteEntry() {
    const input = document.getElementById('deleteInput')
    console.log(input.value)
    try{
        const response = await fetch('deleteEntry', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: input.value
            })
        })
        const data = await response.json()
        location.reload()
    } catch(err) {
        console.log(err)
    }
}