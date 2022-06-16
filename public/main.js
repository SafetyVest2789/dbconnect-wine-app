document.getElementById('updateButton').addEventListener('click',updateEntry)
document.getElementById('deleteButton').addEventListener('click',deleteEntry)

async function updateEntry() {
    try {
        const response = await fetch('updateEntry', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                wineName: document.getElementsByName('wineName')[0].value,
                typeWine: document.getElementsByName('typeWine')[0].value,
                foodPair: document.getElementsByName('foodPair')[0].value,
                tanninsTaste: document.getElementsByName('tanninsTaste')[0].value,
                priceDollar: document.getElementsByName('priceDollar')[0].value,
                otherName: document.getElementsByName('otherName')[0].value,
                features: document.getElementsByName('features')[0].value,
                image: document.getElementsByName('image')[0].value
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
    try{
        const response = await fetch('deleteEntry', {
            method: 'delete',
            headers: {'Content-Type' : 'application/json'},
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