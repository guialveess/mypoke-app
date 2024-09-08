export function getTypeColor(type: string) {
    const blueTeam = ['normal','flying', 'fairy', 'steel', 'grass']
    const redTeam = ['dragon', 'fighting', 'fire', 'ghost', 'poison']
    const yellowTeam = ['ground', 'electric', 'rock', 'psychic', 'dark']

    if (blueTeam.includes(type)) return 'blue'
    else if (redTeam.includes(type)) return 'red'
    else if (yellowTeam.includes(type)) return 'yellow'
    else return 'purple'
}