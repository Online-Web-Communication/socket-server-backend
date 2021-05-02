var rooms = []

const checkRooms = (io_rooms, data) => {

    for (const [key, value] of Object.entries(io_rooms)) {

        if (key == data.roomId) {

            const isThere = rooms.find(item => { return item.room_name == data.roomId })

            if (!isThere) {

                rooms.push({ room_name: data.roomId, person_number: value })
                console.log(rooms)

            } else {

                const indexRoom = rooms.findIndex(item => { return item.room_name == data.roomId })
                rooms[indexRoom].person_number = value
                console.log(rooms)

            }

        }

    }

}

const resetRooms = () => {

    rooms.forEach((item, index) => {
        if (item.person_number.length == 0) {
            rooms.splice(index, 1)
            console.log(rooms)
        }
    })

}

module.exports = { checkRooms, resetRooms, rooms }